import React from 'react';
import { useTheme, FAB } from 'react-native-paper';
import { StyleSheet, SafeAreaView } from 'react-native';
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
        onPress={() => console.log('Pressed FAB')}
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
