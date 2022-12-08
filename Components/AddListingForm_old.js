import React, {useState, useEffect} from 'react';
import { useTheme, Text } from 'react-native-paper';
import { StyleSheet, View, Image, Platform, Button } from 'react-native';
//import * as ImagePicker from 'expo-image-picker';
import { Camera } from 'expo-camera';
import { useNavigation, useRoute } from '@react-navigation/native';
import Header from './Header';

export default function AddListingForm(props) {
    const [hasCameraPermission, setHasCameraPermission] = useState();
    const [camera, setCamera] = useState();
    const [image, setImage] = useState();
    const [type, setType] = useState(Camera.Constants.Type.back);
    const theme = useTheme();
    const navigation = useNavigation();
    const route = useRoute();

    useEffect(() => {
        (async () => {
          const cameraStatus = await Camera.requestCameraPermissionsAsync();
          setHasCameraPermission(cameraStatus.status === 'granted');
    })();
      }, []);

    

      const takePicture = async () => {
        if(camera){
            const data = await Camera.takePictureAsync(null)
            setImage(data.uri);
        }
      }
     if (hasCameraPermission === false) {
        return <Text>No access to camera</Text>;
      }

    const pickImage = async () => {
        try{
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.All,
          allowsEditing: true,
          aspect: [4, 3],
          quality: 1,
        });
    
        //console.log(result);
    
        if (!result.cancelled) {
          setImage(result.uri);
        }
        }catch(error){
            console.log(error)
    }
      };
    
  
    return (
     
     
     <View>  
       <Header title={route.params.title} type='createListing' actionBack={navigation.goBack} />       
       <Button title="Pick an image from camera roll" onPress={pickImage} />
      {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
      <Camera 
            ref={ref => setCamera(ref)}
            //style={styles.fixedRatio} 
            type={type}
            ratio={'1:1'} />
            <Button title="Take Picture" onPress={() => takePicture()} />
     {image && <Image source={{uri: image}} style={{flex:1}}/>}
    </View>
    
    );
}