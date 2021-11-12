import React, {useState} from 'react';

import {ProfileContainer} from './styles';

import BackRedHeader from 'assets/svg/RedTopBack.svg';
import PlayIcon from 'assets/svg/PlayIcon.svg';
import LineGray from 'assets/svg/LineGran.svg';
import LocationIcon from 'assets/svg/locationIcon.svg';
import {Dimensions, TouchableOpacity, View} from 'react-native';
import {BarChart, Button, Label, Space, Text} from 'components';
import {Image} from 'react-native';
import {Logout} from 'functions';
import ProfileGymStateScreen from './ProfileGymState';
import Colors from '@styles';

const {width} = Dimensions.get('window');

const ProfileGym = ({user, navigation}: any) => {
  const [state, setState] = useState('');

  if (state === 'common') {
    return (
      <ProfileGymStateScreen
        onBack={setState}
        user={user}
        type="common"
        title="Alunos"
      />
    );
  }
  if (state === 'trainner') {
    return (
      <ProfileGymStateScreen
        onBack={setState}
        user={user}
        type="trainner"
        title="Treinadores"
      />
    );
  }
  return (
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
          size={22}
          weight={600}
          color={Colors.textColorBlack}
        />
        {user.type === 'gym' && (
          <Text
            title={user.cnpj}
            size={15}
            weight={500}
            color={Colors.grayMediumLight}
          />
        )}
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
            color={Colors.background}
          />
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
          <Text
            title="78"
            weight={900}
            size={22}
            color={Colors.textColorBlack}
          />
          <Text title="Total" weight={500} size={14} color={Colors.red} />
        </View>
        <View
          style={{
            height: 50,
            width: 2,
            backgroundColor: Colors.grayLight,
            borderRadius: 2,
          }}
        />
        <View style={{flexDirection: 'column', alignItems: 'center'}}>
          <Text
            title="8"
            weight={900}
            size={22}
            color={Colors.textColorBlack}
          />
          <Text title="Treinadores" weight={500} size={14} color={Colors.red} />
        </View>
        <View
          style={{
            height: 50,
            width: 2,
            backgroundColor: Colors.grayLight,
            borderRadius: 2,
          }}
        />
        <View style={{flexDirection: 'column', alignItems: 'center'}}>
          <Text
            title="70"
            weight={900}
            size={22}
            color={Colors.textColorBlack}
          />
          <Text title="Alunos" weight={500} size={14} color={Colors.red} />
        </View>
      </View>
      <Space marginVertical={30} />
      <View style={{width: '90%'}}>
        <TouchableOpacity
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
          onPress={() => setState('common')}>
          <Text
            title="Alunos"
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
          onPress={() => setState('trainner')}>
          <Text
            title="Treinadores"
            size={18}
            weight={600}
            color="#090a0a"
            style={{marginLeft: 5}}
          />
          <PlayIcon />
        </TouchableOpacity>
        <LineGray width="100%" />
      </View>
      <Space marginVertical={40} />
      <View style={{width: '90%'}}>
        <Label title="Engajamento da academia" color={Colors.grayMediumLight} />
      </View>
      <BarChart />
      <Space marginVertical={20} />
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

export default ProfileGym;
