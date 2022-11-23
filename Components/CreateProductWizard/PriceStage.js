import React, {useState} from 'react';
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

const PriceCard = ({item, onPress}) => {
    return (
        <View style={{margin: 10}}>
        <View>
        <Card.Title
        titleStyle={{fontSize: 12, paddingLeft: 10}}
        subtitleStyle={{fontSize: 12, paddingLeft: 10, fontWeight:'bold'}}
        style={{padding: 7}} 
        title={item.title}
        subtitle={item.condition + ' | FreeShipping: ' + item.freeShipping }
        //subtitle={(props) => {<Text>Hola</Text>}}
        titleNumberOfLines={4}
        subtitleNumberOfLines={2}
        
        //subtitle="Card Subtitle"
        left={(props) => <List.Image variant='image' source={{ uri: item.image }} />}
        /*right={(props) => <Chip icon='currency-usd' onPress={() => console.log('Pressed')}>{item.price}</Chip>}*/
      />
      {/*<Text style={{textAlign: 'center'}}>{item.price}</Text>*/}
      
            
        {/*<List.Image variant='image' source={{ uri: item.image }} />*/}
            </View>
            <View style={{marginLeft: '30%', marginRight: '30%'}}>
            <Chip mode={'outlined'} icon='currency-usd' onPress={() => onPress(item.itemId)}>{item.price}</Chip>
            </View>
            </View>

        
    )
}

export default function PriceStage(props) {
  //const theme = useTheme();

  const [openPriceList, setOpenPriceList] = useState(false);

  const onOpenPriceList = () => {
    setOpenPriceList(true);
  }

  const onApplyPriceList = () => {
    setOpenPriceList(false);
  }

  const onClosePriceList = () => {
    setOpenPriceList(false);
  }

  const renderItem = ({item}) => {
    return (
        <PriceCard item={item} onPress={()=>{ props.onChangeProductPrice(item.price); onClosePriceList()  }} />
    )
}

  if (openPriceList){
    return (
        <View
        style={{
            flex: 1,
            
            alignItems: 'center',
            alignContent: 'center',
            alignSelf: 'center',
            paddingTop: 100,
            
            
          }}
      >
        <Text style={{ fontSize: 20, paddingBottom: 20 }}>
          Price List
        </Text>
        <Surface style={{ width: 325, height: '75%' }} elevation={4}>
        
        <FlatList 
                data={props.pricingList}
                renderItem={renderItem}
                keyExtractor={(item)=>item.itemId}
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
    
    )
  }

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
                <TextInput style={{fontSize: 40}} label='Price' value={props.priceProduct} keyboardType='decimal-pad' onChangeText={(value)=>props.onChangeProductPrice(value)} mode='outlined' />
        </Surface>    

        {!props.processingPrices ? <Button icon={'reload'} onPress={()=>props.getPrices()}>Process Recommended Prices</Button>: <ActivityIndicator animating={true} />}

        {props.prices.length > 0 ?
            <View>
            <Button icon = 'format-list-text' onPress={()=>onOpenPriceList()}>Open list of products</Button>            
            </View> : ''
    
        }    

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
