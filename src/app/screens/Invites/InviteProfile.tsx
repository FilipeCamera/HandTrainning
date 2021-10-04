import React, {useEffect, useState} from 'react';
import {Image, View, TouchableOpacity, BackHandler} from 'react-native';
import {InvitesProfileStyle} from './styles';

import BackRedHeader from 'assets/svg/RedTopBack.svg';
import LocationIcon from 'assets/svg/locationIcon.svg';
import BackIcon from 'assets/svg/arrowBackWhite.svg';
import {ButtonInvite, Space, Text} from 'components';
import {firestore} from 'firebase';
import Colors from '@styles';

interface InviteProfileProps {
  profile: any;
  onBack: any;
  auth: any;
}
const InviteProfile = ({profile, onBack, auth}: InviteProfileProps) => {
  const [data, setData] = useState<any[]>();

  useEffect(() => {
    firestore()
      .collection('users')
      .where('uid', '==', profile.userAssociate || profile.uid)
      .get()
      .then(querySnapshot => {
        const dados = querySnapshot.docs.map(doc => doc.data());
        setData(dados);
      })
      .catch(error => {});
  }, []);
  const backChange = () => {
    onBack('');
    return true;
  };
  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backChange,
    );
    return () => backHandler.remove();
  }, []);
  return (
    <InvitesProfileStyle
      contentContainerStyle={{
        flexGrow: 1,
        alignItems: 'center',
        width: '100%',
        paddingBottom: 25,
      }}
      showsVerticalScrollIndicator={false}>
      <View style={{width: '100%', height: 200}}>
        <BackRedHeader
          width="100%"
          height="100%"
          style={{position: 'absolute', top: 0}}
        />
        <TouchableOpacity
          style={{position: 'absolute', top: 30, left: 25}}
          onPress={() => onBack('')}>
          <BackIcon />
        </TouchableOpacity>
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
            source={{uri: profile.avatar}}
            style={{width: '100%', height: '100%', borderRadius: 9999}}
          />
        </View>
      </View>
      <View style={{alignItems: 'center'}}>
        <Text
          title={profile.name}
          size={22}
          weight={600}
          color={Colors.textColorBlack}
        />
        <View style={{flexDirection: 'row', alignItems: 'flex-start'}}>
          <LocationIcon />
          <Space marginHorizontal={1} />
          <Text
            title={`${profile.city}, ${profile.uf}`}
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
            title={
              profile.type === 'common'
                ? 'aluno'
                : profile.type === 'trainner'
                ? 'treinador'
                : 'academia'
            }
            size={10}
            weight={600}
            color={Colors.textColorWhite}
          />
        </View>
        <Space marginVertical={5} />
        {!!profile.slogan && (
          <Text
            title={profile.slogan}
            size={15}
            weight={400}
            color={Colors.grayMediumLight}
          />
        )}
      </View>
      <Space marginVertical={25} />
      {!!data && (
        <>
          <View
            style={{
              width: '90%',
              backgroundColor: Colors.background,
              padding: 16,
              borderRadius: 10,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginVertical: 8,
              shadowColor: '#1C2439',
              shadowOffset: {
                width: 0,
                height: 2,
              },
              shadowOpacity: 0.25,
              shadowRadius: 3.84,

              elevation: 5,
            }}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <View style={{width: 50, height: 50, borderRadius: 25}}>
                <Image
                  source={{uri: data[0].avatar}}
                  style={{width: '100%', height: '100%', borderRadius: 999}}
                />
              </View>
              <View
                style={{
                  flexDirection: 'column',
                  alignItems: 'flex-start',
                  marginLeft: 8,
                }}>
                <Text
                  title={data[0].name}
                  size={14}
                  weight={600}
                  color={Colors.textColorBlack}
                />
                <Text
                  title={
                    data[0].type === 'common'
                      ? 'Aluno'
                      : data[0].type === 'trainner'
                      ? 'Treinador'
                      : 'Academia'
                  }
                  size={13}
                  weight={500}
                  color={Colors.textColorBlack}
                />
              </View>
            </View>
          </View>
          {!profile.userAssociate && (
            <>
              <Space marginVertical={70} />
              <View style={{height: 56, width: '90%'}}>
                <ButtonInvite
                  title="Enviar convite"
                  sendTitle="Convite enviado"
                  size={15}
                  weight={500}
                  color="#fff"
                  to={auth}
                  from={profile.uid}
                />
              </View>
            </>
          )}
        </>
      )}
    </InvitesProfileStyle>
  );
};

export default InviteProfile;