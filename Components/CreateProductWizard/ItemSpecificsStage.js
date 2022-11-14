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
} from 'react-native-paper';
import Header from '../Header';

//const CITIES = 'Jakarta,Bandung,Sumbawa,Taliwang,Lombok,Bima'.split(',');

export default function ItemSpecificsStage(props) {
  const [openWheel, setOpenWheel] = useState(false);
  const [selectedItem, setSelectedItem] = useState('');
  const [wheelItems, setWheelItems] = useState([]);
  const [valueWheel, setValueWheel] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  //const [checkedAllRequired, setCheckedAllRequired] = useState(false);

  const onChangeSearch = (query) => {
    setSearchQuery(query);
    /*console.log(query);
    console.log(
      wheelItems.filter((itm) => itm.value.includes(query.toUpperCase()))
    );*/

    if (selectedItem !== 'Brand'){

    const wheelItemsList = props.aspects
      .find((itm) => itm.localizedAspectName === selectedItem)
      .aspectValues.map((name) => ({
        label: name,
        value: name.toUpperCase(),
      }));

    

        setWheelItems(
          wheelItemsList.filter((itm) => itm.value.includes(query.toUpperCase()))
        );

    }

    

    /*setWheelItems(
      wheelItems.filter((itm) => itm.value.includes(query.toUpperCase()))
    );*/
    /*setWheelItems((old) =>
      old.filter((itm) => itm.value.includes(query.toUpperCase().trim()))
    );*/
  };
  //const theme = useTheme();

  /*console.log(props.aspects.filter(item => item.localizedAspectName === 'Size')[0].aspectValues);*/

  /*const size = props.aspects.filter(item => item.localizedAspectName === 'Size');*/

  const onOpenWheel = (item) => {
    setSelectedItem(item);
    //console.log(props.aspects);


    if (item !== 'Brand'){

    const wheelItemsList = props.aspects
      .find((itm) => itm.localizedAspectName === item)
      .aspectValues.map((name) => ({
        label: name,
        value: name.toUpperCase(),
      }));

      console.log(wheelItemsList);

      setWheelItems(wheelItemsList);
      
      if (wheelItemsList.length > 0) {
        setValueWheel(wheelItemsList[0].label)
       
      }

    } else {
      setWheelItems([]);
      setValueWheel('Brand');
      setSearchQuery('Unbranded')
    }

    setOpenWheel(true);
  };

  {
    /*const isAllCheckRequired = () => {
    const aspectList = props.aspects.filter(
      (item) => item.require === true && item.value !== ''
    );

    return aspectList.length > 0 ? false : true;
  };*/
  }

  const onCloseWheel = () => {
    setSelectedItem('');
    setOpenWheel(false);
    setSearchQuery('');
    setWheelItems([]);
  };

  const onResetWheel = () => {
    props.changeValueItemAspect(selectedItem, '');
    setSelectedItem('');
    setOpenWheel(false);
    setSearchQuery('');
    setWheelItems([]);
  };

  const onApplyWheel = () => {
    //setSelectedItem('');

    const list = wheelItems.filter((itm) =>
      itm.value.includes(searchQuery.toUpperCase().trim())
    );

    console.log(list);

    console.log('VALUE WHEEL: ', valueWheel);
    props.changeValueItemAspect(
      selectedItem,
      list.length === 1
        ? list[0].label
        : wheelItems.length === 0
        ? searchQuery
        : valueWheel
    );
    setSelectedItem('');
    setValueWheel('');
    setSearchQuery('');
    setOpenWheel(false);
    setWheelItems([]);
  };

  //console.log('***********************************');

  /*console.log(props.aspects.filter(item => item.localizedAspectName === 'Size')[0].aspectValues.map(name => ({
        label: name,
        value: name,
    })));*/

  if (openWheel) {
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
          Add {selectedItem}
        </Text>

        <Surface style={{width: 300}} elevation={4}>
          <Searchbar
            placeholder={wheelItems.length > 0 ? 'Search' : 'Edit information'}
            onChangeText={onChangeSearch}
            value={searchQuery}
            icon={wheelItems.length > 0 ? 'magnify' : 'pencil'}
          />

          {wheelItems.length > 0 ? <WheelPickerExpo
            haptics={true}
            width={300}
            height={200}
            items={
              wheelItems
            }
            onChange={({ item }) => setValueWheel(item.label)}
          />: ''}
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
                label: 'Reset',
                icon: 'cancel',
                onPress: () => onResetWheel(),
              },

              {
                value: 'apply',
                label: 'Apply',
                icon: 'check',
                onPress: () => onApplyWheel(),
              },
            ]}
          />
        </View>
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
          It's time to add the item specifics. Some of them are required to
          continue to the next step.
        </Banner>

        {props.processingAspects ? (
          <View>
            <ActivityIndicator
              size='large'
              style={{ marginTop: '20%', marginBottom: '20%' }}
            />
          </View>
        ) : (
          <ScrollView style={{ height: '65%' }}>
            {props.aspects.map((item) => {
              return (
                <View key={item.localizedAspectName}>
                  <Pressable
                    //onPress={() => props.onSelectedCategory(item.categoryId)}
                    onPress={() => onOpenWheel(item.localizedAspectName)}
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
                            <IconButton
                              icon='check-outline'
                              iconColor={'green'}
                              size={20}
                            />
                          )}
                        </View>

                        {item.value === '' ? (
                          <Paragraph style={{ color: 'gray' }}>
                            Add Value
                          </Paragraph>
                        ) : (
                          <Paragraph style={{ fontWeight: 'bold' }}>
                            {item.value}
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

        {/*<WheelPickerExpo
  
  //haptics={true}
    
  width={125}
    //initialSelectedIndex={3}
    items={props.aspects.filter(item => item.localizedAspectName === 'Size')[0].aspectValues.map(name => ({
        label: name,
        value: name,
    }))}
        onChange={()=>console.log('Good')}
  />*/}

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
              onPress: () => props.forward(),
            },
          ]}
        />
      </View>
    </View>
  );
}
