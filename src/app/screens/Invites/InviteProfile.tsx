import React, {useEffect, useState} from 'react';
import {Image, View, TouchableOpacity, BackHandler} from 'react-native';
import {InvitesProfileStyle} from './styles';

import BackRedHeader from 'assets/svg/RedTopBack.svg';
import LocationIcon from 'assets/svg/locationIcon.svg';
import AcademicIcon from 'assets/svg/academicIcon.svg';
import SkillIcon from 'assets/svg/skillLevelIcon.svg';
import SpecsIcon from 'assets/svg/specsIcon.svg';
import BackIcon from 'assets/svg/arrowBackWhite.svg';
import {Button, ButtonGranInvite, ButtonText, Space, Text} from 'components';
import {firestore} from 'firebase';
import Colors from '@styles';
import {useGetUser} from 'hooks';

interface InviteProfileProps {
  profile: any;
  onBack: any;
  auth: any;
  handleAcceptOrRecused: any;
}
const InviteProfile = ({
  profile,
  onBack,
  auth,
  handleAcceptOrRecused,
}: InviteProfileProps) => {
  const {getUserTrainner, getUserCommonGym} = useGetUser();
  const [data, setData] = useState<any[]>();

  useEffect(() => {
    if (profile.type === 'gym') {
      getUserTrainner({
        uid: profile.uid,
        onComplete: users => {
          if (users) {
            setData(users);
          }
        },
        onFail: err => {},
      });
    }
    if (profile.type === 'trainner') {
      firestore()
        .collection('users')
        .where('uid', 'in', profile.userAssociate)
        .get()
        .then(querySnapshot => {
          const dados = querySnapshot.docs.map(doc => doc.data());
          setData(dados);
        })
        .catch(error => {});
    }
    if (profile.type === 'common') {
      getUserCommonGym({
        uid: profile.userAssociate ? profile.userAssociate : '',
        onComplete: gym => {
          if (gym) {
            setData([gym]);
          }
        },
        onFail: err => {},
      });
    }
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
          style={{position: 'absolute', top: 45, left: 25}}
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
      <Space marginVertical={8} />
      <View style={{alignItems: 'center'}}>
        <Text
          title={profile.name}
          size={22}
          weight={600}
          color={Colors.textColorBlack}
        />
        {!!profile.cnpj && (
          <>
            <Text
              title={profile.cnpj}
              size={14}
              weight={600}
              color={Colors.grayMediumLight}
            />
            <Space marginVertical={2} />
          </>
        )}
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
            size={11}
            weight={600}
            color={Colors.textColorWhite}
          />
        </View>
        <Space marginVertical={10} />
        {!!profile.slogan && (
          <Text
            title={profile.slogan}
            size={18}
            weight={500}
            color={Colors.grayLight}
          />
        )}
      </View>
      {!!profile.course && profile.university && <Space marginVertical={16} />}
      {!!profile.course && profile.university && (
        <View
          style={{
            padding: 16,
            backgroundColor: Colors.background,
            elevation: 5,
            borderRadius: 8,
            borderWidth: 0.5,
            borderColor: Colors.lightGray,
            width: '85%',
          }}>
          <View
            style={{
              width: 30,
              height: 30,
              borderRadius: 15,
              backgroundColor: Colors.red,
              alignItems: 'center',
              justifyContent: 'center',
              position: 'absolute',
              top: -15,
              left: -15,
              elevation: 5,
            }}>
            <AcademicIcon />
          </View>
          <View>
            <Text
              title={profile.university}
              size={14}
              weight={400}
              color={Colors.textColorBlack}
              center
            />
            <Text
              title={profile.course}
              size={14}
              weight={400}
              color={Colors.textColorBlack}
              center
            />
          </View>
        </View>
      )}
      {!!profile.specs && <Space marginVertical={16} />}
      {!!profile.specs && (
        <View
          style={{
            padding: 16,
            backgroundColor: Colors.background,
            elevation: 5,
            borderRadius: 8,
            borderWidth: 0.5,
            borderColor: Colors.lightGray,
            width: '85%',
          }}>
          <View
            style={{
              width: 30,
              height: 30,
              borderRadius: 15,
              backgroundColor: Colors.red,
              alignItems: 'center',
              justifyContent: 'center',
              position: 'absolute',
              top: -15,
              left: -15,
              elevation: 5,
            }}>
            <SpecsIcon />
          </View>
          <View>
            <Text
              title={profile.specs}
              size={14}
              weight={400}
              color={Colors.textColorBlack}
              center
            />
          </View>
        </View>
      )}
      {!!profile.experience && <Space marginVertical={16} />}
      {!!profile.experience && (
        <View
          style={{
            padding: 16,
            backgroundColor: Colors.background,
            elevation: 5,
            borderRadius: 8,
            borderWidth: 0.5,
            borderColor: Colors.lightGray,
            width: '85%',
          }}>
          <View
            style={{
              width: 30,
              height: 30,
              borderRadius: 15,
              backgroundColor: Colors.red,
              alignItems: 'center',
              justifyContent: 'center',
              position: 'absolute',
              top: -15,
              left: -15,
              elevation: 5,
            }}>
            <SkillIcon />
          </View>
          <View>
            <Text
              title={profile.experience}
              size={14}
              weight={400}
              color={Colors.textColorBlack}
              center
            />
          </View>
        </View>
      )}
      <Space marginVertical={25} />
      {!!data &&
        data.map(item => (
          <View
            key={item.uid}
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
                  source={{uri: item.avatar}}
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
                  title={item.name}
                  size={14}
                  weight={600}
                  color={Colors.textColorBlack}
                />
                <Text
                  title={
                    item.type === 'common'
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
        ))}

      <Space marginVertical={50} />
      {!profile.invite && (
        <View style={{height: 56, width: '90%'}}>
          <ButtonGranInvite
            title="Enviar convite"
            sendTitle="Convite enviado"
            size={14}
            weight={500}
            color={Colors.textColorWhite}
            to={auth}
            from={profile.uid}
          />
        </View>
      )}
      {!!profile.invite && (
        <>
          <Button
            title="Aceitar"
            size={14}
            weight={500}
            color={Colors.textColorWhite}
            background={Colors.red}
            onPress={() =>
              handleAcceptOrRecused(
                true,
                profile.uid,
                profile.type,
                profile.userAssociate,
              )
            }
          />
          <Space marginVertical={8} />
          <ButtonText
            title="Recusar"
            size={14}
            weight={500}
            color={Colors.redMedium}
            onPress={() =>
              handleAcceptOrRecused(
                false,
                profile.uid,
                profile.type,
                profile.userAssociate,
              )
            }
          />
          <Space marginVertical={8} />
        </>
      )}
    </InvitesProfileStyle>
  );
};

export default InviteProfile;
