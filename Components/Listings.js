import React, { useState } from 'react';
import { useTheme, FAB, Portal, Provider } from 'react-native-paper';
import { StyleSheet, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import ListingStatusTab from './ListingStatusTab';
import theme from '../Utils/theming';

export default function Listings() {
  const [state, setState] = React.useState({ open: false });

  const onStateChange = ({ open }) => setState({ open });

  const navigation = useNavigation();

  const { open } = state;

  return (
    <Provider theme={theme}>
      <SafeAreaView style={styles.container}>
        <ListingStatusTab />

        <Portal>
          <FAB.Group
            style={styles.fab}
            open={open}
            visible
            icon={open ? 'arrow-left' : 'plus'}
            actions={[
              {
                icon: 'tshirt-crew',
                label: 'Clothing',
                //onPress: () => console.log('Pressed clothing'),
                onPress: () => {
                  navigation.navigate('AddListing', {
                    title: 'Add Clothing',
                    type: 'clothing',
                  });
                },
              },
              {
                icon: 'shoe-formal',
                label: 'Shoes',
                onPress: () => {
                  navigation.navigate('AddListing', {
                    title: 'Add Shoes',
                    type: 'shoes',
                  });
                },
              },
              {
                icon: 'car-side',
                label: 'Auto & Motorcycle Parts',
                onPress: () => { navigation.navigate('AddListing', {title: 'Add Auto Parts', type:'autoparts'}) }
              },
              /*{
                icon: 'book-open-variant',
                label: 'Books',
                onPress: () => { navigation.navigate('AddListing', {title: 'Add Books', type:'books'}) }
              },*/
              {
                icon: 'tag-multiple',
                label: 'Everything else',
                onPress: () => { navigation.navigate('AddListing', {title: 'Add Listing', type:'other'}) }
              },
            ]}
            onStateChange={onStateChange}
            onPress={() => {
              if (open) {
                // do something if the speed dial is open
              }
            }}
          />
        </Portal>
      </SafeAreaView>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
  },
  fab: {
    position: 'absolute',
    //margin: 16,
    //right: 15,
    //bottom: 100,
  },
});
