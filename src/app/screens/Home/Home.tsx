import {
  BarChart,
  Button,
  CardStatus,
  CardTrainner,
  Header,
  Row,
  Scroll,
} from 'components';
import {Logout} from 'functions';
import React from 'react';
import {HomeStyle} from './styles';

const Home = ({navigation}: any) => {
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
      <BarChart />
      <Row>
        <CardTrainner />
        <CardStatus />
      </Row>
    </HomeStyle>
  );
};

export default Home;
