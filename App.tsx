/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React from 'react';
import {SafeAreaView, StatusBar} from 'react-native';

import {NavigationContainer} from '@react-navigation/native';
import {PublicRoutes} from './src/routes';

const App = () => {
  return (
    <SafeAreaView style={{flex: 1}}>
      <StatusBar translucent={true} barStyle="default" />
      <NavigationContainer>
        <PublicRoutes />
      </NavigationContainer>
    </SafeAreaView>
  );
};

export default App;
