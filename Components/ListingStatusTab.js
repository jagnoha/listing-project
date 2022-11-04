import React, { useState } from 'react';
import { View, useWindowDimensions } from 'react-native';
import { TabView, SceneMap } from 'react-native-tab-view';
import { Appbar, useTheme, Text } from 'react-native-paper';
import ListingsToRevise from './ListingsToRevise';
import ListingsReadyToGo from './ListingsReadyToGo';

const ToReviseRoute = () => <ListingsToRevise />;

const ReadyToGoRoute = () => <ListingsReadyToGo />;

const renderScene = SceneMap({
  toRevise: ToReviseRoute,
  readyToGo: ReadyToGoRoute,
});

export default function ListingStatusTab() {
  const layout = useWindowDimensions();
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: 'toRevise', title: 'To Revise' },
    { key: 'readyToGo', title: 'Ready to Go' },
  ]);
  const theme = useTheme();

  return (
    <TabView
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={{ width: layout.width }}
      animationEnabled={false}
      swipeEnabled={false}
    />
  );
}
