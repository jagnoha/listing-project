import React, { useEffect, useState } from 'react';
import { Amplify, API } from 'aws-amplify';
import { useAuthenticator } from '@aws-amplify/ui-react-native';
import { View } from 'react-native';
import * as Linking from 'expo-linking';
import { A } from '@expo/html-elements';

import Header from './Components/Header';

import { useTheme, Text, Button, Banner, ActivityIndicator } from 'react-native-paper';

import * as queries from './src/graphql/queries';
import * as mutations from './src/graphql/mutations';

import { DataStore } from '@aws-amplify/datastore';
import { Accounts, EbayAccounts, Plans } from './src/models';
import Home from './Components/Home';
import AddListingForm from './Components/AddListingForm';
import { useRecoilState } from 'recoil';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import fulfillmentPoliciesAtom from './Store/atoms/fulfillmentPoliciesAtom';
import paymentPoliciesAtom from './Store/atoms/paymentPoliciesAtom';
import returnPoliciesAtom from './Store/atoms/returnPoliciesAtom';
import usernameAtom from './Store/atoms/usernameAtom';
import userAccountAtom from './Store/atoms/userAccountAtom';
import ebayUserAtom from './Store/atoms/ebayUserAtom';

import NewAccountWizard from './Components/NewAccountWizard';
import awsconfig from './src/aws-exports';

Amplify.configure(awsconfig);

const Stack = createNativeStackNavigator();

export default function Main() {
  const [fulfillmentPolicies, setFulfillmentPolicies] = useRecoilState(
    fulfillmentPoliciesAtom
  );
  const [paymentPolicies, setPaymentPolicies] =
    useRecoilState(paymentPoliciesAtom);
  const [returnPolicies, setReturnPolicies] =
    useRecoilState(returnPoliciesAtom);

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

  
  
  
  
  
  
  
  
  
  
  useEffect(()=>{
    (async () => {
      console.log('Testing!!!!!!!!!!!!!!!');
      console.log(user.username.toLowerCase());

    setUsername(user.username.toLowerCase());
    
    const oneAccount = await API.graphql({
      query: queries.getAccounts,
      variables: { id: user.username.toLowerCase() }
    });

    console.log('Processing 1:', oneAccount);
    setUserAccount(oneAccount.data.getAccounts);

    if (oneAccount.data.getAccounts){
      setEbayUser(oneAccount.data.getAccounts.ebayAccountId);
    
      

      if (oneAccount.data.getAccounts.ebayAccountId){

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
        plan: Plans.PERSONAL
      };
      
      const newAccount = await API.graphql({ query: mutations.createAccounts, variables: {input: accountDetails}});
      console.log(newAccount);
      setUserAccount(newAccount.data.createAccounts);
      setFulfillmentPolicies([]);
      setPaymentPolicies([]);
      setReturnPolicies([]);
    }

    setProcessing(false);


    


  })()


  },[]);







  /*useEffect(()=>{
    (async () => {
      console.log('User Account: ', userAccount);
  })()


  },[])*/

  /*useEffect(() => {
    try {
      (async () => {
        const account = await DataStore.query(Accounts, (c) =>
          c.username.eq(user.username.toLowerCase())
        );

        const oneAccount = await API.graphql({
          query: queries.getAccounts,
          variables: { id: user.username.toLowerCase() }
        });

        console.log('One account: ', oneAccount);

        console.log('Acccccccccount: ', account);
        setAccounts(account);

      })
    }catch(error){
      console.log(error)
    }
  },[]);

        useEffect(() => {
          try {
            (async () => {

        if (accounts.length > 0) {
          console.log('ACCCCCCCCCCCCCCCCCCCCCCCCCCCCCCC: ', accounts[0]);
          setUserAccount(accounts[0]);
          setEbayUser(accounts[0].ebayAccountId);
        } else {
          const newAccount = await DataStore.save(
            new Accounts({
              username: user.username.toLowerCase(),
              EbayAccounts: [],
              isNewAccount: true,
              plan: Plans.PERSONAL,
              EbayOrders: [],
              Locations: [],
              Brands: [],
              Products: [],
              Listings: [],
              ebayAccountId: '',
              postalCode: '',
            })
          );

          console.log(newAccount);
        }
      })();
    } catch (error) {
      console.log(error);
    }
  }, []);*/

  /*useEffect(() => {

    //query the initial todolist and subscribe to data updates
    const subscription = DataStore.observeQuery(EbayAccounts).subscribe((snapshot) => {
      //isSynced can be used to show a loading spinner when the list is being loaded. 
      const { items, isSynced } = snapshot;
      setEbayAccounts(items);
    });

    //unsubscribe to data updates when component is destroyed so that you don’t introduce a memory leak.
    return function cleanup() {
      subscription.unsubscribe();
    }

  }, []);*/

  /*useEffect(() => {
    try {
      if (userAccount && !userAccount.isNewAccount) {
        (async () => {
          console.log('USER: ', user.username);
          const tempUser = userAccount.ebayAccountId.toLowerCase();
          setUsername(user.username.toLowerCase());
          const responseFulfillment = await fetch(
            `https://listerfast.com/api/ebay/policies/fulfillment/${tempUser}/0`
          );

          const responsePayment = await fetch(
            `https://listerfast.com/api/ebay/policies/payment/${tempUser}/0`
          );

          const responseReturn = await fetch(
            `https://listerfast.com/api/ebay/policies/return/${tempUser}/0`
          );

          const jsonFulfillment = await responseFulfillment.json();
          const jsonPayment = await responsePayment.json();
          const jsonReturn = await responseReturn.json();

          setFulfillmentPolicies(jsonFulfillment);
          setPaymentPolicies(jsonPayment);
          setReturnPolicies(jsonReturn);
        })();
      }
    } catch (error) {
      console.log(error);
    }
  }, []);*/

  const connectEbayAccount = async () => {
    const ebayAccount = await fetch(
      `https://listerfast.com/api/ebay/ebaytoken`
    );
  };

  if (processing){
    return (<View style={{
      flex: 1,
      //justifyContent: 'space-between',
      alignItems: 'center',
      alignContent: 'center',
      alignSelf: 'center',
      justifyContent: 'center',
      
      //paddingBottom: 100,
    }}>
    <ActivityIndicator
    
      size='large'
      style={{ marginTop: '20%', marginBottom: '20%' }}
    />
  </View>)
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
          </Stack.Navigator>
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
