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
} from 'react-native-paper';
import Header from '../Header';

export default function TitleRevisionStage(props) {
  //const theme = useTheme();

  return (
    <View>
      <Header
        title={props.title}
        type='createListing'
        actionBack={props.navigation.goBack}
      />
      <View>
        <Banner visible={true} icon={'draw'}>
        A <Text style={{fontWeight:'bold'}}>Title</Text> and <Text style={{fontWeight:'bold'}}>Description</Text> for your new listing was processed and built. You can review it and make any changes you want before continuing.            
        </Banner>

        

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
              disabled: true, //props.category !== '' ? false : true,

            },
          ]}
        />
      </View>
    </View>
  );
}