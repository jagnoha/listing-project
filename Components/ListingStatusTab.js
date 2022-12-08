import React, { useState } from 'react';
import { useRecoilValue, useRecoilState } from 'recoil';
import selectedAtom from '../Store/atoms/selectedAtom';
import { useWindowDimensions } from 'react-native';
import { TabView, SceneMap } from 'react-native-tab-view';
import { useTheme } from 'react-native-paper';
import ListingsToRevise from './ListingsToRevise';
import ListingsReadyToGo from './ListingsReadyToGo';
import Header from './Header';

const ToReviseRoute = () => <ListingsToRevise />;

const ReadyToGoRoute = () => <ListingsReadyToGo />;

const renderScene = SceneMap({
  toRevise: ToReviseRoute,
  readyToGo: ReadyToGoRoute,
});

export default function ListingStatusTab() {
  const layout = useWindowDimensions();
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useRecoilState(selectedAtom);

  
  const [routes] = useState([
    { key: 'toRevise', title: 'To Revise'},
    { key: 'readyToGo', title: 'Ready to Go' },
  ]);
  const theme = useTheme();

  //const selected = useRecoilValue(selectedAtom);

  //console.log(selected);

  //console.log(index);

  

  return (
    <>
      {selected.length > 0 ? (
          index === 0 ? <Header type='selection' indexTab={index} /> : <Header type='selectionReadyToGo' indexTab={index} />
      ) : (
        <Header title='ListerFast' type='basic' indexTab={index} />
      )}
      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={() => {
          setIndex((old) => old === 0 ? 1 : 0);
          //console.log(index);
          setSelected([]);
        }}
        initialLayout={{ width: layout.width }}
        animationEnabled={false}
        swipeEnabled={false}       
      />
    </>
  );
}
