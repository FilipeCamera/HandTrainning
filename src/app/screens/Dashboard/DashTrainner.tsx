import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import React from 'react';

import {Home, Invites, Profile, Students} from 'screens';

import HomeIcon from 'assets/svg/home_icon.svg';
import HomeIconSelected from 'assets/svg/home_icon_selected.svg';
import ProfileIcon from 'assets/svg/profile_icon.svg';
import ProfileIconSelected from 'assets/svg/profile_icon_selected.svg';
import PeopleIcon from 'assets/svg/people.svg';
import PeopleIconSelected from 'assets/svg/peopleBlack.svg';
import InvitesIcon from 'assets/svg/invites_icon.svg';
import InvitesIconSelected from 'assets/svg/invites_icon_selected.svg';

import Colors from '@styles';

const {Navigator, Screen} = createBottomTabNavigator();

const DashTrainner = () => {
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
          fontSize: 9,
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
        name="Commons"
        component={Students}
        options={{
          unmountOnBlur: true,
          tabBarLabel: 'Alunos',
          tabBarIcon: ({focused}) =>
            focused ? <PeopleIconSelected /> : <PeopleIcon />,
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

export default DashTrainner;
