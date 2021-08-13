import React from 'react';

import {ProfileContainer} from './styles';

import BackRedHeader from 'assets/svg/RedTopBack.svg';
import {View} from 'react-native';
import {BarChart, Button, Label, Space, Text} from 'components';
import {Image} from 'react-native';
import {Logout} from 'functions';

const ProfileGym = ({user, navigation}: any) => {
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
            borderColor: '#FFF',
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
        <Text title={user.name} size={22} weight={600} color="#090A0A" />
        {user.type === 'gym' && (
          <Text title={user.cnpj} size={15} weight={500} color="#c4c4c4" />
        )}
        <View>
          <Text
            title={`${user.city}, ${user.uf}`}
            size={15}
            weight={500}
            color="#c4c4c4"
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
            backgroundColor: '#FF6859',
          }}>
          <Text title={user.plan} size={10} weight={600} color="#FFF" />
        </View>
        <Space marginVertical={10} />
      </View>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-around',
          width: '95%',
        }}>
        <View style={{flexDirection: 'column', alignItems: 'center'}}>
          <Text title="78" weight={900} size={22} color="#090A0A" />
          <Text title="Total" weight={500} size={14} color="#FF6859" />
        </View>
        <View
          style={{
            height: 50,
            width: 2,
            backgroundColor: '#dedede',
            borderRadius: 2,
          }}
        />
        <View style={{flexDirection: 'column', alignItems: 'center'}}>
          <Text title="8" weight={900} size={22} color="#090A0A" />
          <Text title="Treinadores" weight={500} size={14} color="#FF6859" />
        </View>
        <View
          style={{
            height: 50,
            width: 2,
            backgroundColor: '#dedede',
            borderRadius: 2,
          }}
        />
        <View style={{flexDirection: 'column', alignItems: 'center'}}>
          <Text title="70" weight={900} size={22} color="#090A0A" />
          <Text title="Alunos" weight={500} size={14} color="#FF6859" />
        </View>
      </View>
      <Space marginVertical={20} />
      <View style={{width: '95%'}}>
        <Label title="Engajamento da academia" color="#d2d3d7" />
        <BarChart />
      </View>
      <Space marginVertical={20} />
      <View style={{width: '90%', alignItems: 'center'}}>
        <Button
          title="Editar Dados"
          background="#fff"
          size={15}
          weight={500}
          color="#090A0A"
        />
        <Button
          title="Sair"
          background="#FF6859"
          size={15}
          weight={500}
          color="#fff"
          onPress={() => Logout().then(_ => navigation.navigate('Public'))}
        />
      </View>
    </ProfileContainer>
  );
};

export default ProfileGym;
