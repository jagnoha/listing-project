import React, { useState } from 'react';
import { Appbar, useTheme } from 'react-native-paper';
import { BottomNavigation, Text } from 'react-native-paper';
import Account from './Account';

const HomeRoute = () => <Text>Listings</Text>;

const AccountRoute = () => <Account />;//<Text>Account</Text>;

export default function BottomNav() {
    const [index, setIndex] = useState(0);

    const [routes] = useState([
        { key: 'home', title: 'Listings', focusedIcon: 'format-list-text', unfocusedIcon: 'format-list-text'},        
        { key: 'account', title: 'Account', focusedIcon: 'account', unfocusedIcon: 'account-outline' },
      ]);

      const renderScene = BottomNavigation.SceneMap({
        home: HomeRoute,
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