import React, { useState, useEffect } from 'react';
import { View, ScrollView, Pressable } from 'react-native';
import WheelPickerExpo from 'react-native-wheel-picker-expo';
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

//const CITIES = 'Jakarta,Bandung,Sumbawa,Taliwang,Lombok,Bima'.split(',');

export default function ItemSpecificsStage(props) {
  const [openWheel, setOpenWheel] = useState(false);
  const [selectedItem, setSelectedItem] = useState();
  const [multiSelected, setMultiSelected] = useState([]);
  const [wheelItems, setWheelItems] = useState([]);
  const [valueWheel, setValueWheel] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

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

  const onAddMultiItem = () => {
    if (wheelItems.length > 0) {
      if (!multiSelected.find((item) => item === valueWheel)) {
        setMultiSelected((old) => [...old, valueWheel]);
      }
    } else {
      setMultiSelected((old) => [...old, searchQuery]);
      //setSearchQuery('');
    }

    const wheelItemsList = props.aspects
      .find((itm) => itm.localizedAspectName === selectedItem.name)
      .aspectValues.map((name) => ({
        label: name,
        value: name.toUpperCase(),
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

  const onChangeSearch = (query) => {
    setSearchQuery(query);
    /*console.log(query);
    console.log(
      wheelItems.filter((itm) => itm.value.includes(query.toUpperCase()))
    );*/

    if (selectedItem.name !== 'Brand') {
      const wheelItemsList = props.aspects
        .find((itm) => itm.localizedAspectName === selectedItem.name)
        .aspectValues.map((name) => ({
          label: name,
          value: name.toUpperCase(),
        }));

      setWheelItems(
        wheelItemsList.filter((itm) => itm.value.includes(query.toUpperCase()))
      );
    }
  };

  const onClickItem = (item) => {
    onOpenWheel(item);
  };

  const onOpenWheel = (item) => {
    setSelectedItem({
      name: item.localizedAspectName,
      cardinality: item.cardinality,
      mode: item.mode,
    });

    if (Array.isArray(item.value)) {
      setMultiSelected(item.value);
    }

    if (item.localizedAspectName !== 'Brand') {
      const wheelItemsList = props.aspects
        .find((itm) => itm.localizedAspectName === item.localizedAspectName)
        .aspectValues.map((name) => ({
          label: name,
          value: name.toUpperCase(),
        }));

      //console.log(wheelItemsList);

      setWheelItems(wheelItemsList);

      if (wheelItemsList.length > 0) {
        setValueWheel(wheelItemsList[0].label);
      }
    } else {
      setWheelItems([]);
      setValueWheel('Brand');
      setSearchQuery('');
    }

    setOpenWheel(true);
  };

  const onCloseWheel = () => {
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
    setSelectedItem();
    setValueWheel('');
    setSearchQuery('');
    setMultiSelected([]);
    setOpenWheel(false);
    setWheelItems([]);
  };

  if (openWheel && selectedItem.cardinality === 'SINGLE') {
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
          Add {selectedItem.name}
        </Text>

        <Surface style={{ width: 300 }} elevation={4}>
          {selectedItem.mode !== 'SELECTION_ONLY' ? (
            <>
              {wheelItems.length > 0 ? (
                <Searchbar
                  placeholder={
                    wheelItems.length > 0 ? 'Search' : 'Edit information'
                  }
                  onChangeText={onChangeSearch}
                  value={
                    searchQuery
                    //getValueAspect() === '' ? searchQuery : getValueAspect()
                  }
                  icon={'magnify'}
                />
              ) : (
                <TextInput
                  placeholder='Edit information'
                  left={<TextInput.Icon icon='pencil' />}
                  onChangeText={onChangeInput}
                  value={
                    searchQuery
                    //getValueAspect() === '' ? searchQuery : getValueAspect()
                  }
                />
              )}
            </>
          ) : (
            ''
          )}

          {wheelItems.length > 0 ? (
            <WheelPickerExpo
              initialSelectedIndex={Math.ceil(wheelItems.length / 2) - 1}
              haptics={true}
              width={300}
              height={200}
              items={wheelItems}
              onChange={({ item }) => setValueWheel(item.label)}
            />
          ) : (
            ''
          )}
        </Surface>

        <View
          style={{
            paddingTop: 30,
            flexDirection: 'row',
          }}
        >
          <SegmentedButtons
            style={props.styles.nextBackControl}
            onValueChange={() => console.log('Change value')}
            buttons={[
              {
                value: 'close',
                label: 'Close',
                icon: 'close',
                onPress: () => onCloseWheel(),
              },
              {
                value: 'reset',
                label: 'Delete',
                icon: 'cancel',
                onPress: () => onResetWheel(),
              },

              {
                value: 'apply',
                label: 'Apply',
                icon: 'check',
                //disabled: searchQuery.length > 0 && wheelItems.length > 0 ? false : true,
                onPress: () => onApplyWheel(),
              },
            ]}
          />
        </View>
      </View>
    );
  }

  if (openWheel && selectedItem.cardinality === 'MULTI') {
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
          Add {selectedItem.name}
        </Text>

        <Surface style={{ width: 300 }} elevation={4}>
          {wheelItems.length > 0 ? (
            <Searchbar
              placeholder={
                wheelItems.length > 0 ? 'Search' : 'Edit information'
              }
              onChangeText={onChangeSearch}
              value={searchQuery}
              icon={'magnify'}
            />
          ) : (
            <TextInput
              placeholder='Edit information'
              left={<TextInput.Icon icon='pencil' />}
              onChangeText={onChangeInput}
              value={searchQuery}
            />
          )}

          {wheelItems.length > 0 ? (
            <WheelPickerExpo
              initialSelectedIndex={Math.ceil(wheelItems.length / 2) - 1}
              haptics={true}
              width={300}
              height={200}
              items={wheelItems}
              onChange={({ item }) => setValueWheel(item.label)}
            />
          ) : (
            ''
          )}
          <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
            {multiSelected.map((item) => {
              return (
                <View key={item}>
                  <Chip
                    style={{ margin: 5 }}
                    closeIcon='close'
                    compact={true}
                    mode='outlined'
                    //icon='information'
                    onClose={() => onCloseMultiItem(item)}
                  >
                    {item}
                  </Chip>
                </View>
              );
            })}
          </View>
        </Surface>

        <View
          style={{
            paddingTop: 30,
            flexDirection: 'row',
          }}
        >
          <SegmentedButtons
            style={props.styles.nextBackControl}
            onValueChange={() => console.log('Change value')}
            buttons={[
              {
                value: 'close',
                label: 'Close',
                icon: 'close',
                onPress: () => onCloseWheel(),
              },
              {
                value: 'reset',
                label: 'Delete',
                icon: 'cancel',
                onPress: () => onResetWheel(),
              },

              {
                value: 'Add',
                label: 'Add',
                icon: 'plus',
                disabled:
                  searchQuery.length > 0 || valueWheel.length > 0
                    ? false
                    : true,
                onPress: () => onAddMultiItem(),
              },
            ]}
          />
        </View>
        <Button
          style={{ marginTop: 15 }}
          mode='contained'
          onPress={() => onApplyMultiWheel()}
          disabled={multiSelected.length > 0 ? false : true}
        >
          Apply
        </Button>
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
              value: 'back',
              label: 'Back',
              icon: 'arrow-left',
              onPress: () => props.backward(),
            },
            {
              value: 'next',
              label: 'Next',
              icon: 'arrow-right',
              disabled: !props.checkedAllAspects,
              onPress: () => {
                props.forward();
                props.getCategoriesFeatures(props.category);
              },
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
