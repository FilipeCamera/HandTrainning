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

import {PersistGate} from 'redux-persist/lib/integration/react';
import store, {persist} from 'store';
import {onPermission, userPersist} from 'functions';
import Routes from 'routes';
import FlashMessage from 'react-native-flash-message';
import {useGetUser} from 'hooks';
import SplashScreen from 'react-native-splash-screen';

const App = () => {
  const {getUserLogged, getUser} = useGetUser();
  useEffect(() => {
    onPermission();
    getUserLogged({
      onComplete: user => {
        if (user) {
          saveUser(user);
        } else {
          SplashScreen.hide();
        }
      },
    });
  }, []);

  const saveUser = (user: any) => {
    getUser({
      uid: user.uid,
      onComplete: user => {
        if (user) {
          userPersist(user);
          SplashScreen.hide();
        }
      },
      onFail: error => {
        console.log(error);
        SplashScreen.hide();
      },
    });
  };
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persist}>
        <SafeAreaView style={{flex: 1}}>
          <StatusBar
            translucent={true}
            barStyle="dark-content"
            backgroundColor="rgba(0,0,0, 0)"
          />
          <NavigationContainer>
            <Routes />
          </NavigationContainer>
        </SafeAreaView>
        <FlashMessage
          statusBarHeight={30}
          position="top"
          duration={5000}
          titleStyle={{fontFamily: 'Poppins-Medium', fontSize: 15}}
          textStyle={{fontFamily: 'Poppins-Medium', fontSize: 15}}
        />
      </PersistGate>
    </Provider>
  );
};

export default App;
