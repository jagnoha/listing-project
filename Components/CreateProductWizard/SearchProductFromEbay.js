import React from 'react';
import { Pressable, ScrollView, View, Image, FlatList } from 'react-native';
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
  ActivityIndicator,
  Chip,
  List,
} from 'react-native-paper';
import { BarCodeScanner } from 'expo-barcode-scanner';
import Header from '../Header';

const PriceCard = ({ item, onPress, onPressImage }) => {
  return (
    <View style={{ margin: 10 }}>
      <View>
      <Card>
        {/*<Card.Cover source={{ uri: item.image.imageUrl }} />*/}
        <Card.Title
          
          titleStyle={{ fontSize: 12, paddingLeft: 10 }}
          subtitleStyle={{ fontSize: 12, paddingLeft: 10, fontWeight: 'bold' }}
          style={{ padding: 7 }}
          title={item.title}
          //subtitle={'FreeShipping: ' + item.freeShipping}
          subtitle={item.condition}
          //subtitle={(props) => {<Text>Hola</Text>}}
          titleNumberOfLines={4}
          subtitleNumberOfLines={2}
          //subtitle="Card Subtitle"
          left={(props) => (
            <List.Image variant='image' source={{ uri: item.image.imageUrl }} />
            
            
          )}

          
          
        />

            <Card.Actions style={{alignSelf: 'center'}}>
            <Button
                      icon='currency-usd'
                      style={{ margin: 10 }}
                      labelStyle={{fontSize: 15}}
                      
                      //onPress={() => onPress(item.itemId)}
                    >
                      {item.price.value}
                    </Button>
            <Button
                      icon='cog-outline'
                      labelStyle={{fontSize: 13}}
                      
                      style={{ margin: 10 }}
                      onPress={() => onPress(item.legacyItemId)}
                    >
                      Use it
                    </Button>
                  
                </Card.Actions>

        </Card>
    

        {/*<Text style={{textAlign: 'center'}}>{item.price}</Text>*/}

        {/*<List.Image variant='image' source={{ uri: item.image }} />*/}
      </View>
      {/*<View style={{ marginLeft: '30%', paddingBottom: 10}}><Text style={{fontWeight:'bold'}}>{item.shop}</Text></View>*/}

      
    </View>
  );
};

export default function SearchProductFromEbay(props) {
  //const theme = useTheme();

  const renderItem = ({ item }) => {
    return (
      <PriceCard
        item={item}
        /*onPress={() => {
          getItemFromEbay
          //props.onChangeProductPrice(item.price);          
          //onClosePriceList();
        }}*/
        onPress={props.getItemFromEbay}
        onPressImage={()=>console.log('PRESSED IMAGE!!!')}
      />
    );
  };

  /*if (props.processingPrices) {
    return (
      <View
        style={{
          alignContent: 'center',
          justifyContent: 'center',
          alignItems: 'center',
          height: 500,
        }}
      >
        <ActivityIndicator
          size='large'
          style={{ marginTop: '20%', marginBottom: '20%' }}
        />
      </View>
    );
  }*/

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
          onBarCodeScanned={props.handleBarCodeScannedInEbaySearch}
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
        type={props.typeHeader}
        //type='createListing'
        actionBack={props.navigation.goBack}
      />
      <View>
        <Banner visible={true} icon={props.checkType(props.type.toUpperCase())}>
          Find a product like yours on eBay. You can use the product description, part number,
          UPC/ISBN/EIN or even the eBay Item ID.
        </Banner>

        {/*
          <Searchbar
            icon='pencil'
            placeholder='What is this item?'
            onChangeText={props.onSearchCategories}
            value={props.searchCategories}
          />
  */}
        {
          <TextInput
            mode='outlined'
            style={{ margin: 10 }}
            placeholder='Search Products'
            //left={<TextInput.Icon icon='pencil' />}
            right={
              <TextInput.Icon
                icon='magnify'
                onPress={() => props.getProductSearchList(props.searchCategories)}
              />
            }
            onChangeText={props.onSearchCategories}
            value={props.searchCategories}
            onEndEditing={() =>
              props.getProductSearchList(props.searchCategories)
            }
          />
        }

        <View style={{marginBottom: -5}}>
          <Text style={{textAlign: 'center'}}>Or</Text>
        </View>

        <View style={{ marginLeft: 60, marginRight: 60, marginTop: 20 }}>
          <Button
            icon='barcode'
            mode='contained'
            onPress={() => props.onOpenBarcode(true)}
          >
            Scan barcode
          </Button>
        </View>

        {props.processingPrices ? (
          <View
            style={{
              alignContent: 'center',
              justifyContent: 'center',
              alignItems: 'center',
              //height: 500,
            }}
          >
            <ActivityIndicator
              size='large'
              style={{ marginTop: '20%', marginBottom: '20%' }}
            />
          </View>
        ) : (
          ''
        )}

        {props.productSearchList &&
        props.productSearchList.length > 0 &&
        !props.processingPrices ? (
          <View
            style={{
              //flex: 1,

              alignItems: 'center',
              alignContent: 'center',
              alignSelf: 'center',
              paddingTop: 10,
            }}
          >
            <Surface
              style={{
                width: 325,
                height: 350,
                paddingTop: 10,
                paddingBottom: 20,
              }}
              elevation={4}
            >
              <FlatList
                data={props.productSearchList}
                renderItem={renderItem}
                keyExtractor={(item) => item.itemId}
                //onEndReachedThreshold={50}
              />
            </Surface>
          </View>
        ) : (
          ''
        )}
      </View>
    </View>
  );
}
