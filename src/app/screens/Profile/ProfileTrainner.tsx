import React, {useEffect, useState} from 'react';

import {ProfileContainer} from './styles';

import BackRedHeader from 'assets/svg/RedTopBack.svg';
import PlayIcon from 'assets/svg/PlayIcon.svg';
import LineGray from 'assets/svg/LineGran.svg';
import {Dimensions, TouchableOpacity, View} from 'react-native';
import {Button, Space, Text} from 'components';
import {Image} from 'react-native';
import {Logout} from 'functions';
import Colors from '@styles';

import ProfileEdit from './ProfileEdit';
import {BannerAd, BannerAdSize, TestIds} from '@react-native-admob/admob';
import {purchased} from 'payments';

const {width} = Dimensions.get('window');

const ProfileTrainner = ({user, navigation}: any) => {
  const [state, setState] = useState<any>('');
  const [purchase, setPurchase] = useState(false);

  const loadPurchase = async () => {
    const res = await purchased(user.planId);
    setPurchase(res);
  };

  useEffect(() => {
    loadPurchase();
  }, [purchase]);

  if (state === 'edit') {
    return <ProfileEdit user={user} setState={setState} />;
  }

  return (
    <>
      <ProfileContainer
        contentContainerStyle={{
          flexGrow: 1,
          alignItems: 'center',
          width: '100%',
          paddingBottom: 16,
        }}
        showsVerticalScrollIndicator={false}>
        <View style={{width: '100%', height: width > 360 ? 228 : 200}}>
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
            size={20}
            weight={600}
            color={Colors.textColorBlack}
          />
          <Space marginVertical={5} />
          <View
            style={{
              height: 25,
              paddingHorizontal: 8,
              borderRadius: 13,
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: Colors.red,
            }}>
            <Text
              title={user.plan === 'individual' ? 'Individual' : 'Básico'}
              size={10}
              weight={600}
              color={Colors.textColorWhite}
            />
          </View>
        </View>
        <Space marginVertical={15} />

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
              size={16}
              weight={600}
              color={Colors.textColorBlack}
              style={{marginLeft: 5}}
            />
            <PlayIcon />
          </TouchableOpacity>
          <LineGray width="100%" />
        </View>
        <Space marginVertical={8} />

        <Space marginVertical={60} />
        <View style={{width: '90%', alignItems: 'center'}}>
          <Button
            title="Editar Dados"
            background={Colors.background}
            size={15}
            weight={500}
            color={Colors.textColorBlack}
            onPress={() => setState('edit')}
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
      {!!user && user.plan === 'basic' ? (
        <BannerAd size={BannerAdSize.FULL_BANNER} unitId={TestIds.BANNER} />
      ) : !purchase ? (
        <BannerAd size={BannerAdSize.FULL_BANNER} unitId={TestIds.BANNER} />
      ) : null}
    </>
  );
};

export default ProfileTrainner;
