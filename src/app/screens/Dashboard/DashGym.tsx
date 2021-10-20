import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React from 'react';
import {Exercise, Home, Invites, Posts, Profile} from 'screens';

import HomeIcon from 'assets/svg/home_icon.svg';
import HomeIconSelected from 'assets/svg/home_icon_selected.svg';
import ProfileIcon from 'assets/svg/profile_icon.svg';
import ProfileIconSelected from 'assets/svg/profile_icon_selected.svg';
import WeightIcon from 'assets/svg/weight_icon.svg';
import WeightIconSelected from 'assets/svg/weight_icon_selected.svg';
import InvitesIcon from 'assets/svg/invites_icon.svg';
import InvitesIconSelected from 'assets/svg/invites_icon_selected.svg';
import AddIcon from 'assets/svg/add_icon.svg';

import Colors from '@styles';
import {View} from 'react-native';

const {Navigator, Screen} = createBottomTabNavigator();

const DashGym = () => {
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
        name="Exercise"
        component={Exercise}
        options={{
          tabBarLabel: 'Exercícios',
          tabBarIcon: ({focused}) =>
            focused ? <WeightIconSelected /> : <WeightIcon />,
        }}
      />
      <Screen
        name="Post"
        component={Posts}
        options={{
          tabBarLabel: '',
          tabBarIcon: ({focused}) => (
            <View
              style={{
                backgroundColor: focused ? Colors.red : Colors.gray,
                width: 50,
                height: 50,
                borderRadius: 25,
                alignItems: 'center',
                justifyContent: 'center',
                marginTop: 8,
              }}>
              <AddIcon />
            </View>
          ),
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

export default DashGym;
