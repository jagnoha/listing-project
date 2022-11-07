import React from 'react';
import { useTheme, Text, Button } from 'react-native-paper';
import { StyleSheet, View, Image, Platform } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import Header from './Header';

export default function AddListingForm(props) {
    const theme = useTheme();
    const navigation = useNavigation();
    const route = useRoute();
  
    return (
     <View>  
       <Header title={route.params.title} type='createListing' actionBack={navigation.goBack} />       
       <Text>Add Listing Form</Text>
       {/*<Button onPress={navigation.goBack}>Go Back</Button>*/}
    </View>
    );
}