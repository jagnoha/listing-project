import React, {useState, useEffect, useRef} from 'react';
import { useTheme, Text } from 'react-native-paper';
import { StyleSheet, View, Image, Platform, Button, SafeAreaView } from 'react-native';
//import * as ImagePicker from 'expo-image-picker';
import { Camera } from 'expo-camera';
import { useNavigation, useRoute } from '@react-navigation/native';

import Header from './Header';

export default function AddListingForm(props) {

  let cameraRef = useRef();
  const [hasCameraPermission, setHasCameraPermission] = useState();
  const [hasMediaLibraryPermission, setHasMediaLibraryPermission] = useState();
  const [photo, setPhoto] = useState();
  const [openCamera, setOpenCamera] = useState(false);

  const navigation = useNavigation();
  const route = useRoute();
    

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

      let takePic = async () => {
        let options = {
          quality: 1,
          base64: true,
          exif: false
        };

        let newPhoto = await cameraRef.current.takePictureAsync(options);
        setPhoto(newPhoto);
      };

      const onOpenCamera = async () => {
        setOpenCamera((old)=>!old);
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

      if (!openCamera){
      return (
        <View>
          <Header title={route.params.title} type='createListing' actionBack={navigation.goBack} />

          <Button title='Take a Picture' onPress={()=>onOpenCamera()} />
        </View>
      )} else {
        return (
          
          <Camera style ={styles.container} ref={cameraRef}> 
          <Button title="Take Pic" onPress={takePic} />               
        </Camera>
        
        );  
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
    //alignItems: 'flex-start',
    
    justifyContent: 'space-around',   
    
  },
  /*container: {
    //position: 'absolute',
    flex: 1,
    //width: '100%',
    //height: 550,
    
  },*/
  buttonContainer: {
    backgroundColor: '#fff',
    //alignSelf: 'flex-end',
  },
  preview: {
    alignSelf: 'stretch',
    flex: 1
  }
});