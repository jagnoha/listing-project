import { StyleSheet, View } from 'react-native';
import { FAB } from 'react-native-paper';
import Header from './Header';
import BottomNav from './BottomNav';

export default function Home() {
  return (
    <View style={styles.container}>
      <Header title='ListerFast' />      
       <BottomNav />
       <FAB
            icon='plus'
            label='Add listing'
            style={styles.fab}
            onPress={() => console.log('Pressed')}
       />
    </View>
  );
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
    },
    fab: {
      position: 'absolute',
      margin: 16,
      right: 0,
      bottom: 100,
    },
  })

