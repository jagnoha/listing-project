import React, {useState} from 'react';
import { Pressable, ScrollView, View, Image } from 'react-native';
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

  if (openPriceList){
    return (
        <View
        style={{
            flex: 1,
            //justifyContent: 'space-between',
            alignItems: 'center',
            alignContent: 'center',
            alignSelf: 'center',
            paddingTop: 50,
            //paddingBottom: 100,
          }}
      >
        <Text style={{ fontSize: 20, paddingBottom: 20 }}>
          Price List
        </Text>
        
        <ScrollView style={{ height: 400 }}>

          {
            props.pricingList.map(item => (
                
                    <Pressable
                    onPress={() => console.log(item.itemId)}
                  >
                    <Card key={item.itemId}>
                      <Card.Content>
                      <View
                          style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                          }}
                        >
                          <View>
                             

                            

                            <Title style={{fontSize: 15}}>{item.title}</Title>
                            
                            <Paragraph style={{fontSize: 20}}>{item.price}</Paragraph>

                            <Paragraph>Free Shipping: {item.freeShipping}</Paragraph>
                            
                            <Paragraph>{item.condition}</Paragraph>

                            {/*<Paragraph>{item.subtitle}</Paragraph>*/}
                          </View>
                          {/*props.category === item.categoryId ? <View>
                          <IconButton
                              icon='check-outline'
                              iconColor={'green'}
                              size={20}
                            />
                        </View> : ''*/}
                        </View>
                      </Card.Content>

                        

                    </Card>
                  </Pressable>
                
            ))
          }
       

       

            
            
        </ScrollView>
        
        <Button onPress={()=>onClosePriceList()}>Close</Button>
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
                <TextInput style={{fontSize: 40}} label='Price' value='0.00' keyboardType='decimal-pad' mode='outlined' />
        </Surface>    

        {!props.processingPrices ? <Button onPress={()=>props.getPrices()}>Get Recommended Price</Button>: <Text>Processing Prices</Text>}

        {props.prices.length > 0 ?
            <View>
            <Text>Lower Price: {props.prices[0]}</Text>
            <Text>Avg Price: {props.prices[1]}</Text>
            <Button onPress={()=>onOpenPriceList()}>Pricing List</Button>            
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
