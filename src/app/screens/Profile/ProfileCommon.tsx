import React, {useState, useEffect} from 'react';

import {ProfileContainer} from './styles';

import BackRedHeader from 'assets/svg/RedTopBack.svg';
import PlayIcon from 'assets/svg/PlayIcon.svg';
import CloseIcon from 'assets/svg/CloseIcon.svg';
import LocationIcon from 'assets/svg/locationIcon.svg';
import LineGray from 'assets/svg/LineGran.svg';
import {Dimensions, TouchableOpacity, View} from 'react-native';
import {Button, CardMini, ModalUnbindGym, Space, Text} from 'components';
import {Image} from 'react-native';
import {Logout} from 'functions';
import Colors from '@styles';
import {useGetTrainning, useGetUser} from 'hooks';
import {firestore} from 'firebase';
import {showMessage} from 'react-native-flash-message';
import ProfileEdit from './ProfileEdit';

const {width} = Dimensions.get('window');

const ProfileCommon = ({user, navigation}: any) => {
  const [gym, setGym] = useState<any>();
  const [trainner, setTrainner] = useState<any>();
  const [state, setState] = useState('');
  const [visible, setVisible] = useState(false);
  const {getUser} = useGetUser();
  const {getTrainning, getTrainningId} = useGetTrainning();

  const handleUnbindGym = () => {
    firestore()
      .collection('users')
      .doc(user.uid)
      .update({
        userAssociate: '',
        updatedAt: firestore.FieldValue.serverTimestamp(),
      })
      .then(res => {
        getTrainningId({
          uid: user.uid,
          onComplete: trainning => {
            if (trainning) {
              firestore()
                .collection('trainnings')
                .doc(trainning)
                .delete()
                .then(res => {
                  setVisible(false);
                  showMessage({
                    type: 'info',
                    message: 'Você foi desvinculado da academia',
                  });
                })
                .catch(err => {});
            } else {
              setVisible(false);
              showMessage({
                type: 'info',
                message: 'Você foi desvinculado da academia',
              });
            }
          },
          onFail: err => {},
        });
      })
      .catch(err => {});
  };

  useEffect(() => {
    getUser({
      uid: user.uid,
      onComplete: users => {
        if (users) {
          getUser({
            uid: users.userAssociate,
            onComplete: gyms => {
              if (gyms) {
                setGym(gyms);
              }
            },
            onFail: err => {},
          });
        }
      },
      onFail: err => {},
    });
    getTrainning({
      uid: user.uid,
      onComplete: trainning => {
        if (trainning) {
          getUser({
            uid: trainning.trainnerId,
            onComplete: trainner => {
              if (trainner) {
                setTrainner(trainner);
              }
            },
            onFail: err => {},
          });
        }
      },
      onFail: err => {},
    });
  }, []);

  if (state === 'edit') {
    return <ProfileEdit user={user} setState={setState} />;
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
      <ModalUnbindGym
        visible={visible}
        setVisible={setVisible}
        title="Deseja realmente desvincular?"
        desc="Você perderá o seu treino caso faça isso."
        onFunction={handleUnbindGym}
      />
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
          size={18}
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
            size={12}
            weight={600}
            color={Colors.textColorWhite}
          />
        </View>
      </View>
      <Space marginVertical={15} />
      {!!gym && !!trainner && (
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-around',
            width: '100%',
          }}>
          <CardMini avatar={gym.avatar} name={gym.name} />
          <CardMini avatar={trainner.avatar} name={trainner.name} />
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
            size={17}
            weight={600}
            color={Colors.textColorBlack}
            style={{marginLeft: 5}}
          />
          <PlayIcon />
        </TouchableOpacity>
        <LineGray width="100%" />
      </View>
      <Space marginVertical={8} />
      {!!gym && (
        <View style={{width: '90%'}}>
          <TouchableOpacity
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
            onPress={() => {
              setVisible(true);
            }}>
            <Text
              title="Desvincular da academia"
              size={17}
              weight={600}
              color={Colors.textColorBlack}
              style={{marginLeft: 5}}
            />
            <CloseIcon />
          </TouchableOpacity>
          <LineGray width="100%" />
        </View>
      )}
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
  );
};

export default ProfileCommon;
