import React from 'react';
import {useSelector} from 'react-redux';

import DashGym from './DashGym';
import DashTrainner from './DashTrainner';
import DashCommon from './DashCommon';

const Dashboard = () => {
  const user = useSelector((state: any) => state.auth.user);
  return (
    <>
      {user.type === 'gym' && <DashGym />}
      {user.type === 'trainner' && <DashTrainner />}
      {user.type === 'common' && <DashCommon />}
    </>
  );
};

export default Dashboard;
