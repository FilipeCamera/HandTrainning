import React, {useState, useEffect} from 'react';

import {ProfileContainer} from './styles';

import BackRedHeader from 'assets/svg/RedTopBack.svg';
import PlayIcon from 'assets/svg/PlayIcon.svg';
import CloseIcon from 'assets/svg/CloseIcon.svg';
import LocationIcon from 'assets/svg/locationIcon.svg';
import LineGray from 'assets/svg/LineGran.svg';
import {TouchableOpacity, View} from 'react-native';
import {Button, CardMini, Space, Text} from 'components';
import {Image} from 'react-native';
import {Logout} from 'functions';
import {firestore} from 'firebase';
import Colors from '@styles';
import {useGetUser} from 'hooks';

const ProfileTrainner = ({user, navigation}: any) => {
  const [gym, setGym] = useState<any>([]);
  const {getUserTypeAndAssociateTrainner} = useGetUser();
  useEffect(() => {
    getUserTypeAndAssociateTrainner({
      type: 'gym',
      associate: user.userAssociate,
      onComplete: gyms => {
        if (gyms) {
          setGym(gyms);
        }
      },
      onFail: err => {},
    });
  }, []);
  return (
    <ProfileContainer
      contentContainerStyle={{
        flexGrow: 1,
        alignItems: 'center',
        width: '100%',
        paddingBottom: 16,
      }}
      showsVerticalScrollIndicator={false}>
      <View style={{width: '100%', height: 200}}>
        <BackRedHeader
          width="100%"
          height="100%"
          style={{position: 'absolute', top: 0}}
        />
        <View
          style={{
            width: 150,
            height: 150,
            borderRadius: 75,
            borderWidth: 5,
            borderColor: Colors.background,
            position: 'absolute',
            bottom: 0,
            alignSelf: 'center',
          }}>
          <Image
            source={{uri: user.avatar}}
            style={{width: '100%', height: '100%', borderRadius: 9999}}
          />
        </View>
      </View>
      <Space marginVertical={8} />
      <View style={{alignItems: 'center'}}>
        <Text
          title={user.name}
          size={22}
          weight={600}
          color={Colors.textColorBlack}
        />
        <View style={{flexDirection: 'row', alignItems: 'flex-start'}}>
          <LocationIcon />
          <Space marginHorizontal={1} />
          <Text
            title={`${user.city}, ${user.uf}`}
            size={15}
            weight={500}
            color={Colors.grayMediumLight}
          />
        </View>
        <Space marginVertical={5} />
        <View
          style={{
            width: 70,
            height: 25,
            borderRadius: 13,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: Colors.red,
          }}>
          <Text
            title={user.plan}
            size={10}
            weight={600}
            color={Colors.textColorWhite}
          />
        </View>
      </View>
      <Space marginVertical={15} />
      {!!gym && (
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-around',
            width: '100%',
          }}>
          {gym.map(item => (
            <CardMini key={item.uid} avatar={item.avatar} name={item.name} />
          ))}
        </View>
      )}
      <Space marginVertical={30} />
      <View style={{width: '90%'}}>
        <TouchableOpacity
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
          onPress={() => {}}>
          <Text
            title="Convidar amigos"
            size={18}
            weight={600}
            color={Colors.textColorBlack}
            style={{marginLeft: 5}}
          />
          <PlayIcon />
        </TouchableOpacity>
        <LineGray width="100%" />
      </View>
      <Space marginVertical={8} />
      <View style={{width: '90%'}}>
        <TouchableOpacity
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
          onPress={() => {}}>
          <Text
            title="Desvincular da academia"
            size={18}
            weight={600}
            color={Colors.textColorBlack}
            style={{marginLeft: 5}}
          />
          <CloseIcon />
        </TouchableOpacity>
        <LineGray width="100%" />
      </View>
      <Space marginVertical={60} />
      <View style={{width: '90%', alignItems: 'center'}}>
        <Button
          title="Editar Dados"
          background={Colors.background}
          size={15}
          weight={500}
          color={Colors.textColorBlack}
        />
        <Button
          title="Sair"
          background={Colors.red}
          size={15}
          weight={500}
          color={Colors.textColorWhite}
          onPress={() => Logout().then(_ => navigation.navigate('Public'))}
        />
      </View>
    </ProfileContainer>
  );
};

export default ProfileTrainner;
