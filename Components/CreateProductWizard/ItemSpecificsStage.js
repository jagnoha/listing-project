import React, { useState, useEffect } from 'react';
import {
  View,
  ScrollView,
  Pressable,
  FlatList,
  Dimensions,
} from 'react-native';

import {
  useTheme,
  Text,
  Card,
  Chip,
  Surface,
  Button,
  Searchbar,
  SegmentedButtons,
  Banner,
  Title,
  Paragraph,
  ActivityIndicator,
  IconButton,
  TextInput,
} from 'react-native-paper';
import Header from '../Header';
import { useRecoilState } from 'recoil';
import * as Haptics from 'expo-haptics';

import snackBarAtom from '../../Store/atoms/snackBarAtom';

//const CITIES = 'Jakarta,Bandung,Sumbawa,Taliwang,Lombok,Bima'.split(',');

const AspectItemCard = ({ item, onPress }) => {
  return (
    <View style={{ margin: 7 }}>
      <Pressable onPress={onPress}>
        <Card>
          <Card.Content>
            <View>
              <Title
                style={{
                  fontSize: 17,
                  padding: 10,
                  paddingTop: 5,
                  paddingBottom: 5,
                  textAlign: 'center',
                }}
              >
                {item.name}
              </Title>
              {/*<Paragraph style={{ fontSize: 14 }}>{item.description}</Paragraph>*/}
            </View>
          </Card.Content>
        </Card>
      </Pressable>
    </View>
  );
};

export default function ItemSpecificsStage(props) {
  const [openWheel, setOpenWheel] = useState(false);
  const [selectedItem, setSelectedItem] = useState();
  const [multiSelected, setMultiSelected] = useState([]);
  const [wheelItems, setWheelItems] = useState([]);
  const [valueWheel, setValueWheel] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const [processingSelectedValue, setProcessingSelectedValue] = useState(false);

  const [snackBar, setSnackBar] = useRecoilState(snackBarAtom);

  //const [checkedAllRequired, setCheckedAllRequired] = useState(false);

  const onChangeInput = (value) => {
    setSearchQuery(value);

    if (value === '') {
      const wheelItemsList = props.aspects
        .find((itm) => itm.localizedAspectName === selectedItem.name)
        .aspectValues.map((name) => ({
          label: name,
          value: name.toUpperCase(),
        }));

      //console.log(wheelItemsList);
      setWheelItems(wheelItemsList);
    }
  };

  const onCloseMultiItem = (item) => {
    setMultiSelected((old) => old.filter((itm) => itm !== item));
  };

  const onAddMultiItem = (valueItem) => {

    Haptics.selectionAsync();

    if (wheelItems.length > 0) {
      if (!multiSelected.find((item) => item === valueItem)) {
        setMultiSelected((old) => [...old, valueItem]);
      }
    } else {
      setMultiSelected((old) => [...old, searchQuery]);
      //setSearchQuery('');
    }

    
    const wheelItemsList = props.aspectValues
      .find((itm) => itm.id === selectedItem.name)
      .value.map((valueItm) => ({
        id: valueItm,
        name: valueItm,
      }));

    //console.log(wheelItemsList);
    setWheelItems(wheelItemsList);

    setSearchQuery('');
  };

  const getValueAspect = () => {
    const aspect = props.aspects.find(
      (item) => item.localizedAspectName === selectedItem.name
    );
    const value = aspect ? aspect.value : '';

    //setSearchQuery(value);

    return value;
  };

  useEffect(() => {
    //props.processLabel();
    console.log(props.type);
    props.getAspectValues(props.category);
    props.getCategoriesFeatures(props.category);
  }, []);

  
  const onChangeSearch = (query) => {
    
    

    setSearchQuery(query);

    //console.log('SELECTED VALUE!!!: ', selectedItem.value);
    

    const wheelItemsList = props.aspectValues
      .find((itm) => itm.id === selectedItem.name)
      .value.map((valueItm) => ({
        id: valueItm.toUpperCase(),
        name: valueItm,
      }));

      
    setWheelItems(
      wheelItemsList.filter((itm) => itm.id.includes(query.toUpperCase()))
    );

    //console.log(wheelItemsList.filter((itm) => itm.id.includes(query.toUpperCase())));
  };

  const onClickItem = (item) => {
    onOpenWheel(item);
  };

  const onSelectedValue = async (value) => {
    console.log(value);

    Haptics.selectionAsync();

    props.changeValueItemAspect(selectedItem.name, value);
  };

  
  const onOpenWheel = (item) => {
    setSelectedItem({
      name: item.localizedAspectName,
      cardinality: item.cardinality,
      mode: item.mode,
      value: item.value,
    });

    setSearchQuery(item.value);
    
    
    console.log('ITEM !!!!: ', item);

    const wheelItemsList = props.aspectValues
      .find((itm) => itm.id === item.localizedAspectName)
      .value.map((valueItm) => ({
        id: valueItm.toUpperCase(),
        name: valueItm,
      }));

    setWheelItems(wheelItemsList);

    setOpenWheel(true);
  };

  const onCloseWheel = () => {
    setProcessingSelectedValue(false);
    setSelectedItem();
    setOpenWheel(false);
    setSearchQuery('');
    setWheelItems([]);
    setMultiSelected([]);
  };

  const onResetWheel = () => {
    props.changeValueItemAspect(selectedItem.name, '');
    setSelectedItem();
    setOpenWheel(false);
    setSearchQuery('');
    setWheelItems([]);
    setMultiSelected([]);
  };

  const onApplyMultiWheel = () => {
    props.changeValueItemAspect(selectedItem.name, multiSelected);

    setSnackBar({
      visible: true,
      text: `Edited ${selectedItem.name}: ${multiSelected.join(' | ')}`,
    });

    setSelectedItem();
    setValueWheel('');
    setSearchQuery('');
    setMultiSelected([]);
    setOpenWheel(false);
    setWheelItems([]);
  };

  const onApplyWheel = () => {
    const list = wheelItems.filter((itm) =>
      itm.value.includes(searchQuery.toUpperCase().trim())
    );

    //console.log(list);

    //console.log('VALUE WHEEL: ', valueWheel);
    props.changeValueItemAspect(
      selectedItem.name,
      list.length === 1
        ? list[0].label
        : wheelItems.length === 0
        ? searchQuery.trim()
        : valueWheel
    );

    setSnackBar({
      visible: true,
      text: `Edited ${selectedItem.name}: ${searchQuery.trim()}`,
    });

    setSelectedItem();
    setValueWheel('');
    setSearchQuery('');
    setMultiSelected([]);
    setOpenWheel(false);
    setWheelItems([]);
  };

  const renderItem = ({ item }) => {
    return (
      <AspectItemCard
        item={item}
        onPress={() => {
          //setProcessingSelectedValue(true);
          onSelectedValue(item.name);
          onCloseWheel();
          setSnackBar({
            visible: true,
            text: `Picked ${selectedItem.name}: ${item.name}`,
          });
          //props.onProcessingTitle();
        }}
        /*onPressIn={()=> { onSelectedValue(item.name);
          onCloseWheel();  }}*/
      />
    );
  };

  const renderItemMulti = ({ item }) => {
    return (
      <AspectItemCard
        item={item}
        onPress={() => {
          onAddMultiItem(item.name);
        }}
        
      />
    );
  };

  if (props.processingSelectedAspectValue) {
    return (
      <View>
        <ActivityIndicator
          size='large'
          style={{
            height: Dimensions.get('window').height,
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            alignSelf: 'center',
            alignContent: 'center',
          }}
        />
      </View>
    );
  }

  if (openWheel && selectedItem.cardinality === 'SINGLE') {
    return (
      <View
        style={{
          flex: 1,
          marginBottom: 50,

          alignItems: 'center',
          alignContent: 'center',
          alignSelf: 'center',
          paddingTop: 75,
        }}
      >
       

        {wheelItems.length > 0 ? (
          <Text style={{ fontSize: 20, marginBottom: 15 }}>
            Pick a {selectedItem.name}
          </Text>
        ) : (
          <Text style={{ fontSize: 20, marginBottom: 15 }}>
            Edit {selectedItem.name}
          </Text>
        )}

        <Searchbar
          style={{ margin: 25 }}
          placeholder={wheelItems.length > 0 ? 'Search' : 'Edit'}
          onChangeText={onChangeSearch}
          //value={selectedItem.value !== '' ? selectedItem.value : searchQuery}
          value={searchQuery}
          icon={wheelItems.length > 0 ? 'magnify' : 'pencil'}
        />

       

        <FlatList
          data={wheelItems}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          //onEndReachedThreshold={50}
        />

        <SegmentedButtons
          style={props.styles.nextBackControl}
          onValueChange={() => console.log('Change value')}
          buttons={
            wheelItems.length > 0
              ? [
                  {
                    value: 'close',
                    label: 'Close',
                    icon: 'close',
                    style: props.styles.nextBackControlButton,
                    onPress: () => onCloseWheel(),
                  },
                  {
                    value: 'reset',
                    label: 'Delete',
                    icon: 'cancel',
                    style: props.styles.nextBackControlButton,
                    onPress: () => onResetWheel(),
                  },
                ]
              : [
                  {
                    value: 'close',
                    label: 'Close',
                    icon: 'close',
                    style: props.styles.nextBackControlButton,
                    onPress: () => onCloseWheel(),
                  },
                  {
                    value: 'reset',
                    label: 'Delete',
                    icon: 'cancel',
                    style: props.styles.nextBackControlButton,
                    onPress: () => onResetWheel(),
                  },

                  {
                    value: 'apply',
                    label: 'Apply',
                    icon: 'check',
                    style: props.styles.nextBackControlButton,
                    onPress: () => onApplyWheel(),
                  },
                ]
          }
        />
      </View>
    );
  }

  if (openWheel && selectedItem.cardinality === 'MULTI') {
    return (
      <View
        style={{
          flex: 1,
          marginBottom: 50,

          alignItems: 'center',
          alignContent: 'center',
          alignSelf: 'center',
          paddingTop: 75,
        }}
      >
        {wheelItems.length > 0 ? (
          <Text style={{ fontSize: 20, marginBottom: 15 }}>
            Pick a {selectedItem.name}
          </Text>
        ) : (
          <Text style={{ fontSize: 20, marginBottom: 15 }}>
            Edit {selectedItem.name}
          </Text>
        )}

        <Searchbar
          style={{ margin: 25 }}
          placeholder={wheelItems.length > 0 ? 'Search' : 'Edit'}
          onChangeText={onChangeSearch}
          value={searchQuery}
          icon={wheelItems.length > 0 ? 'magnify' : 'pencil'}
        />

        <FlatList
          data={wheelItems}
          renderItem={renderItemMulti}
          keyExtractor={(item) => item.id}
          //onEndReachedThreshold={50}
        />

        <View
          style={{
            flexDirection: 'row',
            flexWrap: 'wrap',
            margin: 20,
          }}
        >
          {multiSelected.map((item) => {
            return (
              <View key={item}>
                <Chip
                  style={{ margin: 5 }}
                  closeIcon='close'
                  compact={true}
                  //mode='outlined'
                  mode='flat'
                  onClose={() => onCloseMultiItem(item)}
                >
                  {item}
                </Chip>
              </View>
            );
          })}
        </View>

        <SegmentedButtons
          style={props.styles.nextBackControl}
          onValueChange={() => console.log('Change value')}
          buttons={
            wheelItems.length > 0
              ? [
                  {
                    value: 'close',
                    label: 'Close',
                    icon: 'close',
                    onPress: () => onCloseWheel(),
                    style: props.styles.nextBackControlButton,
                  },
                  {
                    value: 'reset',
                    label: 'Delete',
                    icon: 'cancel',
                    onPress: () => onResetWheel(),
                    style: props.styles.nextBackControlButton,
                  },
                  {
                    value: 'apply',
                    label: 'Apply',
                    icon: 'check',
                    disabled: multiSelected.length > 0 ? false : true,
                    onPress: () => onApplyMultiWheel(),
                    style: props.styles.nextBackControlButton,
                  },
                ]
              : [
                  {
                    value: 'close',
                    label: 'Close',
                    icon: 'close',
                    onPress: () => onCloseWheel(),
                    style: props.styles.nextBackControlButton,
                  },
                  {
                    value: 'reset',
                    label: 'Delete',
                    icon: 'cancel',
                    onPress: () => onResetWheel(),
                    style: props.styles.nextBackControlButton,
                  },

                  {
                    value: 'add',
                    label: 'Add',
                    icon: 'plus',
                    onPress: () => onAddMultiItem(searchQuery),
                    style: props.styles.nextBackControlButton,
                  },
                  {
                    value: 'apply',
                    label: 'Apply',
                    icon: 'check',
                    disabled: multiSelected.length > 0 ? false : true,
                    onPress: () => onApplyMultiWheel(),
                    style: props.styles.nextBackControlButton,
                  },
                ]
          }
        />
      </View>
    );
  }
  
  return (
    <View>
      <Header
        title={props.title}
        //type='createListing'
        onDeleteItem={props.onDeleteItem}
        saveListing={props.saveListing}
        type={props.typeHeader}
        actionBack={props.onOpenBackDialog}
        processingSaveListing={props.processingSaveListing}
      />
      <View>
        <Banner visible={true} icon={'star-circle-outline'}>
          Add item details. Some of them are required to continue to the next
          step. The more elements you add, the better for generating a better
          title and description.
        </Banner>

        {props.processingAspects ? (
          <View>
            <ActivityIndicator
              size='large'
              style={{ marginTop: '20%', marginBottom: '20%' }}
            />
          </View>
        ) : (
          <ScrollView style={{ height: '55%' }}>
            {props.aspects.map((item) => {
              return (
                <View key={item.localizedAspectName}>
                  <Pressable
                    //onPress={() => props.onSelectedCategory(item.categoryId)}
                    onPress={() => onClickItem(item)}
                  >
                    <Card>
                      <Card.Content>
                        <View
                          style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                          }}
                        >
                          <Title style={{ fontSize: 15 }}>
                            {item.localizedAspectName}
                          </Title>
                          {item.value === '' ? (
                            <Paragraph>
                              {item.require ? (
                                <Chip textStyle={{ fontSize: 10 }}>
                                  Required
                                </Chip>
                              ) : (
                                <Chip
                                  textStyle={{ fontSize: 10 }}
                                  style={{
                                    backgroundColor: 'lightgray',
                                  }}
                                >
                                  Recommended
                                </Chip>
                              )}
                            </Paragraph>
                          ) : (
                            <Text>
                              <IconButton
                                icon='check-outline'
                                iconColor={'green'}
                                size={15}
                              />
                            </Text>
                          )}
                        </View>

                        {item.value === '' ? (
                          <Paragraph style={{ color: 'gray' }}>
                            Add Value
                          </Paragraph>
                        ) : (
                          <Paragraph style={{ fontWeight: 'bold' }}>
                            {Array.isArray(item.value)
                              ? item.value.join(' | ')
                              : item.value}
                          </Paragraph>
                        )}
                      </Card.Content>
                    </Card>
                  </Pressable>
                </View>
              );
            })}
          </ScrollView>
        )}

        <SegmentedButtons
          style={props.styles.nextBackControl}
          onValueChange={() => console.log('Change value')}
          buttons={[
            {
              value: 'firststep',
              //label: 'First Step',
              icon: 'page-first',
              style: props.styles.nextBackControlButton,
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
              style: props.styles.nextBackControlButton,
              onPress: () => props.backward(),
            },
            {
              value: 'next',
              //label: 'Next',
              icon: 'arrow-right',
              style: props.styles.nextBackControlButton,
              disabled: !props.checkedAllAspects,
              onPress: () => {
                props.forward();
                props.getCategoriesFeatures(props.category);
              },
            },
          ]}
        />
        {
          (props.photoLabel || props.photoLabelExtra) &&
          (props.type === 'clothing' || props.type === 'shoes') ? (
            <Button
              style={{ marginTop: 15 }}
              icon='tag-outline'
              onPress={() => props.processLabel()}
              disabled={props.processingSelectedAspectValue}
            >
              Get information from Tag Photo
            </Button>
          ) : (
            ''
          )
          
        }
      </View>
    </View>
  );
}
