import React, { useEffect } from 'react';
import Home from './Components/Home';
import AddListingForm from './Components/AddListingForm';
import { useRecoilState } from 'recoil';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import fulfillmentPoliciesAtom from './Store/atoms/fulfillmentPoliciesAtom';
import paymentPoliciesAtom from './Store/atoms/paymentPoliciesAtom';
import returnPoliciesAtom from './Store/atoms/returnPoliciesAtom';
import usernameAtom from './Store/atoms/usernameAtom';

const Stack = createNativeStackNavigator();

export default function Main() {
  const [fulfillmentPolicies, setFulfillmentPolicies] = useRecoilState(
    fulfillmentPoliciesAtom
  );
  const [paymentPolicies, setPaymentPolicies] =
    useRecoilState(paymentPoliciesAtom);
  const [returnPolicies, setReturnPolicies] =
    useRecoilState(returnPoliciesAtom);

  const [username, setUsername] = useRecoilState(usernameAtom);

  useEffect(() => {
    (async () => {
      const responseFulfillment = await fetch(
        `https://listerfast.com/api/ebay/policies/fulfillment/${username}/0`
      );

      const responsePayment = await fetch(
        `https://listerfast.com/api/ebay/policies/payment/${username}/0`
      );

      const responseReturn = await fetch(
        `https://listerfast.com/api/ebay/policies/return/${username}/0`
      );

      const jsonFulfillment = await responseFulfillment.json();
      const jsonPayment = await responsePayment.json();
      const jsonReturn = await responseReturn.json();

      setFulfillmentPolicies(jsonFulfillment);
      setPaymentPolicies(jsonPayment);
      setReturnPolicies(jsonReturn);
    })();
  }, []);

  return (
    <>
      {/*<Home />*/}
      {
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName='Home'
            screenOptions={{
              headerShown: false,
            }}
          >
            <Stack.Screen name='Home' component={Home} />
            <Stack.Screen name='AddListing' component={AddListingForm} />
          </Stack.Navigator>
        </NavigationContainer>
      }
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
