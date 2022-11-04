import React from 'react';
import { useTheme, Text } from 'react-native-paper';
import Header from './Header';

export default function Stats() {
    const theme = useTheme();
  
    return (
        <>
        <Header title='Stats' />
       <Text>Stats</Text>
        </>
    );
}