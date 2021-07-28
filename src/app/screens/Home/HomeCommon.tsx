import {Button, Header} from 'components';
import {Logout} from 'functions';
import React from 'react';

import {HomeStyle} from './styles';

const HomeCommon = ({navigation}: any) => {
  return (
    <HomeStyle
      contentContainerStyle={{
        flexGrow: 1,
        padding: 16,
        alignItems: 'center',
        width: '100%',
      }}
      showsVerticalScrollIndicator={false}>
      <Header />
      <Button
        title="Logout"
        size={15}
        weight={500}
        color="#090A0A"
        onPress={() => {
          Logout().then(_ => navigation.navigate('Public'));
        }}
      />
    </HomeStyle>
  );
};

export default HomeCommon;
