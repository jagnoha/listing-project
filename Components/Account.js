import React from 'react';
import { useTheme, Text } from 'react-native-paper';
import Header from './Header';

export default function Account() {
    const theme = useTheme();
  
    return (
     <>  
       <Header title='Account' />       
       <Text>Account</Text>
    </>
    );
}
