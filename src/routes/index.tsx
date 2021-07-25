import {createStackNavigator} from '@react-navigation/stack';

import React from 'react';
import {useSelector} from 'react-redux';
import PrivateRoutes from './PrivateRoutes';
import PublicRoutes from './PublicRoutes';

const {Navigator, Screen} = createStackNavigator();

const Routes = () => {
  const user = useSelector((state: any) => state.auth.user);
  return (
    <Navigator
      initialRouteName={user.uid !== undefined ? 'Private' : 'Public'}
      headerMode="none">
      <Screen name="Public" component={PublicRoutes} />
      <Screen name="Private" component={PrivateRoutes} />
    </Navigator>
  );
};

export default Routes;
