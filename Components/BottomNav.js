import React, { useState } from 'react';
import { BottomNavigation, Text } from 'react-native-paper';
import Account from './Account';
import Listings from './Listings';
import Stats from './Stats';

const HomeRoute = () => <Listings />;

const StatsRoute = () => <Stats />;

const AccountRoute = () => <Account />; //<Text>Account</Text>;

export default function BottomNav() {
  const [index, setIndex] = useState(0);

  const [routes] = useState([
    {
      key: 'home',
      title: 'Listings',
      focusedIcon: 'format-list-text',
      unfocusedIcon: 'format-list-text',
    },
    {
        key: 'stats',
        title: 'Stats',
        focusedIcon: 'chart-box',
        unfocusedIcon: 'chart-box-outline',
    },
    {
      key: 'account',
      title: 'Account',
      focusedIcon: 'account',
      unfocusedIcon: 'account-outline',
    },
  ]);

  const renderScene = BottomNavigation.SceneMap({
    home: HomeRoute,
    stats: StatsRoute,
    account: AccountRoute, //AccountRoute,
  });

  return (
    <BottomNavigation
      navigationState={{ index, routes }}
      onIndexChange={setIndex}
      renderScene={renderScene}
    />
  );
}
