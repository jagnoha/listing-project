import React from 'react';
import { View } from 'react-native';
import {
  useTheme,
  Text,
  Card,
  Surface,
  Button,
  Searchbar,
  SegmentedButtons,
  TextInput,
  Banner,
} from 'react-native-paper';
import Header from '../Header';

export default function SearchProduct(props) {
  //const theme = useTheme();

  return (
    <View>
      <Header
        title={props.title}
        type={props.typeHeader}
        //type='createListing'
        actionBack={props.navigation.goBack}
      />
      <View>
        <Banner visible={true} icon={'head-lightbulb-outline'}>
        We'd like to know a little bit about the item you'd like to create. Tell us something about it. What is it?
        </Banner>

        {/*<Searchbar
          icon='pencil'
          placeholder='What is this item?'
          onChangeText={props.onSearchCategories}
          value={props.searchCategories}
        />*/}
        <TextInput
        mode='outlined'
        style={{margin: 10}}
          placeholder='What is this item?'
          left={<TextInput.Icon icon='pencil' />}
          onChangeText={props.onSearchCategories}
          value={props.searchCategories}
        />

        <SegmentedButtons
          style={props.styles.nextBackControl}
          onValueChange={() => console.log('Change value')}
          buttons={[
            {
              value: 'back',
              label: 'Back',
              icon: 'arrow-left',
              onPress: () => props.backward(),
              disabled: 'true',
            },
            {
              value: 'next',
              label: 'Next',
              icon: 'arrow-right',
              onPress: () => {
                props.setCategory('');
                props.forward();
              },
              disabled: props.searchCategories.length > 0 ? false : true,
            },
          ]}
        />
      </View>
    </View>
  );
}
