import React from 'react';
import Home from './Components/Home';
import AddListingForm from './Components/AddListingForm';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

export default function Main() {
  return (
    <>
    {/*<Home />*/}
    {<NavigationContainer>
        <Stack.Navigator initialRouteName="Home" screenOptions={{
          headerShown: false,
        }}>
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="AddListing" component={AddListingForm} />
        </Stack.Navigator>
    </NavigationContainer>}
  </>
  );
}

/*const styles = StyleSheet.create({
    container: {
      //flex: 1,
      backgroundColor: '#fff',
      //alignItems: 'center',
      //justifyContent: 'center',
    },
    header: {
      backgroundColor: '#000',
    }
  });*/
