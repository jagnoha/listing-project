import React from 'react';
import { Appbar, useTheme } from 'react-native-paper';

export default function Header(props) {
    const theme = useTheme();
  
    return (
        <Appbar.Header style={{ backgroundColor: theme.colors.background }}>
            <Appbar.Content title={props.title} color={theme.colors.onBackground} titleStyle={{textAlign: 'center'}} />            
        </Appbar.Header>
    );
}

