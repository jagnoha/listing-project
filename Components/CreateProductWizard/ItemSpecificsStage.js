import React from 'react';
import {View} from 'react-native';
import WheelPickerExpo from 'react-native-wheel-picker-expo';
import { useTheme, Text, Card, Surface, Button, Searchbar, SegmentedButtons, Banner } from 'react-native-paper';
import Header from '../Header';

//const CITIES = 'Jakarta,Bandung,Sumbawa,Taliwang,Lombok,Bima'.split(',');


export default function ItemSpecificsStage(props) {
    //const theme = useTheme();

    /*console.log(props.aspects.filter(item => item.localizedAspectName === 'Size')[0].aspectValues);*/

    /*const size = props.aspects.filter(item => item.localizedAspectName === 'Size');*/

    console.log('***********************************');
    console.log(props.aspects.filter(item => item.localizedAspectName === 'Size')[0].aspectValues.map(name => ({
        label: name,
        value: name,
    })));
  
    return (
        <View>
        <Header title={props.title} type='createListing' actionBack={props.navigation.goBack} />
        <View>
          
        <Banner
    visible={true}
    
    icon={'head-lightbulb-outline'}
    >

        Specifics!


  </Banner>
<View style={{margin: 50}}>
  <WheelPickerExpo
  
  //haptics={true}
    
  width={125}
    //initialSelectedIndex={3}
    items={props.aspects.filter(item => item.localizedAspectName === 'Size')[0].aspectValues.map(name => ({
        label: name,
        value: name,
    }))}
        onChange={()=>console.log('Good')}
    />
</View>

  {/*<WheelPickerExpo
          height={300}
          width={250}
          initialSelectedIndex={3}
          //items={CITIES.map(name => ({ label: name, value: '' }))}
          items={props.aspects.filter(item => item.localizedAspectName === 'Size')[0].aspectValues.map(name => ({
            label: name,
            value: name,
          }))}
          //onChange={({ item }) => setCity(item.label)} 
          onChange={()=>console.log('Good')}
        />*/}


        
      

        <SegmentedButtons              
            style={props.styles.nextBackControl}
            onValueChange={()=>console.log('Change value')}
            buttons={[
              {
                value: 'back',
                label: 'Back',
                icon: 'arrow-left',
                onPress: ()=>props.backward(),
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