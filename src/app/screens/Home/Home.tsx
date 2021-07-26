import {Button} from 'components';
import {Logout} from 'functions';
import React from 'react';
import {View} from 'react-native';

const Home = ({navigation}: any) => {
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Button
        title="Sair"
        onPress={() =>
          Logout()
            .then(_ => navigation.navigate('Public'))
            .catch(error => console.log(error))
        }
        size={16}
        weight={500}
      />
    </View>
  );
};

export default Home;
