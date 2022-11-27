import React from 'react';
import { useTheme, Text, Button } from 'react-native-paper';
import { Authenticator, useAuthenticator } from '@aws-amplify/ui-react-native';
import Header from './Header';

const SignOutButton = () => {
  const { signOut } = useAuthenticator();
  return <Button onPress={signOut}>Sign out</Button>;
};

export default function Account() {
  const theme = useTheme();

  return (
    <>
      <Header title='Account' />
      <Text>Account</Text>
      <SignOutButton />
    </>
  );
}
