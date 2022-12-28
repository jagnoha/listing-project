import React, {useState, useEffect} from 'react';
import { useTheme, Text, SegmentedButtons, Banner, Surface  } from 'react-native-paper';

import { useRecoilState } from 'recoil';
import {
    StyleSheet,
    View,
    Image,
    Platform,
    SafeAreaView,
    Dimensions,
  } from 'react-native';
import Header from './Header';

import listingsOnlineAtom from '../Store/atoms/listingsOnlineAtom';
//import listingsAtom from '../Store/atoms/listingsAtom';

export default function Stats() {
    const theme = useTheme();

    const [listingsOnline, setListingsOnline] = useRecoilState(listingsOnlineAtom);

    useEffect(() => {
        (async () => {
          console.log('Entro!');
        })();
      }, []);

    const now = new Date();

    const day = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 1, now.getHours(), now.getMinutes(), now.getSeconds()).toISOString();
    const week = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 7, now.getHours(), now.getMinutes(), now.getSeconds()).toISOString();
    const month = new Date(now.getFullYear(), now.getMonth() - 1, now.getDate(), now.getHours(), now.getMinutes(), now.getSeconds()).toISOString();


    console.log(now);
    console.log(now.toISOString());
    console.log(week);    
  
    return (
        <View>
            
        <Header title='Stats' />

        <View>
        <Banner visible={true} icon={'chart-box'}>
        Information of listings created in the last month.
        </Banner>
       
       <View style={{marginTop: 10, padding: 20}}>            

            <Surface style={styles.surfaceA} elevation={4}>
                <Text>Last 24 hours</Text>
                <Text style={{fontSize: 30, fontWeight: 'bold'}}>{listingsOnline.filter(item => item.createdAt >= day).length}</Text>
            </Surface>
            <Surface style={styles.surfaceB} elevation={4}>
                <Text>Last Week</Text>
                <Text style={{fontSize: 30, fontWeight: 'bold'}}>{listingsOnline.filter(item => item.createdAt >= week).length}</Text>
            </Surface>
            <Surface style={styles.surfaceC} elevation={4}>
            <Text>Last 30 days</Text>
            <Text style={{fontSize: 30, fontWeight: 'bold'}}>{listingsOnline.filter(item => item.createdAt >= month).length}</Text>
            </Surface>

        </View>
    </View>
       
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      //alignItems:'flex-end',
      justifyContent: 'flex-end',
  
      width: '100%',
      //height: Dimensions.get('window').height / 5,
      marginTop:
        (Dimensions.get('window').height - Dimensions.get('window').width) / 4,
      marginBottom:
        (Dimensions.get('window').height - Dimensions.get('window').width) / 3,
      //marginBottom: 100,
      //marginBottom: '55%',
      //position: 'absolute',
    },
  
    containerBarcode: {
      /*flex: 1,
      justifyContent: 'flex-end',
      //height: '50%',
      //marginTop: 100,
      //marginBottom: 200,
      width: '100%',
      //marginTop: 150,
      //marginBottom: 150,
      height: 250,
      //marginTop: '50%',
      position: 'absolute',*/
  
      height: '70%', //window.height / 2,
      width: '100%', //window.height,
      marginBottom: 20,
    },
  
    clothingButtons: {
      marginTop: 15,
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'space-around',
    },
  
    imageList: {
      //marginTop: 15,
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'space-around',
    },
  
    surface: {
      height: 100,
      //width: 103.5,
      alignItems: 'center',
      justifyContent: 'center',
      margin: 10,
      backgroundColor: 'red',
    },

    surfaceA: {
        height: 100,
        //width: 103.5,
        alignItems: 'center',
        justifyContent: 'center',
        margin: 10,
        backgroundColor: '#00BFFF',
      },

      surfaceB: {
        height: 100,
        //width: 103.5,
        alignItems: 'center',
        justifyContent: 'center',
        margin: 10,
        backgroundColor: '#00CED1',
      },

      surfaceC: {
        height: 100,
        //width: 103.5,
        alignItems: 'center',
        justifyContent: 'center',
        margin: 10,
        backgroundColor: '#ADD8E6',
      },
  
    surfaceSmall: {
      height: 70,
      width: 52.5,
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
      flex: 1,
    },
  });
  