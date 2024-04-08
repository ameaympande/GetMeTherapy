import React, {useEffect, useState} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import onBoarding1 from '../screens/onboarding/OnBoarding1';
import OnBoarding2 from '../screens/onboarding/OnBoarding2';
import OnBoarding3 from '../screens/onboarding/OnBoarding3';
import Login from '../screens/Login';
import SignUp from '../screens/SignUp';
import ForgotPassword from '../screens/ForgotPassword';
import OTPchange from '../screens/OTPchange';
import ResetPassword from '../screens/ResetPassword';
import PostLogin from '../screens/PostLogin';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Stack = createStackNavigator();

const AppNavigator = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [initialRouteName, setInitialRouteName] = useState('Login');

  useEffect(() => {
    async function checkLaunchAndToken() {
      try {
        const appLaunched = await AsyncStorage.getItem('@appLaunched');
        if (appLaunched === null) {
          setInitialRouteName('Onboarding1');
          await AsyncStorage.setItem('@appLaunched', 'true');
        } else {
          setInitialRouteName('Login');
        }
      } catch (error) {
        console.error('Error checking app launch status:', error);
      } finally {
        setIsLoading(false);
      }
    }
    checkLaunchAndToken();
  }, []);

  if (isLoading) {
    return null;
  }
  return (
    <>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{headerShown: false}}
          // initialRouteName={initialRouteName}
          initialRouteName="Onboarding3">
          <Stack.Screen name="Onboarding1" component={onBoarding1} />
          <Stack.Screen name="Onboarding2" component={OnBoarding2} />
          <Stack.Screen name="Onboarding3" component={OnBoarding3} />
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Signup" component={SignUp} />
          <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
          <Stack.Screen name="OTPchange" component={OTPchange} />
          <Stack.Screen name="ResetPassword" component={ResetPassword} />
          <Stack.Screen name="PostLogin" component={PostLogin} />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
};

export default AppNavigator;
