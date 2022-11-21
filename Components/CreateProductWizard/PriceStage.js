import React from 'react';
import { Pressable, ScrollView, View } from 'react-native';
import {
  useTheme,
  Text,
  Card,
  Title,
  Surface,
  Button,
  Searchbar,
  SegmentedButtons,
  Banner,
  Paragraph,
  ActivityIndicator,
  IconButton,
  TextInput,
} from 'react-native-paper';
import Header from '../Header';

export default function PriceStage(props) {
  //const theme = useTheme();

  return (
    <View>
      <Header
        title={props.title}
        type='createListing'
        actionBack={props.navigation.goBack}
      />
      <View>
        <Banner visible={true} icon={'currency-usd'}>
        Edit the price and quantity of this item.
        </Banner>

        <Surface elevation={4} style={{padding: 20, margin: 20}}>
                <TextInput style={{fontSize: 40}} label='Quantity' value='1' keyboardType='numeric' mode='outlined' />
        </Surface>   

        <Surface elevation={4} style={{padding: 20, margin: 20}}>
                <TextInput style={{fontSize: 40}} label='Price' value='0.00' keyboardType='decimal-pad' mode='outlined' />
        </Surface>        

        <SegmentedButtons
          style={props.styles.nextBackControl}
          onValueChange={() => console.log('Change value')}
          buttons={[
            {
              value: 'back',
              label: 'Back',
              icon: 'arrow-left',
              onPress: () => props.backward(),
              //disabled: 'false'
              //disabled: categoryId
            },
            {
              value: 'next',
              label: 'Next',
              icon: 'arrow-right',
              onPress: () => props.forward(),
              disabled: true,
            },
          ]}
        />
      </View>
    </View>
  );
}
