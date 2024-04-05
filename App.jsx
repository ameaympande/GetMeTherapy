import React from 'react';
import { StatusBar } from 'react-native';
import { enableScreens } from 'react-native-screens';
import AppNavigator from './src/navigation/AppNavigator';

enableScreens();

const App = () => {
  return (
    <>
      <StatusBar backgroundColor="transparent" barStyle="light-content" />
      <AppNavigator />
    </>
  );
};

export default App;
