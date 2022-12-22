import React from 'react';

import { Amplify, Auth } from 'aws-amplify';
import { View, Text } from 'react-native';
import { Authenticator, useAuthenticator } from '@aws-amplify/ui-react-native';
import awsmobile from './src/aws-exports';


Amplify.configure(awsmobile);

import { RecoilRoot } from 'recoil';
import {
  Provider as PaperProvider,
  //MD3LightTheme as DefaultTheme,
} from 'react-native-paper';
import theme from './Utils/theming';
import Main from './Main';

const MyAppHeader = () => {
  return (
    <View>
      <Text style={{ fontSize: 25, padding: 25, textAlign: 'center' }}>
        Lister Fast
      </Text>
    </View>
  );
};

export default function App() {
  return (
    <RecoilRoot>
      <Authenticator.Provider>
        <PaperProvider theme={theme}>
          <Authenticator Header={MyAppHeader}>
            <Main />
          </Authenticator>
        </PaperProvider>
      </Authenticator.Provider>
    </RecoilRoot>
  );
}
