import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React from 'react';
import {Home, Invites, Profile, Trainning} from 'screens';

import HomeIcon from 'assets/svg/home_icon.svg';
import HomeIconSelected from 'assets/svg/home_icon_selected.svg';
import ProfileIcon from 'assets/svg/profile_icon.svg';
import ProfileIconSelected from 'assets/svg/profile_icon_selected.svg';

import WeightIcon from 'assets/svg/weight_icon.svg';
import WeightIconSelected from 'assets/svg/weight_icon_selected.svg';
import InvitesIcon from 'assets/svg/invites_icon.svg';
import InvitesIconSelected from 'assets/svg/invites_icon_selected.svg';

import Colors from '@styles';

const {Navigator, Screen} = createBottomTabNavigator();

const DashCommon = () => {
  return (
    <Navigator
      initialRouteName="Home"
      screenOptions={{
        tabBarHideOnKeyboard: true,
        headerShown: false,
        tabBarStyle: {
          height: 60,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontFamily: 'Poppins-Medium',
        },
        tabBarActiveTintColor: Colors.textColorBlack,
        tabBarInactiveTintColor: Colors.gray,
      }}>
      <Screen
        name="Home"
        component={Home}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({focused}) =>
            focused ? <HomeIconSelected /> : <HomeIcon />,
        }}
      />

      <Screen
        name="Trainning"
        component={Trainning}
        options={{
          unmountOnBlur: true,
          tabBarLabel: 'Treino',
          tabBarIcon: ({focused}) =>
            focused ? <WeightIconSelected /> : <WeightIcon />,
        }}
      />
      <Screen
        name="Invites"
        component={Invites}
        options={{
          tabBarLabel: 'Convites',
          tabBarIcon: ({focused}) =>
            focused ? <InvitesIconSelected /> : <InvitesIcon />,
        }}
      />
      <Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarLabel: 'Perfil',
          tabBarIcon: ({focused}) =>
            focused ? <ProfileIconSelected /> : <ProfileIcon />,
        }}
      />
    </Navigator>
  );
};

export default DashCommon;
