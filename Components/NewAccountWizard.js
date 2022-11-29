import React, {useCallback, useState } from 'react';
import { Amplify, API } from 'aws-amplify';
import * as queries from '../src/graphql/queries';
import * as mutations from '../src/graphql/mutations';

import { View, Linking } from 'react-native';
import { useRecoilState } from 'recoil';
import { A } from '@expo/html-elements';
import Header from './Header';
import userAccountAtom from '../Store/atoms/userAccountAtom';
import ebayUserAtom from '../Store/atoms/ebayUserAtom';
import { useTheme, Text, Button, Banner, TextInput  } from 'react-native-paper';

import awsconfig from '../src/aws-exports';


Amplify.configure(awsconfig);


const URL = 'https://auth.ebay.com/oauth2/authorize?client_id=JavierGo-TestingB-PRD-7afc7dd70-7a19f64d&response_type=code&redirect_uri=Javier_Gonzalez-JavierGo-Testin-gaoaaxshm&scope=https://api.ebay.com/oauth/api_scope https://api.ebay.com/oauth/api_scope/sell.marketing.readonly https://api.ebay.com/oauth/api_scope/sell.marketing https://api.ebay.com/oauth/api_scope/sell.inventory.readonly https://api.ebay.com/oauth/api_scope/sell.inventory https://api.ebay.com/oauth/api_scope/sell.account.readonly https://api.ebay.com/oauth/api_scope/sell.account https://api.ebay.com/oauth/api_scope/sell.fulfillment.readonly https://api.ebay.com/oauth/api_scope/sell.fulfillment https://api.ebay.com/oauth/api_scope/sell.analytics.readonly https://api.ebay.com/oauth/api_scope/sell.finances https://api.ebay.com/oauth/api_scope/sell.payment.dispute https://api.ebay.com/oauth/api_scope/commerce.identity.readonly https://api.ebay.com/oauth/api_scope/commerce.notification.subscription https://api.ebay.com/oauth/api_scope/commerce.notification.subscription.readonly';

const OpenURLButton = ({ url, children }) => {



    const handlePress = useCallback(async () => {
      // Checking if the link is supported for links with custom URL scheme.
      const supported = await Linking.canOpenURL(url);
  
      if (supported) {
        // Opening the link with some app, if the URL scheme is "http" the web link should be opened
        // by some browser in the mobile
        await Linking.openURL(url);
      } else {
        Alert.alert(`Don't know how to open this URL: ${url}`);
      }
    }, [url]);
  
    return <Button onPress={handlePress}>{children}</Button>;
  };


export default function NewAccountWizard({signOut}) {
  const theme = useTheme();
  const [userAccount, setUserAccount] = useRecoilState(userAccountAtom);  
  const [ebayUser, setEbayUser] = useRecoilState(ebayUserAtom);  
  const [ebayAccountText, setEbayAccountText] = useState(null);
  const [processingEbayLink, setProcessingEbayLink] = useState(false);

  const onChangeInput = (value) => {
    setEbayAccountText(value)
  }

  const fetchEbayAccount = async () => {

    setProcessingEbayLink(true);

    const oneEbayAccount = await API.graphql({
      query: queries.getEbayAccounts,
      variables: { id: ebayAccountText.toLowerCase() }
    });

    console.log('ebayAccount:', oneEbayAccount);
    //setUserAccount(oneAccount.data.getAccounts);

    if (oneEbayAccount.data.getEbayAccounts){

        const accountDetails = {
            id: userAccount.id,
            ebayAccountId: ebayAccountText, 
            isNewAccount: false,
            _version: userAccount._version,
          };

          console.log(accountDetails);
          
          const updatedAccount = await API.graphql({ query: mutations.updateAccounts, variables: {input: accountDetails}});
          console.log(updatedAccount);
          setUserAccount(updatedAccount.data.updateAccounts);



    } else {
        console.log('Error!!!')
    }

    setProcessingEbayLink(false);

  }

  return (
    <View>
       <Header
          title={'Configure New Account'}
          type='configureNewAccount'
          onPress={signOut}
        />
         <Banner visible={true} icon={'playlist-edit'}>
            Connect to your eBay Account.
          </Banner>
    <View style={{padding: 20}}>
      {/*<Text>{JSON.stringify(userAccount)}</Text>*/}

      <TextInput
      mode="outlined"
      label="eBay Account"
      placeholder="Enter the eBay Account"
      onChangeText={onChangeInput}
      value={
        ebayAccountText
        
      }
    />  

    {<OpenURLButton url={URL}>Get eBay Credentials</OpenURLButton>}

    <Button onPress={()=>fetchEbayAccount()} style={{marginTop: 25, marginLeft: '20%', marginRight: '20%'}} mode='contained' disabled={ebayAccountText && ebayAccountText.length > 0 ? false : true}  >Link eBay Account</Button>  



      
          </View>      
    </View>
  );
}