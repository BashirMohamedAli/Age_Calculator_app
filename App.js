import React, {useEffect, useState} from 'react';
import AppStack from './navigation/AppStack';
import SplashScreen from 'react-native-splash-screen';
import {Platform} from 'react-native';
const App = () => {
  useEffect(() => {
    if (Platform.OS === 'android') SplashScreen.hide();
  }, []);
  return <AppStack />;
};

export default App;
