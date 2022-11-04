import React, {useEffect} from 'react';
import { useTheme, Button, Divider } from 'react-native-paper';
import { StyleSheet } from 'react-native';

export default function ListingsReadyToGo() {
  const theme = useTheme();

  

  /*useEffect(()=>{
    console.log('READY TO GO!!!')
  })*/

  return (
    <>
      
      <Button
        icon='upload'
        mode='contained'
        onPress={() => console.log('Pressed')}
        style={styles.button}
      >
        Upload all to eBay
      </Button>
      <Divider />
      
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
  },
  button: {
    marginLeft: 60,
    marginRight: 60,
    marginTop: 10,
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 25,
  },
});
