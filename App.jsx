import React from 'react';
import AppNavigator from './src/navigation/AppNavigator';
import { StatusBar, View } from 'react-native';


const App = () => {
  return (
    <>
      <StatusBar backgroundColor="transparent" barStyle="light-content" />
      <AppNavigator />

    </>
  );
};

export default App;
