import React from 'react';

import features from '../clients';

import {createStackNavigator} from '@react-navigation/stack';

const publicFeatures = ['Initial', 'Register', 'Login', 'Onboarding'];

const routes = Object.keys(features).map((feature: keyof FeatureGroup) => {
  if (publicFeatures.includes(feature) && !!features[feature].enabled) {
    return {
      name: feature,
      component: features[feature].component,
    };
  }
  return {name: '', component: features.Initial.component};
});

const {Navigator, Screen} = createStackNavigator<RootStackParamList>();

export default () => {
  return (
    <Navigator initialRouteName="Initial" headerMode="none">
      {routes.map(({name, component}) => (
        <Screen key={name} name={name as any} component={component} />
      ))}
    </Navigator>
  );
};
