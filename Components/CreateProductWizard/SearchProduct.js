import React from 'react';
import {View} from 'react-native';
import { useTheme, Text, Card, Surface, Button, Searchbar, SegmentedButtons, Banner } from 'react-native-paper';
import Header from '../Header';

export default function SearchProduct(props) {
    //const theme = useTheme();
  
    return (
        <View>
        <Header title={props.title} type='createListing' actionBack={props.navigation.goBack} />
        <View>
          
        <Banner
    visible={true}
    
    icon={'head-lightbulb-outline'}
    >

I'd like to know a little bit about the item you want to create. Tell me something about it. What is it?
  </Banner>


        <Searchbar
            placeholder='About this item'
            onChangeText={props.onSearchCategories}
            value={props.searchCategories}
          />
      

        <SegmentedButtons              
            style={props.styles.nextBackControl}
            onValueChange={()=>console.log('Change value')}
            buttons={[
              {
                value: 'back',
                label: 'Back',
                icon: 'arrow-left',
                onPress: ()=>props.backward(),
                disabled: 'true'
              },
              {
                value: 'next',
                label: 'Next',
                icon: 'arrow-right',
                onPress: ()=>props.forward(),
                disabled: props.searchCategories.length > 0 ? false : true,
              },
              ]}                
            />
            </View>
        
        
        </View>
    );
}