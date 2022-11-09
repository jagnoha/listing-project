import React, {useState, useEffect, useRef} from 'react';
import { useTheme, Text, Card, Surface, Button, Searchbar, SegmentedButtons, Banner } from 'react-native-paper';
import { Pressable } from 'react-native';
import Svg, { Circle, Rect } from 'react-native-svg';
import { StyleSheet, View, Image, Platform, SafeAreaView } from 'react-native';
//import * as ImagePicker from 'expo-image-picker';
import { Camera } from 'expo-camera';
import { useNavigation, useRoute } from '@react-navigation/native';

import Header from './Header';
import SearchProduct from './CreateProductWizard/SearchProduct';
import PhotosSection from './CreateProductWizard/PhotosSection';

export default function AddListingForm(props) {

  let cameraRef = useRef();
  const [hasCameraPermission, setHasCameraPermission] = useState();
  const [searchCategories, setSearchCategories] = useState('');
  const [hasMediaLibraryPermission, setHasMediaLibraryPermission] = useState();
  const [photos, setPhotos] = useState([]);
  const [photoMain, setPhotoMain] = useState();
  const [photoLabel, setPhotoLabel] = useState();
  
  const [openCamera, setOpenCamera] = useState(false);
  const [mainPhotoOpen, setMainPhotoOpen] = useState(false);
  const [labelPhotoOpen, setLabelPhotoOpen] = useState(false);
  const [morePhotosOpen, setMorePhotosOpen] = useState(false);
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
          quality: 0.7,
          base64: true,
          skipProcessing: true,          
          exif: false,          
        };

        
        
        let newPhoto = await cameraRef.current.takePictureAsync(options);
        setPhotoMain(newPhoto);

        const source = newPhoto.uri;
        if (source) {
          await cameraRef.current.pausePreview();
          setOpenCamera(false);
          setMainPhotoOpen(false);
          console.log("picture source", source);          
        };
      };

      const onOpenPreviewPhoto = async = () => {
        console.log('ADD NEW PHOTO!!!!');
        setOpenCamera(true);
        setMorePhotosOpen(true);

      }

      const takeNewPic = async () => {
        let options = {
          quality: 0.7,
          base64: true,
          skipProcessing: true,          
          exif: false, 
        };

        let newPhoto = await cameraRef.current.takePictureAsync(options);
        setPhotos((old) => [...old, { id: newPhoto.uri, value: newPhoto }]);

        const source = newPhoto.uri;

        if (source) {
          await cameraRef.current.pausePreview();
          setMorePhotosOpen(false);
          setOpenCamera(false);
          console.log("picture source", source);          
        };

      }

      const takePicLabel = async () => {
        let options = {
          quality: 0.7,
          base64: true,
          skipProcessing: true,          
          exif: false, 
        };

        let newPhoto = await cameraRef.current.takePictureAsync(options);
        setPhotoLabel(newPhoto);

        const source = newPhoto.uri;

        if (source) {
          await cameraRef.current.pausePreview();
          setLabelPhotoOpen(false);
          setOpenCamera(false);
          console.log("picture source", source);          
        };

        
      };

      const closePic = async () => {
        setLabelPhotoOpen(false);
        setMainPhotoOpen(false);
        setMorePhotosOpen(false);
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

      

      if (step === 0){

        return (
          <SearchProduct title={title} navigation={navigation} onSearchCategories={onSearchCategories} searchCategories={searchCategories} styles={styles} backward = {backward} forward={forward} />
        
        
        )
      }

    if (step === 1){

      if (!openCamera){
      return (
        <View>
          <PhotosSection title={title} navigation={navigation} styles={styles} 
          onMainPhotoOpen = {onMainPhotoOpen} photoMain={photoMain} photoLabel={photoLabel} onLabelPhotoOpen ={onLabelPhotoOpen} photos={photos} backward = {backward} forward={forward} type={type} onOpenPreviewPhoto={onOpenPreviewPhoto}/>

          

        </View>
        
      
      
      
      
      )} else {
        
        if (mainPhotoOpen) {

        return (
          
          <Camera style ={styles.container} ref={cameraRef}> 
          

          <SegmentedButtons
             density='medium'
             style={styles.previewCameraControl}
             onValueChange={()=>console.log('Change value')}
             buttons={[
               {
                 value: 'close',
                 label: 'Close',
                 icon: 'close',
                 onPress: ()=>closePic(),
                 style: styles.buttonPreviewCameraControl,
               },
               {
                 value: 'next',
                 label: 'Take photo',
                 icon: 'camera',
                 onPress: ()=>takePicMain(),
                 style: styles.buttonPreviewCameraControl,
                 //disabled: photoMain && photoLabel ? false : true 
               },
               {  
                value: 'delete',
                label: 'Delete',
                icon: 'delete',
                onPress: ()=>deleteMainPic(),
                style: styles.buttonPreviewCameraControl,
                disabled: photoMain ? false : true 
              },
               ]}
              
             />


        </Camera>
        
        );  
       } else if (labelPhotoOpen) {
        return (
          
        <Camera style ={styles.container} ref={cameraRef}>           
            

            <SegmentedButtons
             density='medium'
             style={styles.previewCameraControl}
             onValueChange={()=>console.log('Change value')}
             buttons={[
               {
                 value: 'close',
                 label: 'Close',
                 icon: 'close',
                 onPress: ()=>closePic(),
                 style: styles.buttonPreviewCameraControl,
               },
               {
                 value: 'next',
                 label: 'Take photo',
                 icon: 'camera',
                 onPress: ()=>takePicLabel(),
                 style: styles.buttonPreviewCameraControl,
                 //disabled: photoMain && photoLabel ? false : true 
               },
               {
                value: 'delete',
                label: 'Delete',
                icon: 'delete',
                onPress: ()=>deleteLabelPic(),
                style: styles.buttonPreviewCameraControl,
                disabled: photoLabel ? false : true 
                //disabled: photoMain && photoLabel ? false : true 
              },
               ]}
              
             />


          
          
        </Camera>
        )
       } else if (morePhotosOpen){
        return (
        <Camera style ={styles.container} ref={cameraRef}>           
            

            <SegmentedButtons
             density='medium'
             style={styles.previewCameraControl}
             onValueChange={()=>console.log('Change value')}
             buttons={[
               {
                 value: 'close',
                 label: 'Close',
                 icon: 'close',
                 onPress: ()=>closePic(),
                 style: styles.buttonPreviewCameraControl,
               },
               {
                 value: 'next',
                 label: 'Take photo',
                 icon: 'camera',
                 onPress: ()=>takeNewPic(),
                 style: styles.buttonPreviewCameraControl,
                 //disabled: photoMain && photoLabel ? false : true 
               },
               /*{
                value: 'delete',
                label: 'Delete',
                icon: 'delete',
                onPress: ()=>deleteLabelPic(),
                style: styles.buttonPreviewCameraControl,
                disabled: photoLabel ? false : true 
                //disabled: photoMain && photoLabel ? false : true 
              },*/
               ]}
              
             />


          
          
        </Camera>)


       }
      }

    }
      
    
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //alignItems:'flex-end',
    justifyContent: 'flex-end',
    
    width: '100%',
    height: 300,
    marginTop: '40%',
    //marginBottom: '55%',  
    position: 'absolute',
    
    
    
  },
  
  clothingButtons: {
    marginTop: 15,    
    flexDirection: 'row',
    flexWrap:'wrap',
    justifyContent: 'space-around',
  },

  imageList: {
    //marginTop: 15,    
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

  buttonPreviewCameraControl: {
    backgroundColor: 'white',
    
        
  },

  previewCameraControl: {   
    justifyContent: 'center',
    padding: 10,
    
    
    //marginTop: 25,
  },
  
  preview: {
    alignSelf: 'stretch',
    flex: 1
  }
});