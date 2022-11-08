import React, {useState, useEffect, useRef} from 'react';
import { useTheme, Text, Card, Surface, Button, Searchbar, SegmentedButtons, Banner } from 'react-native-paper';
import { Pressable } from 'react-native';
import Svg, { Circle, Rect } from 'react-native-svg';
import { StyleSheet, View, Image, Platform, SafeAreaView } from 'react-native';
//import * as ImagePicker from 'expo-image-picker';
import { Camera } from 'expo-camera';
import { useNavigation, useRoute } from '@react-navigation/native';

import Header from './Header';

export default function AddListingForm(props) {

  let cameraRef = useRef();
  const [hasCameraPermission, setHasCameraPermission] = useState();
  const [searchCategories, setSearchCategories] = useState('');
  const [hasMediaLibraryPermission, setHasMediaLibraryPermission] = useState();
  const [photos, setPhotos] = useState(['','','','','','','','']);
  const [photoMain, setPhotoMain] = useState();
  const [photoLabel, setPhotoLabel] = useState();
  
  const [openCamera, setOpenCamera] = useState(false);
  const [mainPhotoOpen, setMainPhotoOpen] = useState(false);
  const [labelPhotoOpen, setLabelPhotoOpen] = useState(false);
  const [listPhotoOpen, setListPhotoOpen] = useState(0);
  
  

  const [step, setStep] = useState(0);

  const navigation = useNavigation();
  const route = useRoute();
  const { title, type } = route.params;
    

    useEffect(() => {
      (async () => {
        const cameraPermission = await Camera.requestCameraPermissionsAsync();
        setHasCameraPermission(cameraPermission.status === "granted");       
      })();
      }, []);

      if (hasCameraPermission === undefined) {
        return <Text>Requesting permissions...</Text>
      } else if (!hasCameraPermission) {
        return <Text>Permission for camera not granted. Please change this in settings.</Text>
      }

      let forward = async () => {
        setStep((old)=>old+1);
      }

      let backward = async () => {
        setStep((old)=>old-1);
      }

      let takePicMain = async () => {
        let options = {
          quality: 1,
          base64: true,
          exif: false
        };

        let newPhoto = await cameraRef.current.takePictureAsync(options);
        setPhotoMain(newPhoto);
        setMainPhotoOpen(false);
        setOpenCamera(false);
      };

      const takePicList = async (n) => {
        let options = {
          quality: 1,
          base64: true,
          exif: false
        };

        let newPhoto = await cameraRef.current.takePictureAsync(options);
        setPhotos(old => old[n] = newPhoto);
        setListPhotoOpen(0);
        setOpenCamera(false);
      }

      const onListPhotoOpen = async (n) => {
        setListPhotoOpen(n);
        setOpenCamera(true);
      }

      const deletePicList = async (n) => {
        setPhotos(old => old[n] = undefined);
        setListPhotoOpen(0);
        setOpenCamera(false);
      }

      const closePicList = async (n) => {
        setListPhotoOpen(0);
        setOpenCamera(false);
      }

      const takePicLabel = async () => {
        let options = {
          quality: 1,
          base64: true,
          exif: false
        };

        let newPhoto = await cameraRef.current.takePictureAsync(options);
        setPhotoLabel(newPhoto);
        setLabelPhotoOpen(false);
        setOpenCamera(false);
      };

      const closePic = async () => {
        setLabelPhotoOpen(false);
        setMainPhotoOpen(false);
        setOpenCamera(false);
      }

      const deleteMainPic = async () => {
        setLabelPhotoOpen(false);
        setMainPhotoOpen(false);
        setOpenCamera(false);
        setPhotoMain(undefined);
      }

      

      const deleteLabelPic = async () => {
        setLabelPhotoOpen(false);
        setMainPhotoOpen(false);
        setOpenCamera(false);
        setPhotoLabel(undefined)
      }

      const onOpenCamera = async () => {
        setOpenCamera((old)=>!old);
      }

      const onMainPhotoOpen = async () => {
        setMainPhotoOpen(true);
        setOpenCamera(true);
      }

      const onLabelPhotoOpen = async () => {
        setLabelPhotoOpen(true);
        setOpenCamera(true);
      }



      const onSearchCategories = async (query) => {
        setSearchCategories(query)
      }

      /*if (photo) {
        let sharePic = () => {
          shareAsync(photo.uri).then(() => {
            setPhoto(undefined);
          });
        };
    
        let savePhoto = () => {
          
          MediaLibrary.saveToLibraryAsync(photo.uri).then(() => {
            setPhoto(undefined);
          });
        };
    
        return (
          <SafeAreaView style={styles.container}>
            <Header title={route.params.title} type='createListing' actionBack={navigation.goBack} />       
            <Image style={styles.preview} source={{ uri: "data:image/jpg;base64," + photo.base64 }} />
            <Button title="Share" onPress={sharePic} />
            {hasMediaLibraryPermission ? <Button title="Save" onPress={savePhoto} /> : undefined}
            <Button title="Discard" onPress={() => setPhoto(undefined)} />
          </SafeAreaView>
        );
      }*/

      if (step === 0){

        return (
        
        <View>
          <Header title={title} type='createListing' actionBack={navigation.goBack} />
          <View>
            
          <Banner
      visible={true}
      
      icon={'head-lightbulb-outline'}
      >

I'd like to know a little bit about the item you want to create. Tell me something about it. What is it?
    </Banner>


          <Searchbar
              placeholder='About this item'
              onChangeText={onSearchCategories}
              value={searchCategories}
            />
        

          <SegmentedButtons              
              style={styles.nextBackControl}
              onValueChange={()=>console.log('Change value')}
              buttons={[
                {
                  value: 'back',
                  label: 'Back',
                  icon: 'arrow-left',
                  onPress: ()=>backward(),
                  disabled: 'true'
                },
                {
                  value: 'next',
                  label: 'Next',
                  icon: 'arrow-right',
                  onPress: ()=>forward(),
                  disabled: searchCategories.length > 0 ? false : true,
                },
                ]}                
              />
              </View>
          
          
          </View>
        )
      }

    if (step === 1){

      if (!openCamera){
      return (
        <View>
          <Header title={title} type='createListing' actionBack={navigation.goBack} />

          { type === 'clothing' || type === 'shoes' ? 
          <View>
            <Banner
      visible={true}
      
      icon={'camera'}
      >

Now I need some good photos. I would need the main photo and a photo of the product label. It would be nice if product label has the brand name. Additionally you can add up to 10 more photos.
    </Banner>
            
            <View style={styles.clothingButtons}>
              
              <Pressable onPress={()=>onMainPhotoOpen()}>
                <Surface style={styles.surface} elevation={4} >
                  
                  
                  {photoMain ? <Image style={styles.preview} source={{ uri: "data:image/jpg;base64," + photoMain.base64 }} /> : <Text>Main Photo</Text>}
                
                
                
                </Surface>
              </Pressable >
              <Pressable onPress={()=>onLabelPhotoOpen()}>
                <Surface style={styles.surface} elevation={4} >
                {photoLabel ? <Image style={styles.preview} source={{ uri: "data:image/jpg;base64," + photoLabel.base64 }} />
                
                
                
                
                
                : <Text>Photo Label</Text>}
                </Surface>
              </Pressable>

              
              
            </View>

            <View style={styles.clothingButtons}>
              {<Pressable onPress={()=>onListPhotoOpen(1)}>
                <Surface style={styles.surfaceSmall} elevation={4} >
                  
                  <Text>Photo</Text>
                  {/*photos[0] !== '' ? <Image style={styles.preview} source={{ uri: "data:image/jpg;base64," + photos[0].base64 }} /> : <Text>Main Photo</Text>*/}
                
                </Surface>
              </Pressable >}

              {<Pressable onPress={()=>onListPhotoOpen(2)}>
                <Surface style={styles.surfaceSmall} elevation={4} >
                  
                  <Text>Photo</Text>
                  {/*photos[1] ? <Image style={styles.preview} source={{ uri: "data:image/jpg;base64," + photos[1].base64 }} /> : <Text>Main Photo</Text>*/}
                
                </Surface>
              </Pressable >}

              {<Pressable onPress={()=>onListPhotoOpen(3)}>
                <Surface style={styles.surfaceSmall} elevation={4} >
                  
                  <Text>Photo</Text>
                  {/*photos[2] ? <Image style={styles.preview} source={{ uri: "data:image/jpg;base64," + photos[2].base64 }} /> : <Text>Main Photo</Text>*/}
                
                </Surface>
              </Pressable >}

              {<Pressable onPress={()=>onListPhotoOpen(4)}>
                <Surface style={styles.surfaceSmall} elevation={4} >
                  
                  <Text>Photo</Text>
                  {/*photos[3] ? <Image style={styles.preview} source={{ uri: "data:image/jpg;base64," + photos[3].base64 }} /> : <Text>Main Photo</Text>*/}
                
                </Surface>
              </Pressable >}

              {<Pressable onPress={()=>onListPhotoOpen(5)}>
                <Surface style={styles.surfaceSmall} elevation={4} >
                  
                  <Text>Photo</Text>
                  {/*photos[4] ? <Image style={styles.preview} source={{ uri: "data:image/jpg;base64," + photos[4].base64 }} /> : <Text>Main Photo</Text>*/}
                
                </Surface>
              </Pressable >}

              {<Pressable onPress={()=>onListPhotoOpen(6)}>
                <Surface style={styles.surfaceSmall} elevation={4} >
                  
                  <Text>Photo</Text>
                  {/*photos[5] ? <Image style={styles.preview} source={{ uri: "data:image/jpg;base64," + photos[5].base64 }} /> : <Text>Main Photo</Text>*/}
                
                </Surface>
              </Pressable >}

              {<Pressable onPress={()=>onListPhotoOpen(7)}>
                <Surface style={styles.surfaceSmall} elevation={4} >
                  
                  <Text>Photo</Text>
                  {/*photos[6] ? <Image style={styles.preview} source={{ uri: "data:image/jpg;base64," + photos[6].base64 }} /> : <Text>Main Photo</Text>*/}
                
                </Surface>
              </Pressable >}

              {<Pressable onPress={()=>onListPhotoOpen(8)}>
                <Surface style={styles.surfaceSmall} elevation={4} >
                  
                  <Text>Photo</Text>
                  {/*photos[7] ? <Image style={styles.preview} source={{ uri: "data:image/jpg;base64," + photos[7].base64 }} /> : <Text>Main Photo</Text>*/}
                
                </Surface>
              </Pressable >}

              
              

             

              



            </View>

            </View>
            
          
          : ''}
        
        <SegmentedButtons
             
              style={styles.nextBackControl}
              onValueChange={()=>console.log('Change value')}
              buttons={[
                {
                  value: 'back',
                  label: 'Back',
                  icon: 'arrow-left',
                  onPress: ()=>backward(),
                  
                },
                {
                  value: 'next',
                  label: 'Next',
                  icon: 'arrow-right',
                  onPress: ()=>forward(),
                },
                ]}
               
              />
        
        
        </View>
      
      
      
      
      )} else {
        
        if (mainPhotoOpen) {

        return (
          
          <Camera style ={styles.container} ref={cameraRef}> 
          <Button onPress={takePicMain}>Take Pic</Button>  
          <Button onPress={closePic}>Close</Button>
          <Button onPress={deleteMainPic}>Delete</Button>              
        </Camera>
        
        );  
       } else if (labelPhotoOpen) {
        return (
          
        <Camera style ={styles.container} ref={cameraRef}> 
          <Button onPress={takePicLabel}>Take Pic</Button>
          <Button onPress={closePic}>Close</Button> 
          <Button onPress={deleteLabelPic}>Delete</Button>


                              
        </Camera>
        )
       } else if (listPhotoOpen > 0) {
        <Camera style ={styles.container} ref={cameraRef}> 
          <Button onPress={takePicList(listPhotoOpen - 1)}>Take Pic</Button>
          <Button onPress={closePicList(listPhotoOpen - 1)}>Close</Button> 
          <Button onPress={deletePicList(listPhotoOpen - 1)}>Delete</Button>
        </Camera>
       }
      }

    }
      /*} else {
        return (
          
          
          <Camera style={styles.container} ref={cameraRef}>
            <View style={styles.buttonContainer}>
              <Button title="Take Pic" onPress={takePic} />
            </View>            
        </Camera>
        );  
      }*/
    
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around',   
    
  },
  
  clothingButtons: {
    marginTop: 15,    
    flexDirection: 'row',
    flexWrap:'wrap',
    justifyContent: 'space-around',
  },
  surface: {    
    height: 105,
    width: 130,
    alignItems: 'center',
    justifyContent: 'center',
  },

  surfaceSmall: {    
    height: 70,
    width: 90,
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 10, 
    alignItems: 'center',
    justifyContent: 'center',
  },

  buttonContainer: {
    //backgroundColor: '#fff',
    //alignSelf: 'flex-end',
  },

  nextBackControl: {   
    justifyContent: 'center',
    marginTop: 25,
  },
  
  preview: {
    alignSelf: 'stretch',
    flex: 1
  }
});