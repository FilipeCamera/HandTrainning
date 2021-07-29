import {Button, CardCommon, Carousel, Header} from 'components';
import {Logout} from 'functions';
import React from 'react';
import {View} from 'react-native';

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
      <Carousel />
      <CardCommon />
    </HomeStyle>
  );
};

export default HomeCommon;
