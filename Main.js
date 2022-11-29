import React, { useEffect } from 'react';
import { useAuthenticator } from '@aws-amplify/ui-react-native';
import { View } from 'react-native';
import * as Linking from 'expo-linking';
import { A } from '@expo/html-elements';

import Header from './Components/Header';

import { useTheme, Text, Button, Banner } from 'react-native-paper';

import { DataStore } from '@aws-amplify/datastore';
import { Accounts } from './src/models';
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

  const { user, signOut } = useAuthenticator((context) => [context.user]);

  useEffect(() => {
    try {
      (async () => {
        const account = await DataStore.query(Accounts, (c) =>
          c.username.eq(user.username.toLowerCase())
        );

        console.log('Acccccccccount: ', account);

        if (account.length > 0) {
          console.log(account[0]);
          setUserAccount(account[0]);
          setEbayUser(account.ebayAccountId);
        } else {
          const newAccount = await DataStore.save(
            new Accounts({
              username: user.username.toLowerCase(),
              EbayAccounts: [],
              isNewAccount: true,
              plan: 'PERSONAL',
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
  }, []);

  useEffect(() => {
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
  }, []);

  const connectEbayAccount = async () => {
    const ebayAccount = await fetch(
      `https://listerfast.com/api/ebay/ebaytoken`
    );
  };

  if (userAccount.isNewAccount) {
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
