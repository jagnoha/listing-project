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
import Header from '../Header';

const PriceCard = ({ item, onPress }) => {
  return (
    <View style={{ margin: 10 }}>
      <View>
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
          /*right={(props) => (
            <Chip icon='currency-usd' onPress={() => console.log('Pressed')}>
              {item.price.value}
            </Chip>
          )}*/
        />
        {/*<Text style={{textAlign: 'center'}}>{item.price}</Text>*/}

        {/*<List.Image variant='image' source={{ uri: item.image }} />*/}
      </View>
      {/*<View style={{ marginLeft: '30%', paddingBottom: 10}}><Text style={{fontWeight:'bold'}}>{item.shop}</Text></View>*/}

      <View
        style={{ marginLeft: '20%', marginRight: '20%', flexDirection: 'row' }}
      >
        <Chip
          mode={'outlined'}
          icon='currency-usd'
          //onPress={() => onPress(item.itemId)}
          style={{ margin: 10 }}
          //elevated={4}
        >
          {item.price.value}
        </Chip>
        {/*<Chip
          mode={'outlined'}
          icon='currency-usd'
          onPress={() => onPress(item.itemId)}
          style={{ margin: 10 }}
          //elevated={4}
        >
          {item.price.value}
          </Chip>*/}
        <Button
          icon='cog-outline'
          style={{ margin: 10 }}
          onPress={() => console.log('SELECTED!')}
        >
          Use it
        </Button>
      </View>
    </View>
  );
};

export default function SearchProductFromEbay(props) {
  //const theme = useTheme();

  const renderItem = ({ item }) => {
    return (
      <PriceCard
        item={item}
        onPress={() => {
          props.onChangeProductPrice(item.price);
          onClosePriceList();
        }}
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
          Do a search on eBay. You can use the product description, part number,
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
                //onPress={() => console.log('END EDITTING!!!!')}
              />
            }
            onChangeText={props.onSearchCategories}
            value={props.searchCategories}
            onEndEditing={() =>
              props.getProductSearchList(props.searchCategories)
            }
          />
        }

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
