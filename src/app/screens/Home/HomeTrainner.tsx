import {CardTrainner, Carousel, Header, Modal} from 'components';
import {firestore} from 'firebase';
import {setGymId} from 'functions';
import React, {useEffect, useState} from 'react';
import {useSelector} from 'react-redux';

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
