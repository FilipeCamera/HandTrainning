import Colors from '@styles';
import {firestore} from 'firebase';
import React, {useEffect} from 'react';
import {ActivityIndicator, View} from 'react-native';
import {useSelector} from 'react-redux';

const Loading = ({navigation}: any) => {
  const user = useSelector((state: any) => state.auth.user);

  useEffect(() => {
    function loadUser() {
      const res = firestore()
        .collection('users')
        .doc(user.uid)
        .get()
        .then(res => {
          const result = res.data();
          if (result.completeRegister === true) {
            navigation.navigate('Dashboard');
          } else {
            navigation.navigate('Onboarding');
          }
        })
        .catch(err => {});
    }

    loadUser();
  }, [navigation, user.uid]);
  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Colors.background,
      }}>
      <ActivityIndicator size="large" color={Colors.red} />
    </View>
  );
};

export default Loading;
