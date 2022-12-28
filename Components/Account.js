import React, {useState, useEffect} from 'react';
import { useTheme, Text, Button, List, Divider } from 'react-native-paper';
import { useRecoilState } from 'recoil';
import { View, StatusBar, Pressable } from 'react-native';
import { Authenticator, useAuthenticator } from '@aws-amplify/ui-react-native';
import { Auth } from 'aws-amplify';
import Header from './Header';
import userAccountAtom from '../Store/atoms/userAccountAtom';
import ebayUserAtom from '../Store/atoms/ebayUserAtom';
import AccountInfo from './AccountOptions/AccountInfo';

const SignOutButton = () => {
  const { signOut } = useAuthenticator();
  return <Button onPress={signOut}>Sign out</Button>;
};


export default function Account({opt}) {
  const { signOut } = useAuthenticator();
  const theme = useTheme();
  const [userAccount, setUserAccount] = useRecoilState(userAccountAtom);
  const [ebayUser, setEbayUser] = useRecoilState(ebayUserAtom);
  const [plan, setPlan] = useState();

  const [email, setEmail] = useState();

  const [option, setOption] = useState(opt);


  //console.log('OPT: ', props.opt);
  const processedUsername = () => {
    let user = (userAccount.id[0] + userAccount.id[userAccount.id.length - 1]).toUpperCase();
    //getAccountInfo();
    return user;
  }

  useEffect(() => {
    //props.processLabel();
    console.log('Entre en use effect!');
    getAccountInfo();

    setPlan(userAccount.plan);




  }, []);

  const getAccountInfo =  async () => {

    Auth.currentAuthenticatedUser({
      bypassCache: false // Optional, By default is false. If set to true, this call will send a request to Cognito to get the latest user data
    })
      .then((user) => setEmail(user.attributes.email))
      .catch((err) => console.log(err));

   

   //console.log(userAccount);   

   //console.log(ebayUser);


  }

  const goBack = () => {
    setOption();
  }

  if (option === 'accountInfo') {
    return (
      <AccountInfo goBack = { goBack } userName = {userAccount.id} email = {email} plan = {plan} logout={signOut} />
    )
  }

  return (
    <View>
      <Header title='Account' type={'account'} logout={signOut} labelUser={processedUsername()} />
      {/*<Text>Account</Text>
      <Text>{userAccount.id}</Text>
  <SignOutButton />*/}
  <Divider />
  <List.Item
    title="Account Info"

    onPress ={ () => setOption('accountInfo') /*()=>getAccountInfo()*/}
    
    //description="Item description"
    left={props => <List.Icon {...props} icon="account" />}
  />
  <List.Item
    title="eBay Connectivity"
    //description="Item description"
    left={props => <List.Icon {...props} icon="api" />}
  />
  <List.Item
    title="eBay Preferences"
    //description="Item description"
    left={props => <List.Icon {...props} icon="tune" />}
  />
    </View>
  );
}
