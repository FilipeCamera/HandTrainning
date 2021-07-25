/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, {useEffect} from 'react';
import {SafeAreaView, StatusBar} from 'react-native';
import {Provider} from 'react-redux';
import {NavigationContainer} from '@react-navigation/native';
import {PublicRoutes} from './src/routes';
import {PersistGate} from 'redux-persist/lib/integration/react';
import store, {persist} from 'store';
import {onPermission} from 'functions';
import FlashMessage from 'react-native-flash-message';

const App = () => {
  useEffect(() => {
    onPermission();
  }, []);
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persist}>
        <SafeAreaView style={{flex: 1}}>
          <StatusBar
            translucent={true}
            barStyle="dark-content"
            backgroundColor="rgba(0,0,0, 0)"
          />
          <FlashMessage
            position="top"
            duration={5000}
            textStyle={{fontFamily: 'Poppins-Medium', fontSize: 15}}
          />
          <NavigationContainer>
            <PublicRoutes />
          </NavigationContainer>
        </SafeAreaView>
      </PersistGate>
    </Provider>
  );
};

export default App;
