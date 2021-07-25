import React, {useEffect} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {privateFeatures} from 'features';
import {useSelector} from 'react-redux';
import {useGetUser} from 'hooks';

const privateFeature = ['Home', 'Onboarding'];

const routes = Object.keys(privateFeatures).map(
  (feature: keyof PrivateFeatureGroup) => {
    if (
      privateFeature.includes(feature) &&
      !!privateFeatures[feature].enabled
    ) {
      return {
        name: feature,
        component: privateFeatures[feature].component,
      };
    }
    return {name: '', component: privateFeatures.Home.component};
  },
);

const {Navigator, Screen} = createStackNavigator<RootStackParamList>();

export default () => {
  const user = useSelector((state: any) => state.auth.user);
  const {getUser} = useGetUser();
  useEffect(() => {
    getUser(user.uid);
  }, []);
  return (
    <Navigator
      initialRouteName={user.completeRegister ? 'Home' : 'Onboarding'}
      headerMode="none">
      {routes.map(({name, component}) => (
        <Screen key={name} name={name as any} component={component} />
      ))}
    </Navigator>
  );
};
