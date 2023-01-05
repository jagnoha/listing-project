import React, { useState, useEffect } from 'react';
import { Pressable, ScrollView, View, Image, FlatList } from 'react-native';
import {
  useTheme,
  Text,
  Card,
  Chip,
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
          subtitle={item.condition === 'USED' ? 'Used' : 'New' + ' | FreeShipping: ' + item.freeShipping}
          //subtitle={(props) => {<Text>Hola</Text>}}
          titleNumberOfLines={4}
          subtitleNumberOfLines={2}
          //subtitle="Card Subtitle"
          left={(props) => (
            <List.Image variant='image' source={{ uri: item.image }} />
          )}
          
          /*right={(props) => <Chip icon='currency-usd' onPress={() => console.log('Pressed')}>{item.price}</Chip>}*/
        />
        {/*<Text style={{textAlign: 'center'}}>{item.price}</Text>*/}

        {/*<List.Image variant='image' source={{ uri: item.image }} />*/}
      </View>
      {/*<View style={{ marginLeft: '30%', paddingBottom: 10}}><Text style={{fontWeight:'bold'}}>{item.shop}</Text></View>*/}

      <Button icon='store'>
         {item.shop}
      </Button>

      {/*<View style={{ marginLeft: '30%', marginRight: '30%' }}>
        <Chip
          mode={'outlined'}
          icon='currency-usd'
          onPress={() => onPress(item.itemId)}
          //elevated={4}
        >
          {item.price}
        </Chip>
          </View>*/}


      <View
        style={{ flexDirection: 'row', alignSelf: 'center'  }}
      >
        <Chip
          mode={'outlined'}
          icon='currency-usd'
          //onPress={() => onPress(item.itemId)}
          style={{ margin: 10 }}
          //elevated={4}
        >
          {item.price}
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
          icon='check'
          style={{ margin: 10 }}
          onPress={() => onPress(item.itemId)}
        >
          Use this price
        </Button>
      </View>



    </View>
  );
};

export default function PriceStage(props) {
  //const theme = useTheme();

  const [openPriceList, setOpenPriceList] = useState(false);

  useEffect(() => {
    (async () => {
      console.log('Opening prices!!!!');
      //props.onProcessingTitle(props.category);
      //props.getGooglePrices();
    })();
  }, []);

  const onOpenPriceList = () => {
    setOpenPriceList(true);
  };

  const onApplyPriceList = () => {
    setOpenPriceList(false);
  };

  const onClosePriceList = () => {
    setOpenPriceList(false);
  };

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

  if (openPriceList) {
    return (
      <View
        style={{
          flex: 1,

          alignItems: 'center',
          alignContent: 'center',
          alignSelf: 'center',
          paddingTop: 20,
        }}
      >
        <View>
          <Text style={{ fontSize: 20, marginBottom: 15, textAlign: 'center', fontWeight: 'bold' }}>Price List</Text>
          <Text style={{ fontSize: 15, marginBottom: 20, textAlign:'center' }}>
          Internet reference prices
          </Text>
        
        </View>
        <Surface
          style={{
            width: 325,
            height: '75%',
            paddingTop: 10,
            paddingBottom: 20,
          }}
          elevation={4}
        >
          <FlatList
            data={props.pricingList}
            renderItem={renderItem}
            keyExtractor={(item) => item.itemId}
            //onEndReachedThreshold={50}
          />
        </Surface>

        <Button
          icon='close'
          style={{ marginTop: 20 }}
          mode='contained'
          onPress={() => onClosePriceList()}
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
        //type='createListing'
        type={props.typeHeader}
        actionBack={props.onOpenBackDialog}
        onDeleteItem={props.onDeleteItem}
        saveListing={props.saveListing}
        processingSaveListing={props.processingSaveListing}
      />
      <View>
        <Banner visible={true} icon={'currency-usd'}>
          Edit the price and quantity of this item.
        </Banner>

        <Surface elevation={4} style={{ padding: 20, margin: 20 }}>
          <TextInput
            style={{ fontSize: 40 }}
            label='Quantity'
            value={props.quantity}
            onChangeText={(value) => props.onChangeQuantity(value)}
            keyboardType='numeric'
            mode='outlined'
          />
        </Surface>

        <Surface elevation={4} style={{ padding: 20, margin: 20 }}>
          <TextInput
            style={{ fontSize: 40 }}
            label='Price'
            value={props.priceProduct}
            keyboardType='decimal-pad'
            onChangeText={(value) => props.onChangeProductPrice(value)}
            mode='outlined'
          />
        </Surface>

        {/*!props.processingPrices ? <Button icon={'reload'} onPress={()=>props.getPrices()}>Process Recommended Prices</Button>: <ActivityIndicator animating={true} />*/}

        {props.processingPrices ? (
          <View>
            <Button mode='text' loading={true}>
              Getting prices
            </Button>
          </View>
        ) : props.prices.length > 0 ? (
          <View>
            <Button icon='format-list-text' onPress={() => onOpenPriceList()}>
              See internet reference prices
            </Button>
          </View>
        ) : (
          ''
        )}

        {!props.processingPrices && props.letPriceListing && !props.isChangedAspects ?  (
                <View>
                  <Button icon='refresh' onPress={() => props.getGooglePrices()}>Get internet reference prices</Button>
                </View>
        ) : ''}



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
              style: props.styles.nextBackControlButton
              //disabled: 'false'
              //disabled: categoryId
            },
            {
              value: 'back',
              //label: 'Back',
              icon: 'arrow-left',
              style: props.styles.nextBackControlButton,
              onPress: () => {
                props.backward();
                //props.getCategoriesFeatures(props.category);
              },
              //disabled: 'false'
              //disabled: categoryId
            },

            {
              value: 'itemSpecifics',
              //label: 'Back',
              icon: 'star-circle-outline',
              style: props.styles.nextBackControlButton,
              onPress: () => {
                props.goToListingDetails();
                //props.getCategoriesFeatures(props.category);
              },
              //disabled: 'false'
              //disabled: categoryId
            },

            

            {
              value: 'publish',
              label: 'Publish',

              icon: 'publish',
              style: props.styles.nextBackControlButton,
              onPress: () => props.onPublishEbay(),
              disabled:
                Number(props.priceProduct) > 0 &&
                Number(props.quantity > 0) &&
                props.titleProcessed.length <= 80 &&
                !props.isChangedAspects &&
                props.checkedAllAspects
                  ? false
                  : true,
            },
          ]}
        />

        {!props.checkedAllAspects ? (
          <Button
            onPress={() => props.goToStep(4)}
            style={{ marginTop: 15 }}
            icon='alert'
            textColor='red'
          >
            Missing some Item Specifics
          </Button>
        ) : (
          ''
        )}

        {props.isChangedAspects ? (
          <View>
            <Button
              icon='refresh'
              mode='text'
              onPress={() => props.goToStep(8)}
              labelStyle={{ fontSize: 12, color: 'red' }}
            >
              Refresh Title and Description before publish
            </Button>
          </View>
        ) : (
          ''
        )}




      </View>
      
    </View>
  );
}
