import React, { useState } from 'react';
import {
  useTheme,
  List,
  Text,
  Searchbar,
  Chip,
  Badge,
} from 'react-native-paper';
import { StyleSheet, Image, FlatList } from 'react-native';

const DATA = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    image: 'https://picsum.photos/200',
    title: 'First Item',
    price: 0,
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    image: 'https://picsum.photos/200',
    title: 'Second Item',
    price: 0,
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    image: 'https://picsum.photos/200',
    title: 'Third Item',
    price: 0,
  },
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba1',
    image: 'https://picsum.photos/200',
    title: 'First Item',
    price: 0,
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f632',
    image: 'https://picsum.photos/200',
    title: 'Second Item',
    price: 0,
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d723',
    image: 'https://picsum.photos/200',
    title: 'Third Item',
    price: 0,
  },
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba4',
    image: 'https://picsum.photos/200',
    title: 'First Item',
    price: 0,
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f635',
    image: 'https://picsum.photos/200',
    title: 'Second Item',
    price: 0,
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d726',
    image: 'https://picsum.photos/200',
    title: 'Third Item',
    price: 0,
  },
];

export default function ListingsToRevise() {
  const theme = useTheme();
  const [searchQuery, setSearchQuery] = useState('');

  const onChangeSearch = (query) => setSearchQuery(query);
  const renderItem = ({ item }) => (
    <List.Item
      title={item.title}
      description={
        <>
          <Text>Nike</Text> | <Text>Preowned</Text> | <Text>4</Text>
        </>
      }
      onPress={() => console.log('Pressed')}
      //onLongPress={() => console.log('Pressed')}
      left={(props) => (
        <List.Image {...props} variant='image' source={{ uri: item.image }} />
      )}
      right={() => (
        <Chip
          icon='cash'
          mode='outlined'
          style={{ marginTop: 10, marginBottom: 10 }}
        >
          $45
        </Chip>
      )}
    />
  );

  return (
    <>
      {/*<Searchbar
        placeholder='Search'
        onChangeText={onChangeSearch}
        value={searchQuery}
  />*/}
      <FlatList
        data={DATA}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        refreshing={false}
        onRefresh={() => console.log('Refreshing')}
      />
      {/*<ScrollView contentContainerStyle={{ paddingHorizontal: 5 }}>
        <List.Item
          title='First Item'
          description='Item description'
          onPress={() => console.log('Pressed')}
          left={(props) => (
            <List.Image
              {...props}
              variant='image'
              source={{ uri: 'https://picsum.photos/200' }}
            />
          )}
        />
        
          </ScrollView>*/}
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
});
