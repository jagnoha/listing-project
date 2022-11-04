import React from 'react';
import { Appbar, useTheme, Text, FAB } from 'react-native-paper';
import { StyleSheet, View, SafeAreaView } from 'react-native';
import ListingStatusTab from './ListingStatusTab';

export default function Listings() {
  const theme = useTheme();

  return (
    <SafeAreaView style={styles.container}>
      <ListingStatusTab />
      <FAB
        icon='plus'
        label='Add listing'
        style={styles.fab}
        onPress={() => console.log('Pressed')}
      />
    </SafeAreaView>
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
});
