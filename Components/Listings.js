import React, { useState } from 'react';
import { useTheme, FAB, Portal, Provider } from 'react-native-paper';
import { StyleSheet, SafeAreaView } from 'react-native';
import ListingStatusTab from './ListingStatusTab';
import theme from '../Utils/theming';

export default function Listings() {
  const [state, setState] = React.useState({ open: false });

  const onStateChange = ({ open }) => setState({ open });

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
                onPress: () => console.log('Pressed clothing'),
              },
              {
                icon: 'shoe-formal',
                label: 'Shoes',
                onPress: () => console.log('Pressed shoes'),
              },
              {
                icon: 'car-side',
                label: 'Auto & Motorcycle Parts',
                onPress: () => console.log('Pressed auto parts'),
              },
              {
                icon: 'tag-multiple',
                label: 'Everything else',
                onPress: () => console.log('Pressed notifications'),
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
