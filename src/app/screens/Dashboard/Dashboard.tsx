import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Text} from 'components';
import React from 'react';
import {useSelector} from 'react-redux';
import {
  Exercise,
  Home,
  Invites,
  Posts,
  Profile,
  Students,
  Trainning,
} from 'screens';

import HomeIcon from 'assets/svg/home_icon.svg';
import HomeIconSelected from 'assets/svg/home_icon_selected.svg';
import ProfileIcon from 'assets/svg/profile_icon.svg';
import ProfileIconSelected from 'assets/svg/profile_icon_selected.svg';
import PeopleIcon from 'assets/svg/people.svg';
import PeopleIconSelected from 'assets/svg/peopleBlack.svg';
import WeightIcon from 'assets/svg/weight_icon.svg';
import WeightIconSelected from 'assets/svg/weight_icon_selected.svg';
import InvitesIcon from 'assets/svg/invites_icon.svg';
import InvitesIconSelected from 'assets/svg/invites_icon_selected.svg';
import AddIcon from 'assets/svg/add_icon.svg';

import Colors from '@styles';
import {View} from 'react-native';

const {Navigator, Screen} = createBottomTabNavigator();

const Dashboard = () => {
  const user = useSelector((state: any) => state.auth.user);
  return (
    <Navigator
      tabBarOptions={{
        activeTintColor: Colors.textColorBlack,
        inactiveTintColor: Colors.gray,
        style: {
          borderTopColor: 'transparent',
          height: 60,
        },
        tabStyle: {
          paddingTop: 5,
        },
      }}
      initialRouteName="Home">
      <Screen
        name="Home"
        component={Home}
        options={{
          tabBarLabel: ({color}) => (
            <Text title="Home" size={12} weight={500} color={color} />
          ),
          tabBarIcon: ({focused}) =>
            focused ? <HomeIconSelected /> : <HomeIcon />,
        }}
      />
      {user.type === 'gym' && (
        <>
          <Screen
            name="Exercise"
            component={Exercise}
            options={{
              tabBarLabel: ({color}) => (
                <Text title="Exercícios" size={12} weight={500} color={color} />
              ),
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
        </>
      )}
      {user.type === 'common' && (
        <Screen
          name="Trainning"
          component={Trainning}
          options={{
            unmountOnBlur: true,
            tabBarLabel: ({color}) => (
              <Text title="Treino" size={12} weight={500} color={color} />
            ),
            tabBarIcon: ({focused}) =>
              focused ? <WeightIconSelected /> : <WeightIcon />,
          }}
        />
      )}
      {user.type === 'trainner' && (
        <Screen
          name="Commons"
          component={Students}
          options={{
            unmountOnBlur: true,
            tabBarLabel: ({color}) => (
              <Text title="Alunos" size={12} weight={500} color={color} />
            ),
            tabBarIcon: ({focused}) =>
              focused ? <PeopleIconSelected /> : <PeopleIcon />,
          }}
        />
      )}
      <Screen
        name="Invites"
        component={Invites}
        options={{
          tabBarLabel: ({color}) => (
            <Text title="Convites" size={12} weight={500} color={color} />
          ),
          tabBarIcon: ({focused}) =>
            focused ? <InvitesIconSelected /> : <InvitesIcon />,
        }}
      />
      <Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarLabel: ({color}) => (
            <Text title="Perfil" size={12} weight={500} color={color} />
          ),
          tabBarIcon: ({focused}) =>
            focused ? <ProfileIconSelected /> : <ProfileIcon />,
        }}
      />
    </Navigator>
  );
};

export default Dashboard;
