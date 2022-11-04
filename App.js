import React from 'react';
import {
  RecoilRoot,
  atom,
  selector,
  useRecoilState,
  useRecoilValue,
} from 'recoil';
import { Provider as PaperProvider, MD3LightTheme as DefaultTheme } from 'react-native-paper';
import Main from './Main';



const theme = {
  ...DefaultTheme,
  colors: {
    "primary": "rgb(0, 100, 147)",
    "onPrimary": "rgb(255, 255, 255)",
    "primaryContainer": "rgb(202, 230, 255)",
    "onPrimaryContainer": "rgb(0, 30, 48)",
    "secondary": "rgb(80, 96, 111)",
    "onSecondary": "rgb(255, 255, 255)",
    "secondaryContainer": "rgb(211, 229, 246)",
    "onSecondaryContainer": "rgb(12, 29, 41)",
    "tertiary": "rgb(101, 88, 123)",
    "onTertiary": "rgb(255, 255, 255)",
    "tertiaryContainer": "rgb(235, 220, 255)",
    "onTertiaryContainer": "rgb(32, 22, 52)",
    "error": "rgb(186, 26, 26)",
    "onError": "rgb(255, 255, 255)",
    "errorContainer": "rgb(255, 218, 214)",
    "onErrorContainer": "rgb(65, 0, 2)",
    "background": "rgb(252, 252, 255)",
    "onBackground": "rgb(26, 28, 30)",
    "surface": "rgb(252, 252, 255)",
    "onSurface": "rgb(26, 28, 30)",
    "surfaceVariant": "rgb(221, 227, 234)",
    "onSurfaceVariant": "rgb(65, 71, 77)",
    "outline": "rgb(114, 120, 126)",
    "outlineVariant": "rgb(193, 199, 206)",
    "shadow": "rgb(0, 0, 0)",
    "scrim": "rgb(0, 0, 0)",
    "inverseSurface": "rgb(46, 49, 51)",
    "inverseOnSurface": "rgb(240, 240, 243)",
    "inversePrimary": "rgb(141, 205, 255)",
    "elevation": {
      "level0": "transparent",
      "level1": "rgb(239, 244, 250)",
      "level2": "rgb(232, 240, 246)",
      "level3": "rgb(224, 235, 243)",
      "level4": "rgb(222, 234, 242)",
      "level5": "rgb(217, 231, 240)"
    },
    "surfaceDisabled": "rgba(26, 28, 30, 0.12)",
    "onSurfaceDisabled": "rgba(26, 28, 30, 0.38)",
    "backdrop": "rgba(43, 49, 55, 0.4)"
  }
};



export default function App() {
  return (
    <RecoilRoot>
      <PaperProvider theme={theme}>
          <Main />
      </PaperProvider>
   </RecoilRoot>
  );
}

