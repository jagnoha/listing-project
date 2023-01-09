import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Amplify, API, graphqlOperation } from 'aws-amplify';
import { useRecoilState } from 'recoil';
import selectedAtom from '../Store/atoms/selectedAtom';
import snackBarAtom from '../Store/atoms/snackBarAtom';
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
  Snackbar,
} from 'react-native-paper';

import { StyleSheet, Image, FlatList } from 'react-native';
import listingsAtom from '../Store/atoms/listingsAtom';

//import * as subscriptions from '../src/graphql/subscriptions';

import urlImagesAtom from '../Store/atoms/urlImagesAtom';

/*import awsmobile from '../src/aws-exports';

Amplify.configure(awsmobile);*/

const month = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];

const MAX_LISTINGS = 10;

export default function ListingsToRevise() {
  const navigation = useNavigation();
  const theme = useTheme();
  const [searchQuery, setSearchQuery] = useState('');

  const [selected, setSelected] = useRecoilState(selectedAtom);
  const [listings, setListings] = useRecoilState(listingsAtom);

  const [urlImages, setUrlImages] = useRecoilState(urlImagesAtom);

  const [snackBar, setSnackBar] = useRecoilState(snackBarAtom);

  //const onChangeSearch = (query) => setSearchQuery(query);

  const onSelectListing = (listing) => {
    if (selected.find((item) => item.id === listing.id)) {
      //if (selected.length < 3){
      setSelected(selected.filter((item) => item.id !== listing.id));
      //}
    } else {
      if (selected.length < MAX_LISTINGS) {
        setSelected((oldSelected) => [...oldSelected, listing]);
      } else {
        setSnackBar({
          visible: true,
          text: `Limit of ${MAX_LISTINGS}  listings per bulk`,
        });
      }
    }
  };

  const checkType = (type) => {
    if (type === 'CLOTHING') {
      return 'tshirt-crew';
    } else if (type === 'SHOES') {
      return 'shoe-formal';
    } else if (type === 'AUTOPARTS') {
      return 'car-side';
    } else if (type === 'BOOKS') {
      return 'book-open-variant';
    }
    return 'tag';
  };

  const onOpenListing = (id, type) => {
    navigation.navigate('EditListing', {
      listingId: id,
      type: type.toLowerCase(),
    });
  };

  /*useEffect(() => {
    //query the initial todolist and subscribe to data updates
    const subscription = API.graphql(
      graphqlOperation(subscriptions.onCreateListing)
    ).subscribe({
      next: ({ provider, value }) => {
        //console.log({ provider, value });
        console.log('CREATE LISTING:!!!! ');
        //console.log(value.data.onCreateListing);
        setListings((old) => [...old, value.data.onCreateListing]);
      },
      error: (error) => console.warn(error),
    });

    //unsubscribe to data updates when component is destroyed so that you don’t introduce a memory leak.
    return function cleanup() {
      subscription.unsubscribe();
    };
  }, []);*/

  const onChangeSearch = (query) => {
    setSearchQuery(query);
    setSelected([]);
  };

  const renderItem = ({ item }) => (
    <List.Item
      style={{ paddingLeft: 10 }}
      titleStyle={
        item.title ? { color: 'black' } : { fontSize: 12, color: 'gray' }
      }
      title={item.title ? item.title : 'Title is not ready yet...'}
      titleNumberOfLines={4}
      descriptionStyle={{ color: 'gray' }}
      description={item.conditionName}
      //onPress={() => navigation.navigate('AddListing')}
      onPress={() => onOpenListing(item.id, item.type)}
      onLongPress={() =>
        onSelectListing({ id: item.id, version: item._version })
      }
      delayLongPress={200}
      left={(props) =>
        selected.find((listing) => listing.id === item.id) ? (
          <IconButton
            icon='check-circle'
            size={30}
            iconColor={theme.colors.primary}
          />
        ) : (
          <List.Image
            variant='image'
            source={{ uri: urlImages + item.photoMain }}
          />
        )
      }
      right={() => (
        <>
          <List.Icon icon={checkType(item.type)} color={theme.colors.primary} />
          <Text style={{ fontSize: 11 }}>
            {' '}
            {month[new Date(item.createdAt).getMonth()]}{' '}
            {new Date(item.createdAt).getDate()}
          </Text>
        </>
      )}
    />
  );

  return (
    <><Text style={{paddingTop: 10, paddingLeft: 20, paddingRight: 20}}>List of products to revise.</Text>
    <Searchbar
      style={{ marginLeft: 25, marginRight: 25, marginBottom: 25, marginTop: 15 }}
        placeholder={'Search'}
        onChangeText={onChangeSearch}
        value={searchQuery}
        icon={'magnify'}
      />
      <FlatList
        data={listings
          .filter((item) => !item.isReadyToGo && item.isDraft)
          //.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
          .filter((itm) =>
            itm.title.toLowerCase().includes(searchQuery.toLowerCase())
          )}
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
