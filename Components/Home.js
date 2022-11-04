import React from 'react';
import { StyleSheet, View } from 'react-native';
import Header from './Header';
import BottomNav from './BottomNav';

export default function Home() {
  return (
    <View style={styles.container}>
      <Header title='ListerFast' />
      <BottomNav />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
