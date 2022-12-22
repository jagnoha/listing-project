import React from 'react';
import { View } from 'react-native';
import {
  useTheme,
  Text,
  Card,
  Surface,
  Button,
  SegmentedButtons,
  Banner,
  Chip,
} from 'react-native-paper';

import { BarCodeScanner } from 'expo-barcode-scanner';
import Header from '../Header';

export default function BarcodeStage(props) {
  //const theme = useTheme();

  /*const processCategories = () => {
    //console.log('CATEGORY: ', props.category);
    

    if (props.category === '') {
      props.getCategories();
    }

    props.forward();
  };*/

  if (props.barcodeOpen) {
    return (
      <View
        style={{
          flex: 1,
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <BarCodeScanner
          onBarCodeScanned={props.handleBarCodeScanned}
          style={props.styles.containerBarcode}
        />

        <Button
          mode='outlined'
          icon={'close'}
          onPress={() => props.onOpenBarcode(false)}
        >
          Close
        </Button>
      </View>
    );
  }

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
        <Banner visible={true} icon={'barcode'}>
          If this item contains a barcode (UPC, EAN, ISBN), it might be useful
          to get that information to create a better listing.
        </Banner>

        <View style={{ marginLeft: 60, marginRight: 60, marginTop: 20 }}>
          <Button
            icon='barcode'
            mode='contained'
            onPress={() => props.onOpenBarcode(true)}
          >
            Scan barcode
          </Button>
        </View>

        {props.barcodeValue ? (
          <View style={{ marginLeft: 60, marginRight: 60, marginTop: 20 }}>
            <Chip
              closeIcon='close'
              onClose={() => props.deleteBarcodeValue()}
              mode='outlined'
              icon='barcode'
            >
              {props.barcodeValue}
            </Chip>
          </View>
        ) : (
          ''
        )}

        <SegmentedButtons
          style={props.styles.nextBackControl}
          onValueChange={() => console.log('Change value2')}
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
              onPress: () => props.forward(),
            },
          ]}
        />
        {/*
          <Button
            style={{ marginTop: 15 }}
            icon='clock-edit-outline'
            onPress={() => props.saveListing()}
          >
            Save and close to finish later
          </Button>
        */}
      </View>
    </View>
  );
}
