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

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{headerShown: false}}>
          <Stack.Screen name="Onboarding1" component={onBoarding1} />
          <Stack.Screen name="Onboarding2" component={OnBoarding2} />
          <Stack.Screen name="Onboarding3" component={OnBoarding3} />
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Signup" component={SignUp} />
          <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
          <Stack.Screen name="OTPchange" component={OTPchange} />
          <Stack.Screen name="ResetPassword" component={ResetPassword} />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
};

export default AppNavigator;
