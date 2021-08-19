import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React from 'react';
import {Home, Invites, Profile} from 'screens';

import HomeIcon from 'assets/svg/home_icon.svg';
import HomeIconSelected from 'assets/svg/home_icon_selected.svg';
import InvitesIcon from 'assets/svg/invites_icon.svg';
import InvitesIconSelected from 'assets/svg/invites_icon_selected.svg';
import WeightIcon from 'assets/svg/weight_icon.svg';
import WeightIconSelected from 'assets/svg/weight_icon_selected.svg';
import ProfileIcon from 'assets/svg/profile_icon.svg';
import ProfileIconSelected from 'assets/svg/profile_icon_selected.svg';
import {Text} from 'components';

const Tab = createBottomTabNavigator();

const CommonNavigator = () => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      tabBarOptions={{
        activeTintColor: '#090A09',
        inactiveTintColor: '#A3A3A3',
        style: {
          borderTopColor: 'transparent',
          height: 70,
        },
        tabStyle: {
          paddingTop: 5,
          paddingBottom: 5,
        },
      }}>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          unmountOnBlur: true,
          tabBarLabel: ({color}) => (
            <Text title="Home" size={12} weight={500} color={color} />
          ),
          tabBarIcon: ({focused}) =>
            focused ? <HomeIconSelected /> : <HomeIcon />,
        }}
      />
      <Tab.Screen
        name="Training"
        component={Home}
        options={{
          unmountOnBlur: true,
          tabBarLabel: ({color}) => (
            <Text title="Treino" size={12} weight={500} color={color} />
          ),
          tabBarIcon: ({focused}) =>
            focused ? <WeightIconSelected /> : <WeightIcon />,
        }}
      />
      <Tab.Screen
        name="Invites"
        component={Invites}
        options={{
          unmountOnBlur: true,
          tabBarLabel: ({color}) => (
            <Text title="Convites" size={12} weight={500} color={color} />
          ),
          tabBarIcon: ({focused}) =>
            focused ? <InvitesIconSelected /> : <InvitesIcon />,
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          unmountOnBlur: true,
          tabBarLabel: ({color}) => (
            <Text title="Perfil" size={12} weight={500} color={color} />
          ),
          tabBarIcon: ({focused}) =>
            focused ? <ProfileIconSelected /> : <ProfileIcon />,
        }}
      />
    </Tab.Navigator>
  );
};

export default CommonNavigator;
