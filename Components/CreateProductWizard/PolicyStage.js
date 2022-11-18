import React, { useState } from 'react';
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
  Paragraph,
} from 'react-native-paper';
import Header from '../Header';

export default function PolicyStage(props) {
  //const theme = useTheme();

  //console.log(props.categoryFeatures);

  const [openPaymentList, setOpenPaymentList] = useState(false);

  const onOpenPaymentList = () => {
    setOpenPaymentList(true);
  };

  const onCloseList = () => {
    setOpenPaymentList(false);
  };

  if (openPaymentList) {
    return (
      <View
        style={{
          flex: 1,
          //justifyContent: 'space-between',
          alignItems: 'center',
          alignContent: 'center',
          alignSelf: 'center',
          paddingTop: 100,
          //paddingBottom: 100,
        }}
      >
        <Text style={{ fontSize: 20, paddingBottom: 20 }}>
          Select an eBay Payment Policy
        </Text>
        <ScrollView style={{ height: '50%' }}>
          {props.paymentPolicies.map((item) => (
            <View key={item.paymentPolicyId} style={{ margin: 10 }}>
              <Pressable
                //onPress={() => props.onSelectedCategory(item.categoryId)}
                onPress={() => console.log(item)}
              >
                <Card>
                  <Card.Content>
                    <View
                    /*style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                    }}*/
                    >
                      <Title>{item.name}</Title>
                      <Paragraph>{item.description}</Paragraph>
                    </View>
                  </Card.Content>
                </Card>
              </Pressable>
            </View>
          ))}
        </ScrollView>

        <Button onPress={() => onCloseList()}>Close</Button>
      </View>
    );
  }

  return (
    <View>
      <Header
        title={props.title}
        type='createListing'
        actionBack={props.navigation.goBack}
      />
      <View>
        <Banner visible={true} icon={'postage-stamp'}>
          Select eBay's Fulfillment, Payment and Return Policies.
        </Banner>

        {props.processingPolicies ? (
          <View>
            <ActivityIndicator
              size='large'
              style={{ marginTop: '20%', marginBottom: '20%' }}
            />
          </View>
        ) : (
          <View>
            <Pressable
              //onPress={() => props.onSelectedCategory(item.categoryId)}
              onPress={() => console.log('Fulfillment!')}
            >
              <Card>
                <Card.Content>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                    }}
                  >
                    <Title style={{ fontSize: 15 }}>Fulfillment Policy</Title>
                  </View>
                </Card.Content>
              </Card>
            </Pressable>
            <Pressable
              //onPress={() => props.onSelectedCategory(item.categoryId)}
              onPress={() => onOpenPaymentList()}
            >
              <Card>
                <Card.Content>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                    }}
                  >
                    <Title style={{ fontSize: 15 }}>Payment Policy</Title>
                  </View>
                </Card.Content>
              </Card>
            </Pressable>
            <Pressable
              //onPress={() => props.onSelectedCategory(item.categoryId)}
              onPress={() => console.log('Return!')}
            >
              <Card>
                <Card.Content>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                    }}
                  >
                    <Title style={{ fontSize: 15 }}>Return Policy</Title>
                  </View>
                </Card.Content>
              </Card>
            </Pressable>
          </View>
        )}

        {/*<View>
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

  </View>*/}

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
