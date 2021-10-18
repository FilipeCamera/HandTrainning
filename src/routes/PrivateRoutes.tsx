import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {privateFeatures} from 'features';

const privateFeature = ['Dashboard', 'Onboarding', 'Warnings', 'Loading'];

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
  return (
    <Navigator initialRouteName="Loading" screenOptions={{headerShown: false}}>
      {routes.map(({name, component}) => (
        <Screen key={name} name={name as any} component={component} />
      ))}
    </Navigator>
  );
};
