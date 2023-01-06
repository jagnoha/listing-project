import React, { useEffect, useState } from 'react';
import { CONNECTION_STATE_CHANGE, ConnectionState } from '@aws-amplify/pubsub';
import { Amplify, API, graphqlOperation, Hub } from 'aws-amplify';
import { useAuthenticator } from '@aws-amplify/ui-react-native';
import NetInfo from '@react-native-community/netinfo';
import { ActionSheetIOS, View } from 'react-native';
import * as Linking from 'expo-linking';
import { A } from '@expo/html-elements';

import Header from './Components/Header';

import {
  useTheme,
  Text,
  Button,
  Banner,
  ActivityIndicator,
  Snackbar,
} from 'react-native-paper';

import * as subscriptions from './src/graphql/subscriptions';

import * as queries from './src/graphql/queries';
import * as mutations from './src/graphql/mutations';

import { DataStore } from '@aws-amplify/datastore';
import { Accounts, EbayAccounts, Plans } from './src/models';
import Home from './Components/Home';
import AddListingForm from './Components/AddListingForm';
import EditListingForm from './Components/EditListingForm';
import { useRecoilState } from 'recoil';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import fulfillmentPoliciesAtom from './Store/atoms/fulfillmentPoliciesAtom';
import paymentPoliciesAtom from './Store/atoms/paymentPoliciesAtom';
import returnPoliciesAtom from './Store/atoms/returnPoliciesAtom';
import usernameAtom from './Store/atoms/usernameAtom';
import userAccountAtom from './Store/atoms/userAccountAtom';
import ebayUserAtom from './Store/atoms/ebayUserAtom';
import snackBarAtom from './Store/atoms/snackBarAtom';

import generalProcessingAtom from './Store/atoms/generalProcessingAtom';

import toReviseListAtom from './Store/atoms/toReviseListAtom';
import readyToGoListAtom from './Store/atoms/readyToGoListAtom';
import listingsAtom from './Store/atoms/listingsAtom';

import listingsOnlineAtom from './Store/atoms/listingsOnlineAtom';

import listingsPublishedAtom from './Store/atoms/listingsPublishedAtom';

import NewAccountWizard from './Components/NewAccountWizard';
/*import awsmobile from './src/aws-exports';

Amplify.configure(awsmobile);*/

const Stack = createNativeStackNavigator();

export default function Main() {
  const [fulfillmentPolicies, setFulfillmentPolicies] = useRecoilState(
    fulfillmentPoliciesAtom
  );

  const [generalProcessing, setGeneralProcessing] = useRecoilState(
    generalProcessingAtom
  );
  const [toReviseList, setToReviseList] = useRecoilState(toReviseListAtom);
  const [readyToGoList, setReadyToGoList] = useRecoilState(readyToGoListAtom);
  const [listings, setListings] = useRecoilState(listingsAtom);

  const [offline, setOffline] = useState(false);

  const [listingsOnline, setListingsOnline] =
    useRecoilState(listingsOnlineAtom);

    const [listingsPublished, setListingsPublished] =
    useRecoilState(listingsPublishedAtom);



  const [paymentPolicies, setPaymentPolicies] =
    useRecoilState(paymentPoliciesAtom);
  const [returnPolicies, setReturnPolicies] =
    useRecoilState(returnPoliciesAtom);

  const [snackBar, setSnackBar] = useRecoilState(snackBarAtom);

  const [username, setUsername] = useRecoilState(usernameAtom);
  const [userAccount, setUserAccount] = useRecoilState(userAccountAtom);
  const [ebayUser, setEbayUser] = useRecoilState(ebayUserAtom);

  const [accounts, setAccounts] = useState([]);
  const [ebayAccounts, setEbayAccounts] = useState([]);

  const [processing, setProcessing] = useState(true);

  const { user, signOut } = useAuthenticator((context) => [context.user]);

  /*useEffect(() => {
    try {
      
        const oneAccount = await API.graphql({
          query: queries.getAccounts,
          variables: { id: user.username.toLowerCase() }
        });
        console.log(oneAccount);
    
    } catch(error){
      console.log(error);
    }
  },[])*/

  const onDismissSnackBar = () => {
    setSnackBar({ visible: false, text: '' });
  };

  const fetchRecentData = async () => {
    // Retrieve some/all data from a appsync
    const listingsResponse = await API.graphql({
      query: queries.syncListings,
      variables: {
        filter: {
          accountsID: { eq: user.username.toLowerCase() },
          isDraft: { eq: true },
          //_deleted: { eq: false },
        },
        limit: 1000,
      },
    });

    setListings(
      listingsResponse.data.syncListings.items
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        .filter((item) => item._deleted !== true)
    );
  };

  //let priorConnectionState;

  /*Hub.listen('api', (data) => {
    const { payload } = data;
    if (payload.event === CONNECTION_STATE_CHANGE) {
      if (
        priorConnectionState === ConnectionState.Connecting &&
        payload.message === ConnectionState.Connected
      ) {
        fetchRecentData();
      }
      priorConnectionState = payload.message;
    }
  });*/


  useEffect(() => {
    //query the initial todolist and subscribe to data updates
    const unsubscribe = NetInfo.addEventListener(state => {
      console.log('Connection type', state.type);
      console.log('Is connected?', state.isConnected);

      setOffline(!state.isConnected);

    });

    //unsubscribe to data updates when component is destroyed so that you don’t introduce a memory leak.
    return function cleanup() {
      unsubscribe();
    };
  }, []);

  useEffect(() => {
    (async () => {
      
      /*const listingsResponse = await API.graphql({
        query: queries.listingsByDate,
        variables: {
          modelType: 'Listing',
          sortDirection: 'DESC',
          filter: {
            accountsID: { eq: user.username.toLowerCase() },
            isDraft: { eq: true },
            //_deleted: { eq: false },
          },
          limit: 1000,
        },
      });*/
      

      const listAccounts = `
          query MyQuery {
            listAccounts(filter: {id: {eq: "${user.username.toLowerCase()}"}}) {
              items {
                Listings(filter: {isDraft: {eq: true}}, limit: 1000, sortDirection: DESC) {
                  nextToken
                  startedAt
                  items {
                    id
                    title
                    createdAt
                    width
                    weightMinor
                    weightMayor
                    updatedAt
                    type
                    sku
                    shippingProfileID
                    returnProfileID
                    quantity
                    price
                    photos
                    photoMain
                    photoLabelExtra
                    photoLabel
                    paymentProfileID
                    otherPartNumber
                    modelType
                    manufacturerPartNumber
                    listingItemsCompatibilityId
                    length
                    lastStep
                    itemsSpecifics
                    isReadyToGo
                    isDraft
                    isChangedAspects
                    interchangePartNumber
                    height
                    ebayMotors
                    description
                    conditionName
                    conditionDescription
                    conditionCode
                    categoryList
                    categoryID
                    categoryFeatures
                    brand
                    barcodeValue
                    accountsID
                    _version
                    _lastChangedAt
                    _deleted
                    UPC
                    EAN
                    ISBN
                            }
                          }
                          id
                        }
                      }
                    }
      `

      const listingsResponse = await API.graphql(graphqlOperation(listAccounts));      
      

      setListings(
        listingsResponse.data.listAccounts.items[0].Listings.items.filter(
          (item) => item._deleted !== true
        )
      );
    })();
  }, []);

  useEffect(() => {
    (async () => {


      /*const listingsResponse = await API.graphql({
        query: queries.listingsByDate,
        variables: {
          modelType: 'Listing',
          sortDirection: 'DESC',
          filter: {
            accountsID: { eq: user.username.toLowerCase() },
            //isDraft: { eq: false },
            //isReadyToGo: {eq: true},
            //_deleted: { eq: false },
          },
          limit: 1000,
        },
      });*/

      const listAccounts = `
          query MyQuery {
            listAccounts(filter: {id: {eq: "${user.username.toLowerCase()}"}}) {
              items {
                Listings(limit: 1000, sortDirection: DESC) { 
                  nextToken
                  startedAt
                  items {
                    id
                    title
                    createdAt
                    width
                    weightMinor
                    weightMayor
                    updatedAt
                    type
                    sku
                    shippingProfileID
                    returnProfileID
                    quantity
                    price
                    photos
                    photoMain
                    photoLabelExtra
                    photoLabel
                    paymentProfileID
                    otherPartNumber
                    modelType
                    manufacturerPartNumber
                    listingItemsCompatibilityId
                    length
                    lastStep
                    itemsSpecifics
                    isReadyToGo
                    isDraft
                    isChangedAspects
                    interchangePartNumber
                    height
                    ebayMotors
                    description
                    conditionName
                    conditionDescription
                    conditionCode
                    categoryList
                    categoryID
                    categoryFeatures
                    brand
                    barcodeValue
                    accountsID
                    _version
                    _lastChangedAt
                    _deleted
                    UPC
                    EAN
                    ISBN
                            }
                          }
                          id
                        }
                      }
                    }
      `

      const listingsResponse = await API.graphql(graphqlOperation(listAccounts));

      setListingsOnline(
        listingsResponse.data.listAccounts.items[0].Listings.items.filter(
          (item) => item._deleted !== true)
      );

      /*const toReviseListResponse = await API.graphql({
        query: queries.syncListings,
        variables: {
          filter: {
            accountsID: { eq: user.username.toLowerCase() },
            isReadyToGo: { eq: false },
            isDraft: { eq: true },
          },
          limit: 1000,
        },
      });

      setToReviseList(toReviseListResponse.data.syncListings.items);

      const readyToGoListResponse = await API.graphql({
        query: queries.syncListings,
        variables: {
          filter: {
            accountsID: { eq: user.username.toLowerCase() },
            isReadyToGo: { eq: true },
            isDraft: { eq: true },
          },
          limit: 1000,
        },
      });

      setReadyToGoList(readyToGoListResponse.data.syncListings.items);*/

      //console.log('Listings to revise: ', toReviseList.data.syncListings );
    })();
  }, []);

  useEffect(() => {
    (async () => {
      

      const listAccounts = `
          query MyQuery {
            listAccounts(filter: {id: {eq: "${user.username.toLowerCase()}"}}) {
              items {
                Listings(filter: {isDraft: {eq: false}}, limit: 1000, sortDirection: DESC) { 
                  nextToken
                  startedAt
                  items {
                    id
                    title
                    createdAt
                    width
                    weightMinor
                    weightMayor
                    updatedAt
                    type
                    sku
                    shippingProfileID
                    returnProfileID
                    quantity
                    price
                    photos
                    photoMain
                    photoLabelExtra
                    photoLabel
                    paymentProfileID
                    otherPartNumber
                    modelType
                    manufacturerPartNumber
                    listingItemsCompatibilityId
                    length
                    lastStep
                    itemsSpecifics
                    isReadyToGo
                    isDraft
                    isChangedAspects
                    interchangePartNumber
                    height
                    ebayMotors
                    description
                    conditionName
                    conditionDescription
                    conditionCode
                    categoryList
                    categoryID
                    categoryFeatures
                    brand
                    barcodeValue
                    accountsID
                    _version
                    _lastChangedAt
                    _deleted
                    UPC
                    EAN
                    ISBN
                            }
                          }
                          id
                        }
                      }
                    }
      `

      const listingsResponse = await API.graphql(graphqlOperation(listAccounts));      
      
      

      setListingsPublished(
        listingsResponse.data.listAccounts.items[0].Listings.items.filter(
          (item) => item._deleted !== true
        )
      );
    })();
  }, []);

  useEffect(() => {
    (async () => {
      console.log('Testing!!!!!!!!!!!!!!!');
      console.log(user.username.toLowerCase());

      setUsername(user.username.toLowerCase());

      const oneAccount = await API.graphql({
        query: queries.getAccounts,
        variables: { id: user.username.toLowerCase() },
      });

      //console.log('Processing 1:', oneAccount);
      setUserAccount(oneAccount.data.getAccounts);

      if (oneAccount.data.getAccounts) {
        setEbayUser(oneAccount.data.getAccounts.ebayAccountId);

        if (oneAccount.data.getAccounts.ebayAccountId) {
          (async () => {
            console.log('USER: ', user.username);
            //const tempUser = userAccount.ebayAccountId.toLowerCase();
            setUsername(user.username.toLowerCase());
            const responseFulfillment = await fetch(
              `https://listerfast.com/api/ebay/policies/fulfillment/${oneAccount.data.getAccounts.ebayAccountId}/0`
            );

            const responsePayment = await fetch(
              `https://listerfast.com/api/ebay/policies/payment/${oneAccount.data.getAccounts.ebayAccountId}/0`
            );

            const responseReturn = await fetch(
              `https://listerfast.com/api/ebay/policies/return/${oneAccount.data.getAccounts.ebayAccountId}/0`
            );

            const jsonFulfillment = await responseFulfillment.json();
            const jsonPayment = await responsePayment.json();
            const jsonReturn = await responseReturn.json();

            setFulfillmentPolicies(jsonFulfillment);
            setPaymentPolicies(jsonPayment);
            setReturnPolicies(jsonReturn);
          })();
        }
      } else {
        const accountDetails = {
          id: user.username.toLowerCase(),
          username: user.username.toLowerCase(),
          isNewAccount: true,
          plan: Plans.PERSONAL,
        };

        const newAccount = await API.graphql({
          query: mutations.createAccounts,
          variables: { input: accountDetails },
        });
        //console.log(newAccount);
        setUserAccount(newAccount.data.createAccounts);
        setFulfillmentPolicies([]);
        setPaymentPolicies([]);
        setReturnPolicies([]);
      }

      setProcessing(false);
    })();
  }, []);


  useEffect(() => {
    //query the initial todolist and subscribe to data updates
    const subscription = API.graphql(
      graphqlOperation(subscriptions.onCreateListing)
    ).subscribe({
      next: ({ provider, value }) => {
        //console.log({ provider, value });
        console.log('CREATE LISTING:!!!! ');
        console.log(value.data.onCreateListing);
        setListings((old) => [value.data.onCreateListing, ...old]);
        setListingsOnline((old) => [value.data.onCreateListing, ...old]);
        if (value.data.onCreateListing.isDraft === false){
          setListingsPublished((old) => [value.data.onCreateListing, ...old]);
        }
        //setListings([...listings, value.data.onCreateListing]);
      },
      error: (error) => console.warn(error),
    });

    //unsubscribe to data updates when component is destroyed so that you don’t introduce a memory leak.
    return function cleanup() {
      subscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    //query the initial todolist and subscribe to data updates
    const subscription = API.graphql(
      graphqlOperation(subscriptions.onUpdateListing)
    ).subscribe({
      next: ({ provider, value }) => {
        //console.log({ provider, value });
        console.log('UPDATE LISTING CODIGO PROBANDO ESTA MIERDA:!!!! ');

        console.log(value.data.onUpdateListing);

        
        /*let index = listings.findIndex(
          (item) => item.id === value.data.onUpdateListing.id
        );

        

        setListings((old) => [
          ...old
            .slice(0, index)
            .filter((item) => item.id !== value.data.onUpdateListing.id),
          value.data.onUpdateListing,
          ...old
            .slice(index + 1)
            .filter((item) => item.id !== value.data.onUpdateListing.id),
        ]);

        setListingsOnline((old) => [
          ...old
            .slice(0, index)
            .filter((item) => item.id !== value.data.onUpdateListing.id),
          value.data.onUpdateListing,
          ...old
            .slice(index + 1)
            .filter((item) => item.id !== value.data.onUpdateListing.id),
        ]);*/

        setListings((old) => [ ...old.map(item => {
          if (item.id === value.data.onUpdateListing.id) {
            return value.data.onUpdateListing;
          }
          return item
        } )  ]);

        setListingsOnline((old) => [ ...old.map(item => {
          if (item.id === value.data.onUpdateListing.id) {
            return value.data.onUpdateListing;
          }
          return item
        } )  ]);

        if (value.data.onUpdateListing.isDraft === false){
          setListingsPublished((old) => [value.data.onUpdateListing, ...old]);
        }

        /*setListings((old) => [value.data.onUpdateListing,
          ...old.filter((item) => item.id !== value.data.onUpdateListing.id)
          
        ]);

        setListingsOnline((old) => [value.data.onUpdateListing,
          ...old.filter((item) => item.id !== value.data.onUpdateListing.id)
          
        ]);*/

        /*let newListing = value.data.onUpdateListing;

        console.log('The listings: ', listings);
        
        let filteredListings = listings.map(item => {
          if (item.id === newListing.id) {
            return (newListing)
          }

          return (item);
        })

        console.log(filteredListings);*/

        //setListings((old) => filteredListings);
      },
      error: (error) => console.warn(error),
    });

    //unsubscribe to data updates when component is destroyed so that you don’t introduce a memory leak.
    return function cleanup() {
      subscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    //query the initial todolist and subscribe to data updates
    const subscription = API.graphql(
      graphqlOperation(subscriptions.onDeleteListing)
    ).subscribe({
      next: ({ provider, value }) => {
        //console.log({ provider, value });
        console.log('DELETE LISTING:!!!! ');

        //listings.filter(item => item.id !== value.data.onUpdateListing.id );
        setListings((old) => [
          ...old.filter((item) => item.id !== value.data.onDeleteListing.id),
        ]);

        setListingsOnline((old) => [
          ...old.filter((item) => item.id !== value.data.onDeleteListing.id),
        ]);
      },
      error: (error) => console.warn(error),
    });

    //unsubscribe to data updates when component is destroyed so that you don’t introduce a memory leak.
    return function cleanup() {
      subscription.unsubscribe();
    };
  }, []);

  const connectEbayAccount = async () => {
    const ebayAccount = await fetch(
      `https://listerfast.com/api/ebay/ebaytoken`
    );
  };

  if (offline) {
    return (
      <View
        style={{
          flex: 1,
          //justifyContent: 'space-between',
          alignItems: 'center',
          alignContent: 'center',
          alignSelf: 'center',
          justifyContent: 'center',

          //paddingBottom: 100,
        }}
      >
        <Text>Not internet</Text>
      </View>
    );
  }

  if (processing) {
    return (
      <View
        style={{
          flex: 1,
          //justifyContent: 'space-between',
          alignItems: 'center',
          alignContent: 'center',
          alignSelf: 'center',
          justifyContent: 'center',

          //paddingBottom: 100,
        }}
      >
        <ActivityIndicator
          size='large'
          style={{ marginTop: '20%', marginBottom: '20%' }}
        />
      </View>
    );
  }

  

  

  if (userAccount && userAccount.isNewAccount) {
    return <NewAccountWizard signOut={signOut} />;
  }

  return (
    <>
      {/*<Home />*/}
      {
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName='Home'
            screenOptions={{
              headerShown: false,
            }}
          >
            <Stack.Screen name='Home' component={Home} />
            <Stack.Screen name='AddListing' component={AddListingForm} />
            <Stack.Screen name='EditListing' component={EditListingForm} />
          </Stack.Navigator>
          <Snackbar
            visible={snackBar.visible}
            duration={1500}
            onDismiss={onDismissSnackBar}
            action={{
              label: 'Close',
              //icon: 'close',
              onPress: () => {
                console.log('Close');
              },
            }}
            style={
              snackBar.color
                ? { color: 'white', backgroundColor: snackBar.color }
                : null
            }
            //style={{ backgroundColor: 'green' }}
            //onDismiss={onDismissSnackBar}
            /*action={{
          label: 'Undo',
          onPress: () => {
            
          },
        }}*/
          >
            {snackBar.text}
          </Snackbar>
        </NavigationContainer>
      }
    </>
  );
}

/*const styles = StyleSheet.create({
    container: {
      //flex: 1,
      backgroundColor: '#fff',
      //alignItems: 'center',
      //justifyContent: 'center',
    },
    header: {
      backgroundColor: '#000',
    }
  });*/
