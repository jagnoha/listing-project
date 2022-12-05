import React, { useState, useCallback } from 'react';
import { View, ScrollView, Pressable, FlatList, Linking } from 'react-native';
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

const URL_EBAY_BUSINESS =
  'https://www.bizpolicy.ebay.com/businesspolicy/policyoptin';

const PolicyCard = ({ item, onPress }) => {
  return (
    <View style={{ margin: 7 }}>
      <Pressable onPress={onPress}>
        <Card>
          <Card.Content>
            <View>
              <Title style={{ fontSize: 17 }}>{item.name}</Title>
              <Paragraph style={{ fontSize: 14 }}>{item.description}</Paragraph>
            </View>
          </Card.Content>
        </Card>
      </Pressable>
    </View>
  );
};

const PolicyCardScrollList = ({
  policyList,
  onCloseList,
  title,
  onClickItem,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [list, setList] = useState(policyList);

  const onChangeSearch = (query) => {
    setSearchQuery(query);

    const tempPolicyList = policyList.map((item) => {
      return {
        id: item.id,
        name: item.name,
        upperName: item.name.toUpperCase(),
        description: item.description,
      };
    });

    setList(
      tempPolicyList.filter((item) =>
        item.upperName.includes(query.toUpperCase())
      )
    );
  };

  const renderItem = ({ item }) => {
    return (
      <PolicyCard
        item={item}
        onPress={() => {
          onClickItem(item.id);
          onCloseList();
        }}
      />
    );
  };

  //console.log(props.paymentPolicies);

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
      <Text style={{ fontSize: 20, paddingBottom: 20 }}>{title}</Text>

      <Surface style={{ width: 300, height: 450 }} elevation={4}>
        <Searchbar
          placeholder={'Search'}
          onChangeText={onChangeSearch}
          value={searchQuery}
          icon={'magnify'}
        />

        <FlatList
          data={list}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
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
    </View>
  );
};

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

  /*const handlePressBusinessPolicies = useCallback(async (url) => {
      // Checking if the link is supported for links with custom URL scheme.
      const supported = await Linking.canOpenURL(url);
  
      if (supported) {
        // Opening the link with some app, if the URL scheme is "http" the web link should be opened
        // by some browser in the mobile
        await Linking.openURL(url);
      } else {
        Alert.alert(`Don't know how to open this URL: ${url}`);
      }
    }, [url]);*/

  const handlePressBusinessPolicies = async (url) => {
    const supported = await Linking.canOpenURL(url);

    if (supported) {
      await Linking.openURL(url);
    } else {
      Alert.alert(`Don't know how to open this URL: ${url}`);
    }
  };

  const getPaymentName = (id) => {
    //console.log(props.paymentPolicies);

    /*if (props.paymentPolicies && props.paymentPolicies.type === 'EbayError' ){
        console.log('ERRRRRRRRRRRRRRRRRRRORRRRRRRRRR!');
    } else {*/

    const policy = Array.isArray(props.paymentPolicies)
      ? props.paymentPolicies.find((item) => item.id === id)
      : false;

    if (policy) {
      return policy.name;
    }

    //}

    return '';
  };

  const getFulfillmentName = (id) => {
    const policy = Array.isArray(props.fulfillmentPolicies)
      ? props.fulfillmentPolicies.find((item) => item.id === id)
      : false;

    if (policy) {
      return policy.name;
    }

    return '';
  };

  const getReturnName = (id) => {
    const policy = Array.isArray(props.returnPolicies)
      ? props.returnPolicies.find((item) => item.id === id)
      : false;

    if (policy) {
      return policy.name;
    }

    return '';
  };

  if (openPaymentList) {
    return (
      <PolicyCardScrollList
        policyList={props.paymentPolicies}
        onCloseList={onCloseList}
        title={'Select eBay Payment Policy'}
        onClickItem={props.onClickPaymentPolicy}
      />
    );
  }

  if (openReturnList) {
    return (
      <PolicyCardScrollList
        policyList={props.returnPolicies}
        onCloseList={onCloseList}
        title={'Select eBay Return Policy'}
        onClickItem={props.onClickReturnPolicy}
      />
    );
  }

  if (openFulfillmentList) {
    return (
      <PolicyCardScrollList
        policyList={props.fulfillmentPolicies}
        onCloseList={onCloseList}
        title={'Select eBay Fulfillment Policy'}
        onClickItem={props.onClickFulfillmentPolicy}
      />
    );
  }

  return (
    <View>
      <Header
        title={props.title}
        //type='createListing'
        type={props.typeHeader}
        actionBack={props.navigation.goBack}
      />
      <View>
        <Banner visible={true} icon={'postage-stamp'}>
          Select eBay's Fulfillment, Payment and Return Policies.
        </Banner>

        {props.processingPolicies || props.fetchPoliciesProcessing ? (
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
              //onPress={() => onOpenFulfillmentList()}
              onPress={
                Array.isArray(props.fulfillmentPolicies)
                  ? () => onOpenFulfillmentList()
                  : () => handlePressBusinessPolicies(URL_EBAY_BUSINESS)
              }
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

                    {props.fulfillmentPolicyId !== '' ? (
                      <Text>
                        <IconButton
                          icon='check-outline'
                          iconColor={'green'}
                          size={15}
                        />
                      </Text>
                    ) : (
                      ''
                    )}
                  </View>

                  {Array.isArray(props.fulfillmentPolicies) ? (
                    <Paragraph style={{ fontWeight: 'bold' }}>
                      {getFulfillmentName(props.fulfillmentPolicyId)}
                    </Paragraph>
                  ) : (
                    <Paragraph style={{ fontWeight: 'bold', color: 'red' }}>
                      Configure Business Policies on Ebay
                    </Paragraph>
                  )}
                </Card.Content>
              </Card>
            </Pressable>
            <Pressable
              //onPress={() => props.onSelectedCategory(item.categoryId)}
              onPress={
                Array.isArray(props.paymentPolicies)
                  ? () => onOpenPaymentList()
                  : () => handlePressBusinessPolicies(URL_EBAY_BUSINESS)
              }
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
                    {props.paymentPolicyId !== '' ? (
                      <Text>
                        <IconButton
                          icon='check-outline'
                          iconColor={'green'}
                          size={15}
                        />
                      </Text>
                    ) : (
                      ''
                    )}
                  </View>
                  {Array.isArray(props.paymentPolicies) ? (
                    <Paragraph style={{ fontWeight: 'bold' }}>
                      {getPaymentName(props.paymentPolicyId)}
                    </Paragraph>
                  ) : (
                    <Paragraph style={{ fontWeight: 'bold', color: 'red' }}>
                      Configure Business Policies on Ebay
                    </Paragraph>
                  )}
                </Card.Content>
              </Card>
            </Pressable>
            <Pressable
              //onPress={() => props.onSelectedCategory(item.categoryId)}
              onPress={
                Array.isArray(props.returnPolicies)
                  ? () => onOpenReturnList()
                  : () => handlePressBusinessPolicies(URL_EBAY_BUSINESS)
              }
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
                    {props.returnPolicyId !== '' ? (
                      <Text>
                        <IconButton
                          icon='check-outline'
                          iconColor={'green'}
                          size={15}
                        />
                      </Text>
                    ) : (
                      ''
                    )}
                  </View>
                  {Array.isArray(props.returnPolicies) ? (
                    <Paragraph style={{ fontWeight: 'bold' }}>
                      {getReturnName(props.returnPolicyId)}
                    </Paragraph>
                  ) : (
                    <Paragraph style={{ fontWeight: 'bold', color: 'red' }}>
                      Configure Business Policies on Ebay
                    </Paragraph>
                  )}
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
              value: 'refresh',
              label: 'Refresh',
              icon: 'reload',
              onPress: () => props.fetchPolicies(),
              //disabled: 'true'
            },
            {
              value: 'next',
              label: 'Next',
              icon: 'arrow-right',
              onPress: () => {
                props.forward();
                props.onProcessingTitle();
              },
              disabled:
                props.paymentPolicyId === '' ||
                props.returnPolicyId === '' ||
                props.fulfillmentPolicyId === ''
                  ? true
                  : false,
              //disabled: props.condition !== '' ? false : true,
              //disabled: props.searchCategories.length > 0 ? false : true,
            },
          ]}
        />
        <Button
          style={{ marginTop: 15 }}
          icon='clock-edit-outline'
          onPress={() => props.saveListing()}
        >
          Finish this listing later
        </Button>
      </View>
    </View>
  );
}
