import React from 'react';
import { View, useWindowDimensions } from 'react-native';
import {
  useTheme,
  Text,
  Card,
  Surface,
  Button,
  SegmentedButtons,
  Banner,
  Chip,
  ToggleButton,
} from 'react-native-paper';

import Header from '../Header';

export default function ToggleStages({ step, gotoStep, lastStep }) {
  const { width } = useWindowDimensions();
  //const theme = useTheme();

  /*const processCategories = () => {
    //console.log('CATEGORY: ', props.category);
    

    if (props.category === '') {
      props.getCategories();
    }

    props.forward();
  };*/

  const [value, setValue] = React.useState(step);

  const changeValue = async (value) => {
    setValue(value);
    gotoStep(value);
  };

  const checkLastStep = (n) => {
    if (lastStep < n) {
      return true;
    }

    return false;
  };

  return (
    <ToggleButton.Row
      onValueChange={(value) => {
        //gotoStep(value);
        changeValue(value);
      }}
      value={value}
    >
      <ToggleButton
        style={{ width: width / 9 }}
        icon='image'
        value={1}
        disabled={checkLastStep(1)}
      />
      <ToggleButton
        style={{ width: width / 9 }}
        icon='barcode'
        value={2}
        disabled={checkLastStep(2)}
      />
      <ToggleButton
        style={{ width: width / 9 }}
        icon='shape'
        value={3}
        disabled={checkLastStep(3)}
      />
      <ToggleButton
        style={{ width: 40 }}
        icon='star-circle-outline'
        value={4}
        disabled={checkLastStep(4)}
      />
      <ToggleButton
        style={{ width: width / 9 }}
        icon='playlist-edit'
        value={5}
        disabled={checkLastStep(5)}
      />
      <ToggleButton
        style={{ width: width / 9 }}
        icon='tape-measure'
        value={6}
        disabled={checkLastStep(6)}
      />
      <ToggleButton
        style={{ width: width / 9 }}
        icon='format-list-group'
        value={7}
        disabled={checkLastStep(7)}
      />
      <ToggleButton
        style={{ width: width / 9 }}
        icon='draw'
        value={8}
        disabled={checkLastStep(8)}
      />
      <ToggleButton
        style={{ width: width / 9 }}
        icon='currency-usd'
        value={9}
        disabled={checkLastStep(9)}
      />
    </ToggleButton.Row>
  );
}
