import React from 'react';
import { useTheme, Text, Button } from 'react-native-paper';
import { useRecoilState } from 'recoil';
import { Authenticator, useAuthenticator } from '@aws-amplify/ui-react-native';
import Header from './Header';
import userAccountAtom from '../Store/atoms/userAccountAtom';

const SignOutButton = () => {
  const { signOut } = useAuthenticator();
  return <Button onPress={signOut}>Sign out</Button>;
};

export default function Account() {
  const theme = useTheme();
  const [userAccount, setUserAccount] = useRecoilState(userAccountAtom);

  return (
    <>
      <Header title='Account' />
      <Text>Account</Text>
      <Text>{JSON.stringify(userAccount)}</Text>
      <SignOutButton />
    </>
  );
}
