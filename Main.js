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
  const { user, signOut } = useAuthenticator((context) => [context.user]);

  useEffect(() => {
    (async () => {
      const account = await DataStore.query(
        Accounts,
        user.username.toLowerCase()
      );
      console.log(account);
      setUserAccount(account);
    })();
  }, []);

  useEffect(() => {
    (async () => {
      console.log('USER: ', user.username);
      const tempUser = user.username.toLowerCase();
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
  }, []);

  const connectEbayAccount = async () => {
    const ebayAccount = await fetch(
      `https://listerfast.com/api/ebay/ebaytoken`
    );
  };

  if (userAccount.isNewAccount) {
    return (
      <View>
        <Header
          title={'Configure New Account'}
          type='configureNewAccount'
          onPress={signOut}
          //actionBack={props.navigation.goBack}
        />
        <View>
          <Banner visible={true} icon={'playlist-edit'}>
            Connect to your eBay Account.
          </Banner>
          <A href='https://auth.ebay.com/oauth2/authorize?client_id=JavierGo-TestingB-PRD-7afc7dd70-7a19f64d&response_type=code&redirect_uri=Javier_Gonzalez-JavierGo-Testin-gaoaaxshm&scope=https://api.ebay.com/oauth/api_scope https://api.ebay.com/oauth/api_scope/sell.marketing.readonly https://api.ebay.com/oauth/api_scope/sell.marketing https://api.ebay.com/oauth/api_scope/sell.inventory.readonly https://api.ebay.com/oauth/api_scope/sell.inventory https://api.ebay.com/oauth/api_scope/sell.account.readonly https://api.ebay.com/oauth/api_scope/sell.account https://api.ebay.com/oauth/api_scope/sell.fulfillment.readonly https://api.ebay.com/oauth/api_scope/sell.fulfillment https://api.ebay.com/oauth/api_scope/sell.analytics.readonly https://api.ebay.com/oauth/api_scope/sell.finances https://api.ebay.com/oauth/api_scope/sell.payment.dispute https://api.ebay.com/oauth/api_scope/commerce.identity.readonly https://api.ebay.com/oauth/api_scope/commerce.notification.subscription https://api.ebay.com/oauth/api_scope/commerce.notification.subscription.readonly'>
            Go to Google
          </A>
        </View>
      </View>
    );
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
