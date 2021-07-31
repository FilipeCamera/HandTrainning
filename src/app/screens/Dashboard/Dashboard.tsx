import React from 'react';
import {useSelector} from 'react-redux';
import CommonNavigator from './CommonNavigator';
import GymNavigator from './GymNavigator';
import TrainnerNavigator from './TrainnerNavigator';

const Dashboard = () => {
  const user = useSelector((state: any) => state.auth.user);
  return (
    <>
      {user.type === 'gym' && <GymNavigator />}
      {user.type === 'common' && <CommonNavigator />}
      {user.type === 'trainner' && <TrainnerNavigator />}
    </>
  );
};

export default Dashboard;
