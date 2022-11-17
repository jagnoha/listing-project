import React from 'react';
import { View, ScrollView, Pressable } from 'react-native';
import {
  useTheme,
  Text,
  Card,
  Surface,
  Button,
  Searchbar,
  SegmentedButtons,
  ActivityIndicator,
  Banner,
  TextInput,
  Title,
  IconButton,
} from 'react-native-paper';
import Header from '../Header';

export default function DimensionStage(props) {
  //const theme = useTheme();

  //console.log(props.categoryFeatures);

  return (
    <View>
      <Header
        title={props.title}
        type='createListing'
        actionBack={props.navigation.goBack}
      />
      <View>
        <Banner visible={true} icon={'tape-measure'}>
        Add the measurements and weight of the item. Weight is in ounces and measurements are in inches.
        </Banner>

        <View>
          <View>
            <Surface elevation={4} style={{margin: 10, marginTop: 20, padding: 10}}>
            <TextInput            
                mode='outlined'
                style={{margin: 10}}
                label='Length'
                right={<TextInput.Affix text="inches" />}
                keyboardType='decimal-pad'
                onChangeText={props.onChangeLength}
                value={props.length}
            />
            <TextInput
                mode='outlined'
                style={{margin: 10}}
                right={<TextInput.Affix text="inches" />}
                label='Width'
                keyboardType='decimal-pad'
                onChangeText={props.onChangeWidth}
                value={props.width}
            />
            <TextInput
                mode='outlined'
                style={{margin: 10}}
                right={<TextInput.Affix text="inches" />}
                label='Height'
                keyboardType='decimal-pad'
                onChangeText={props.onChangeHeight}
                value={props.height}
            />
            </Surface>
           </View>
           <View>
            <Surface elevation={4} style={{margin: 10, padding: 10}}>
            <TextInput
                mode='outlined'
                style={{margin: 10}}
                right={<TextInput.Affix text="oz" />}
                label='Weight'
                keyboardType='decimal-pad'
                onChangeText={props.onChangeWeight} 
                value={props.weight}
            />
            </Surface>
           </View>

        </View>

        

        <SegmentedButtons
          style={props.styles.nextBackControl}
          onValueChange={() => console.log('Change value')}
          buttons={[
            {
              value: 'back',
              label: 'Back',
              icon: 'arrow-left',
              onPress: () => props.backward(),
              //disabled: 'true'
            },
            {
              value: 'next',
              label: 'Next',
              icon: 'arrow-right',
              onPress: () => {
                props.forward();
              },
              //disabled: props.condition !== '' ? false : true,
              //disabled: props.searchCategories.length > 0 ? false : true,
            },
          ]}
        />
      </View>
    </View>
  );
}