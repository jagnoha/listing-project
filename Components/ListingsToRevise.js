import React, { useState, useEffect } from 'react';
import { useRecoilState } from 'recoil';
import selectedAtom from '../Store/atoms/selectedAtom';
import {
  useTheme,
  List,
  Text,
  Card,
  Searchbar,
  IconButton,
  Avatar,
  Chip,
  Badge,
  MD3Colors,
  Button,
} from 'react-native-paper';
import { StyleSheet, Image, FlatList } from 'react-native';

const DATA = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    image: 'https://picsum.photos/200',
    title: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
    price: 0,
    type: 'SHOES',
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    image: 'https://picsum.photos/200',
    title: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco',
    price: 0,
    type: 'SHOES',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    image: 'https://picsum.photos/200',
    title:
      'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum',
    price: 0,
    type: 'CLOTHING',
  },
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba1',
    image: 'https://picsum.photos/200',
    title: 'First Item',
    price: 0,
    type: 'SHOES',
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f632',
    image: 'https://picsum.photos/200',
    title: 'Second Item',
    price: 0,
    type: 'SHOES',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d723',
    image: 'https://picsum.photos/200',
    title: 'Third Item',
    price: 0,
    type: 'OTHER',
  },
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba4',
    image: 'https://picsum.photos/200',
    title: 'First Item',
    price: 0,
    type: 'AUTOPARTS',
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f635',
    image: 'https://picsum.photos/200',
    title: 'Second Item',
    price: 0,
    type: 'AUTOPARTS',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d726',
    image: 'https://picsum.photos/200',
    title: 'Third Item',
    price: 0,
    type: 'CLOTHING',
  },
];

const listingStructure = (props) => {
  return (
    <>
      <Text>Nike | Preowned</Text>
    </>
  );
};

export default function ListingsToRevise() {
  const theme = useTheme();
  const [searchQuery, setSearchQuery] = useState('');
  //const [selected, setSelected] = useState([]);

  const [selected, setSelected] = useRecoilState(selectedAtom);

  const onChangeSearch = (query) => setSearchQuery(query);

  const onSelectListing = (id) => {
    if (selected.find((item) => item === id)) {
      setSelected(selected.filter((item) => item !== id));
    } else {
      setSelected((oldSelected) => [...oldSelected, id]);
    }
  };

  const checkType = (type) => {
    if (type === 'CLOTHING') {
      return 'tshirt-crew';
    } else if (type === 'SHOES') {
      return 'shoe-formal';
    } else if (type === 'AUTOPARTS') {
      return 'car-side';
    }
    return 'tag';
  };

  /*useEffect(()=>{
    console.log('READY TO GO!!!')
  })*/

  //console.log('AQUI ESTOY!');
  //console.log(selectedDemo);

  const renderItem = ({ item }) => (
    <List.Item
      style={{ paddingLeft: 10 }}
      title={item.title}
      titleNumberOfLines={2}
      descriptionStyle={{ color: 'gray' }}
      description={'Nike | Preowned'}
      onPress={() => console.log('Pressed listing')}
      onLongPress={() => onSelectListing(item.id)}
      left={(props) =>
        selected.find((listing) => listing === item.id) ? (
          <IconButton
            icon='check-circle'
            size={30}
            iconColor={theme.colors.primary}
          />
        ) : (
          <List.Image variant='image' source={{ uri: item.image }} />
        )
      }
      right={() => (
        <>
          <List.Icon icon={checkType(item.type)} color={theme.colors.primary} />
          <Text style={{ fontSize: 11 }}>Nov 4</Text>
        </>
      )}
    />
  );

  return (
    <>
      {/*selected.length === 0 ? <Searchbar
        placeholder='Search'
        onChangeText={onChangeSearch}
        value={searchQuery}
        loading={false}
  />:''*/}
      <FlatList
        data={DATA}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        refreshing={false}
        onRefresh={() => console.log('Refreshing')}
      />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 25,
  },
  tinyImage: {
    width: 100,
    height: 100,
  },
  features: {
    color: 'gray',
    padding: 25,
  },
});
