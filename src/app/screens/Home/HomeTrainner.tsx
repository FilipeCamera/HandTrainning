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
      <Header />
      <Carousel />
      <CardTrainner />
    </HomeStyle>
  );
};

export default HomeTrainner;
