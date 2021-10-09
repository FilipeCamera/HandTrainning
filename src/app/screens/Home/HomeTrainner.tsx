import {CardTrainner, Carousel, Header} from 'components';
import {firestore} from 'firebase';
import React, {useEffect, useState} from 'react';

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
      <CardTrainner />
    </HomeStyle>
  );
};

export default HomeTrainner;
