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
import {useSelector} from 'react-redux';
import HomeCommon from './HomeCommon';
import HomeGym from './HomeGym';

const Home = ({navigation}: any) => {
  const user = useSelector((state: any) => state.auth.user);
  return (
    <>
      {user.type === 'gym' && <HomeGym navigation={navigation} />}
      {user.type === 'common' && <HomeCommon navigation={navigation} />}
    </>
  );
};

export default Home;
