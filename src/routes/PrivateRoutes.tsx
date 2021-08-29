import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {privateFeatures} from 'features';
import {useSelector} from 'react-redux';

const privateFeature = ['Dashboard', 'Onboarding'];

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

  return (
    <Navigator
      initialRouteName={
        user.completeRegister === true ? 'Dashboard' : 'Onboarding'
      }
      headerMode="none">
      {routes.map(({name, component}) => (
        <Screen key={name} name={name as any} component={component} />
      ))}
    </Navigator>
  );
};
