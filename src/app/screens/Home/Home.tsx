import {BarChart, Button, CardStatus, Header} from 'components';
import {Logout} from 'functions';
import React from 'react';
import {HomeStyle} from './styles';

const Home = ({navigation}: any) => {
  return (
    <HomeStyle>
      <Header />
      <BarChart />
      <CardStatus />
    </HomeStyle>
  );
};

export default Home;
