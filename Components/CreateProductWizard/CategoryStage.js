import React from 'react';
import {View} from 'react-native';
import { useTheme, Text, Card, Surface, Button, Searchbar, SegmentedButtons, Banner } from 'react-native-paper';
import Header from '../Header';

export default function CategoryStage(props) {
    //const theme = useTheme();
  
    return (
        <View>
        <Header title={props.title} type='createListing' actionBack={props.navigation.goBack} />
        <View>
          
        <Banner
    visible={true}
    
    icon={'shape'}
    >

Choose the category that corresponds to your product.
  </Banner>


        
      

        <SegmentedButtons              
            style={props.styles.nextBackControl}
            onValueChange={()=>console.log('Change value')}
            buttons={[
              {
                value: 'back',
                label: 'Back',
                icon: 'arrow-left',
                onPress: ()=>props.backward(),
                //disabled: 'true'
              },
              {
                value: 'next',
                label: 'Next',
                icon: 'arrow-right',
                onPress: ()=>props.forward(),
              },
              ]}                
            />
            </View>
        
        
        </View>
    );
}