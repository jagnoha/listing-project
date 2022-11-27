import React from 'react';

import { Amplify, Auth } from 'aws-amplify';
import { Authenticator, useAuthenticator } from '@aws-amplify/ui-react-native';
import awsconfig from './src/aws-exports';

Amplify.configure(awsconfig);

import { RecoilRoot } from 'recoil';
import {
  Provider as PaperProvider,
  //MD3LightTheme as DefaultTheme,
} from 'react-native-paper';
import theme from './Utils/theming';
import Main from './Main';

export default function App() {
  return (
    <RecoilRoot>
      <Authenticator.Provider>
        <PaperProvider theme={theme}>
          <Authenticator>
            <Main />
          </Authenticator>
        </PaperProvider>
      </Authenticator.Provider>
    </RecoilRoot>
  );
}
