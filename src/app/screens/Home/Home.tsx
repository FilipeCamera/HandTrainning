import React from 'react';
import {useSelector} from 'react-redux';
import HomeCommon from './HomeCommon';
import HomeGym from './HomeGym';
import HomeTrainner from './HomeTrainner';

const Home = ({navigation}: any) => {
  const user = useSelector((state: any) => state.auth.user);
  return (
    <>
      {user.type === 'gym' && <HomeGym navigation={navigation} />}
      {user.type === 'common' && <HomeCommon navigation={navigation} />}
      {user.type === 'trainner' && <HomeTrainner navigation={navigation} />}
    </>
  );
};

export default Home;
