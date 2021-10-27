import React, {useState, useEffect} from 'react';

import {ProfileContainer} from './styles';

import BackRedHeader from 'assets/svg/RedTopBack.svg';
import PlayIcon from 'assets/svg/PlayIcon.svg';
import CloseIcon from 'assets/svg/CloseIcon.svg';
import LocationIcon from 'assets/svg/locationIcon.svg';
import LineGray from 'assets/svg/LineGran.svg';
import {TouchableOpacity, View} from 'react-native';
import {
  Button,
  CardMini,
  ModalUnbindGymTrainner,
  Space,
  Text,
} from 'components';
import {Image} from 'react-native';
import {Logout, removeGymId} from 'functions';
import Colors from '@styles';
import {useGetTrainning, useGetUser} from 'hooks';
import ProfileEdit from './ProfileEdit';
import {firestore} from 'firebase';
import {showMessage} from 'react-native-flash-message';

const ProfileTrainner = ({user, navigation}: any) => {
  const {getUserTypeAndAssociateID} = useGetUser();
  const {getTrainningDeleteUnbindGymCT} = useGetTrainning();
  const [gym, setGym] = useState<any>([]);
  const [state, setState] = useState<any>('');
  const [visible, setVisible] = useState(false);
  const {getUserTypeAndAssociateTrainner} = useGetUser();
  useEffect(() => {
    if (user.userAssociate.length !== 0) {
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
    }
  }, []);

  const handleUnbindGym = uid => {
    const userAssociate = user.userAssociate.filter(uidGym => uidGym !== uid);

    getUserTypeAndAssociateID({
      type: 'common',
      associate: uid,
      onComplete: ids => {
        if (ids) {
          getTrainningDeleteUnbindGymCT({
            uid: user.uid,
            listUid: ids,
            onFail: err => {},
          });
        }
      },
      onFail: err => {},
    });
    firestore()
      .collection('users')
      .doc(user.uid)
      .update({userAssociate: userAssociate})
      .then(res => {
        setVisible(false);
        removeGymId();
        showMessage({
          type: 'success',
          message: 'Você não faz mais parte dessa academia',
        });
      })
      .catch(err => {});
  };
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
      <ModalUnbindGymTrainner
        title="Deseja realmente desvincular?"
        desc="Caso se desvincule da academia escolhida, você irá perder seus alunos"
        visible={visible}
        setVisible={setVisible}
        gyms={gym}
        onFunction={uid => handleUnbindGym(uid)}
      />
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
          size={20}
          weight={600}
          color={Colors.textColorBlack}
        />
        <View style={{flexDirection: 'row', alignItems: 'flex-start'}}>
          <LocationIcon />
          <Space marginHorizontal={1} />
          <Text
            title={`${user.city}, ${user.uf}`}
            size={14}
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
      {!!gym && gym.length !== 0 && (
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
      {!!gym && gym.length !== 0 && (
        <View style={{width: '90%'}}>
          <TouchableOpacity
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
            onPress={() => setVisible(true)}>
            <Text
              title="Desvincular da academia"
              size={16}
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

export default ProfileTrainner;
