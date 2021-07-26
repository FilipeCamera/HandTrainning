import {Button, Header} from 'components';
import {Logout} from 'functions';
import React from 'react';
import {HomeStyle} from './styles';

const Home = ({navigation}: any) => {
  return (
    <HomeStyle>
      <Header />
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
    </HomeStyle>
  );
};

export default Home;
