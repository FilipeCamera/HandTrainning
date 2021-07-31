import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React from 'react';
import {Exercise, Home, Invites} from 'screens';

import HomeIcon from 'assets/svg/home_icon.svg';
import HomeIconSelected from 'assets/svg/home_icon_selected.svg';
import InvitesIcon from 'assets/svg/invites_icon.svg';
import InvitesIconSelected from 'assets/svg/invites_icon_selected.svg';
import WeightIcon from 'assets/svg/weight_icon.svg';
import WeightIconSelected from 'assets/svg/weight_icon_selected.svg';
import ProfileIcon from 'assets/svg/profile_icon.svg';
import ProfileIconSelected from 'assets/svg/profile_icon_selected.svg';
import AddIcon from 'assets/svg/add_icon.svg';
import {Text} from 'components';
import {View} from 'react-native';

const Tab = createBottomTabNavigator();

const GymNavigator = () => {
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
        name="Exercise"
        component={Exercise}
        options={{
          unmountOnBlur: true,
          tabBarLabel: ({color}) => (
            <Text title="Exercícios" size={12} weight={500} color={color} />
          ),
          tabBarIcon: ({focused}) =>
            focused ? <WeightIconSelected /> : <WeightIcon />,
        }}
      />
      <Tab.Screen
        name="Post"
        component={Home}
        options={{
          unmountOnBlur: true,
          tabBarLabel: '',
          tabBarIcon: ({focused}) => (
            <View
              style={{
                backgroundColor: focused ? '#ff5646' : '#FF6859',
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
        component={Home}
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

export default GymNavigator;
