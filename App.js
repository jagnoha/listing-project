import React from 'react';

//import { Amplify } from 'aws-amplify';
//import awsconfig from './src/aws-exports';

//Amplify.configure(awsconfig);

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
      <PaperProvider theme={theme}>
      <Main />
      </PaperProvider>
    </RecoilRoot>
  );
}
