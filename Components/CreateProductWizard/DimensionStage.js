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
        onDeleteItem={props.onDeleteItem}
        saveListing={props.saveListing}
        //type='createListing'
        type={props.typeHeader}
        actionBack={props.onOpenBackDialog}
        processingSaveListing={props.processingSaveListing}
      />
      <View>
        <Banner visible={true} icon={'tape-measure'}>
          Add the measurements and weight of the item. Weight are in ounces and
          pounds. Measurements are in inches.
        </Banner>

        <View>
          <View>
            <Surface
              elevation={4}
              style={{ margin: 10, marginTop: 20, padding: 10 }}
            >
              <TextInput
                mode='outlined'
                style={{ margin: 10 }}
                label='Length'
                right={<TextInput.Affix text='inches' />}
                keyboardType='decimal-pad'
                onChangeText={props.onChangeLength}
                value={props.length}
              />
              <TextInput
                mode='outlined'
                style={{ margin: 10 }}
                right={<TextInput.Affix text='inches' />}
                label='Width'
                keyboardType='decimal-pad'
                onChangeText={props.onChangeWidth}
                value={props.width}
              />
              <TextInput
                mode='outlined'
                style={{ margin: 10 }}
                right={<TextInput.Affix text='inches' />}
                label='Height'
                keyboardType='decimal-pad'
                onChangeText={props.onChangeHeight}
                value={props.height}
              />
            </Surface>
          </View>
          <View>
            <Surface elevation={4} style={{ margin: 10, padding: 10 }}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-evenly',
                }}
              >
                <TextInput
                  mode='outlined'
                  style={{ margin: 10 }}
                  right={<TextInput.Affix text='lbs' />}
                  label='Weight (lbs)'
                  keyboardType='decimal-pad'
                  onChangeText={props.onChangeWeightMayor}
                  value={props.weightMayor}
                  width={125}
                />
                <TextInput
                  mode='outlined'
                  style={{ margin: 10 }}
                  right={<TextInput.Affix text='oz' />}
                  label='Weight (oz)'
                  keyboardType='decimal-pad'
                  onChangeText={props.onChangeWeightMinor}
                  value={props.weightMinor}
                  width={125}
                />
              </View>
            </Surface>
          </View>
        </View>

        <SegmentedButtons
          style={props.styles.nextBackControl}
          onValueChange={() => console.log('Change value')}
          buttons={[
            {
              value: 'firststep',
              //label: 'First Step',
              icon: 'page-first',
              onPress: () => {
                props.goToFirstStep();
                //props.getCategoriesFeatures(props.category);
              },
              //disabled: 'false'
              //disabled: categoryId
            },
            {
              value: 'back',
              //label: 'Back',
              icon: 'arrow-left',
              onPress: () => props.backward(),
              //disabled: 'true'
            },
            {
              value: 'next',
              //label: 'Next',
              icon: 'arrow-right',
              onPress: () => {
                //props.onProcessingTitle();
                props.forward();
                //props.getPolicies();
              },
              //disabled: props.condition !== '' ? false : true,
              //disabled: props.searchCategories.length > 0 ? false : true,
            },
          ]}
        />
        {/*<Button
          style={{ marginTop: 15 }}
          icon='clock-edit-outline'
          onPress={() => props.saveListing()}
        >
          Save and close to finish later
        </Button>*/}
      </View>
    </View>
  );
}
