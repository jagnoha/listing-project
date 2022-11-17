import React from 'react';
import {View, Pressable, StyleSheet, Image} from 'react-native';
import { useTheme, Text, Card, Surface, Button, Searchbar, SegmentedButtons, Banner } from 'react-native-paper';
import Header from '../Header';

export default function PhotosSection(props) {
    //const theme = useTheme();
  
    return (
        <View>
          <Header title={props.title} type='createListing' actionBack={props.navigation.goBack} />

          
          <View>
            <Banner
      visible={true}
      
      icon={'camera'}
      >

{ props.type === 'clothing' || props.type === 'shoes' ? 'Take some good photos. The main photo and a photo of the product label are required. It would be nice if the product label had the brand name on it. You can also add up to 8 more photos.' : 'Take some good photos. The main photo is required. You can also add up to 8 more photos.'}
    </Banner>
            
            <View style={props.styles.clothingButtons}>
              
              <Pressable onPress={()=>props.onMainPhotoOpen()}>
                <Surface style={props.styles.surface} elevation={4} >
                  
                  
                  {props.photoMain ? <Image style={props.styles.preview} source={{ uri: "data:image/jpg;base64," + props.photoMain.base64 }} /> : <Text>Main Photo</Text>}
                
                
                
                </Surface>
              </Pressable >
              { props.type === 'clothing' || props.type === 'shoes' ? 
              
              <Pressable onPress={()=>props.onLabelPhotoOpen()}>
                <Surface style={props.styles.surface} elevation={4} >
                {props.photoLabel ? <Image style={props.styles.preview} source={{ uri: "data:image/jpg;base64," + props.photoLabel.base64 }} />
                
                
                
                
                
                : <Text>Photo Label</Text>}
                </Surface>
              </Pressable>: ''}

              
              
            </View>

            <View style={{marginLeft: 60, marginRight: 60, marginTop: 20}}>
              <Button icon="camera" mode="contained" onPress={() => props.onOpenPreviewPhoto()} disabled={props.photoMain && props.photos.length < 8 ? false : true}>
                  Take more photos
            </Button>
            </View>

            <View style={props.styles.clothingButtons}>
          {
            props.photos.map((item) => {
              return (
                <View key={item.id} style={props.styles.imageList}>
              
              <Pressable  onPress={()=>props.onOpenEditPhoto(item.id)}>
                <Surface style={props.styles.surfaceSmall} elevation={4} >
                  
                  
                  <Image style={props.styles.preview} source={{ uri: "data:image/jpg;base64," + item.value.base64 }} /> 
                
                
                
                </Surface>
              </Pressable >
             

              
              
            </View>
              )
            })
          }
          </View>

            </View>
            
          
          
        
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
                  disabled: props.photoMain ? false : true 
                },
                ]}
               
              />
        
        
        
        
        
        </View>
    );
}