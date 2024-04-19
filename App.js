import React from 'react';
import {StatusBar} from 'react-native';
import {enableScreens} from 'react-native-screens';
import AppNavigator from './src/navigation/AppNavigator';
import Toast from 'react-native-toast-message';

enableScreens();

const App = () => {
  return (
    <>
      <StatusBar backgroundColor="transparent" barStyle="light-content" />
      <AppNavigator />
      <Toast />
    </>
  );
};

export default App;
