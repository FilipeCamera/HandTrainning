import {CardTrainner, Carousel, Header} from 'components';

import React from 'react';

import {HomeStyle} from './styles';

const HomeTrainner = ({navigation}: any) => {
  return (
    <HomeStyle
      contentContainerStyle={{
        flexGrow: 1,
        padding: 16,
        alignItems: 'center',
        width: '100%',
      }}
      showsVerticalScrollIndicator={false}>
      <Header navigation={navigation} />
      <Carousel />
      <CardTrainner navigation={navigation} />
    </HomeStyle>
  );
};

export default HomeTrainner;
