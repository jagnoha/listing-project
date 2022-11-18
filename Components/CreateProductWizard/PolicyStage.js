import React, { useState } from 'react';
import { View, ScrollView, Pressable, FlatList } from 'react-native';
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
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from '../Header';

const PolicyCard = ({item, onPress}) => {
    return (
        <View style={{margin: 7}}>
            <Pressable                
                onPress={onPress}
              >
                <Card>
                  <Card.Content>
                    <View                    
                    >
                      <Title style={{fontSize: 17}}>{item.name}</Title>
                      <Paragraph style={{fontSize: 14}}>{item.description}</Paragraph>
                    </View>
                  </Card.Content>
                </Card>

              </Pressable>

        </View>
    )
}

const PolicyCardScrollList = ({ policyList, onCloseList, title, onClickItem }) => {

    const [searchQuery, setSearchQuery] = useState('');
    const [list, setList] = useState(policyList);

    const onChangeSearch = (query) => {
        
        setSearchQuery(query);

        const tempPolicyList = policyList.map(item =>{
            return (
            {
                id: item.id,
                name: item.name,
                upperName: item.name.toUpperCase(),
                description: item.description,


            })
        }
        )

        setList(tempPolicyList.filter(item => item.upperName.includes(query.toUpperCase())))

    }

    const renderItem = ({item}) => {
        return (
            <PolicyCard item={item} onPress={()=>{ onClickItem(item.id); onCloseList()  }} />
        )
    }

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
          {title}
        </Text>

        <Surface style={{ width: 300, height: 450 }} elevation={4}>
            <Searchbar
              placeholder={
                'Search'
              }
              onChangeText={onChangeSearch}
              value={searchQuery}
              icon={'magnify'}
            />
            
            <FlatList 
                data={list}
                renderItem={renderItem}
                keyExtractor={(item)=>item.id}
                //onEndReachedThreshold={50}
            />
            
            
        </Surface>
        <Button
          icon='close'
          style={{ marginTop: 20 }}
          mode='contained'
          onPress={() => onCloseList()}
        >
          Close
        </Button>

      </View>)
}



export default function PolicyStage(props) {
  //const theme = useTheme();

  //console.log(props.categoryFeatures);

  const [openPaymentList, setOpenPaymentList] = useState(false);
  const [openReturnList, setOpenReturnList] = useState(false);
  const [openFulfillmentList, setOpenFulfillmentList] = useState(false);

  const onOpenPaymentList = () => {
    setOpenPaymentList(true);
  };

  const onOpenReturnList = () => {
    setOpenReturnList(true);
  };

  const onOpenFulfillmentList = () => {
    setOpenFulfillmentList(true);
  };

  const onCloseList = () => {
    setOpenPaymentList(false);
    setOpenReturnList(false);
    setOpenFulfillmentList(false);
  };

  const getPaymentName = (id) => {
    const policy = props.paymentPolicies.find(item => item.id === id);

    
    if (policy){
        return policy.name;
    }

    return ''
    
    
  }

  const getFulfillmentName = (id) => {
    const policy = props.fulfillmentPolicies.find(item => item.id === id);

    
    if (policy){
        return policy.name;
    }

    return ''
    
    
  }

  const getReturnName = (id) => {
    const policy = props.returnPolicies.find(item => item.id === id);

    
    if (policy){
        return policy.name;
    }

    return ''
    
    
  }


if (openPaymentList) {
    return (
        <PolicyCardScrollList policyList={props.paymentPolicies} onCloseList={onCloseList} title={'Select eBay Payment Policy'} onClickItem={props.onClickPaymentPolicy}  />
    )
}

if (openReturnList) {
    return (
        <PolicyCardScrollList policyList={props.returnPolicies} onCloseList={onCloseList} title={'Select eBay Return Policy'} onClickItem={props.onClickReturnPolicy}  />
    )
}

if (openFulfillmentList) {
    return (
        <PolicyCardScrollList policyList={props.fulfillmentPolicies} onCloseList={onCloseList} title={'Select eBay Fulfillment Policy'} 
        onClickItem={props.onClickFulfillmentPolicy}  />
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
              onPress={() => onOpenFulfillmentList()}
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
                              
                    {props.fulfillmentPolicyId !== '' ? <Text><IconButton
                                icon='check-outline'
                                iconColor={'green'}
                                size={15}
                              /></Text> : ''}
                    
                  </View>
                  <Paragraph style={{fontWeight:'bold'}}>
                        {getFulfillmentName(props.fulfillmentPolicyId)}
                    </Paragraph>
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
                    {props.paymentPolicyId !== '' ? <Text><IconButton
                                icon='check-outline'
                                iconColor={'green'}
                                size={15}
                              /></Text> : ''}
                   
                  </View>
                  <Paragraph style={{fontWeight:'bold'}}>
                        {getPaymentName(props.paymentPolicyId)}
                    </Paragraph>
                </Card.Content>
              </Card>
            </Pressable>
            <Pressable
              //onPress={() => props.onSelectedCategory(item.categoryId)}
              onPress={() => onOpenReturnList()}
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
                    {props.returnPolicyId !== '' ? <Text><IconButton
                                icon='check-outline'
                                iconColor={'green'}
                                size={15}
                              /></Text> : ''}
                    
                  </View>
                  <Paragraph style={{fontWeight:'bold'}}>
                    {getReturnName(props.returnPolicyId)}
                  </Paragraph>
                </Card.Content>
              </Card>
            </Pressable>
          </View>
        )}

        

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
              disabled: props.paymentPolicyId === '' || props.returnPolicyId === '' || props.fulfillmentPolicyId === '' ? true : false
              //disabled: props.condition !== '' ? false : true,
              //disabled: props.searchCategories.length > 0 ? false : true,
            },
          ]}
        />
      </View>
    </View>
  );
}
