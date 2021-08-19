import {CardCommon, Carousel, Header} from 'components';

import React from 'react';

import {HomeStyle} from './styles';

const HomeCommon = () => {
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
