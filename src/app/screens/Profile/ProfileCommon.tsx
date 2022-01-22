import React, {useState, useEffect, useCallback} from 'react';

import {ProfileContainer} from './styles';

import BackRedHeader from 'assets/svg/RedTopBack.svg';
import PlayIcon from 'assets/svg/PlayIcon.svg';
import LineGray from 'assets/svg/LineGran.svg';
import {
  Dimensions,
  Platform,
  RefreshControl,
  TouchableOpacity,
  View,
} from 'react-native';
import {Button, Card, ModalRemoveTrainner, Space, Text} from 'components';
import {Image} from 'react-native';
import {Logout} from 'functions';
import Colors from '@styles';
import {useGetTrainning, useGetUser} from 'hooks';

import ProfileEdit from './ProfileEdit';
import AcademicIcon from 'assets/svg/academicIcon.svg';
import TrashIcon from 'assets/svg/trashIcon.svg';
import SkillIcon from 'assets/svg/skillLevelIcon.svg';
import SpecsIcon from 'assets/svg/specsIcon.svg';
import {firestore} from 'firebase';
import {showMessage} from 'react-native-flash-message';
import {BannerAd, BannerAdSize, TestIds} from '@react-native-admob/admob';
import {listAvailableSubscriptions, purchased} from 'payments';

const {width} = Dimensions.get('window');

const itemsSubs = Platform.select({
  android: [
    'android.test.purchased',
    'android.test.canceled',
    'android.test.refunded',
  ],
});

const defaultSubId = 'android.test.purchased';

const ProfileCommon = ({user, navigation}: any) => {
  const [trainner, setTrainner] = useState<any>();
  const [state, setState] = useState('');
  const [visible, setVisible] = useState(false);
  const [purchase, setPurchase] = useState(false);
  const {getTrainnerAssociate} = useGetUser();
  const {getTrainningId} = useGetTrainning();
  const [refresh, setRefresh] = useState(false);

  const wait = timeout => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  };

  const loadPurchase = async () => {
    const res = await purchased(defaultSubId);
    setPurchase(res);
  };
  useEffect(() => {
    listAvailableSubscriptions(itemsSubs);
    loadPurchase();
  }, [purchase]);

  const handleRemoveTrainner = () => {
    firestore()
      .collection('users')
      .doc(user.uid)
      .update({trainnerAssociate: null})
      .then(() => {
        firestore()
          .collection('users')
          .doc(trainner.uid)
          .update({
            commons: trainner.commons.filter(common => common !== user.uid),
          })
          .finally(() => {
            getTrainningId({
              uid: user.uid,
              onComplete: async id => {
                if (id) {
                  await firestore().collection('trainnings').doc(id).delete();
                  await firestore()
                    .collection('trainningScores')
                    .doc(id)
                    .delete();
                }
              },
              onFail: err => {},
            });
            setTrainner(null);
            setVisible(false);
            showMessage({
              type: 'success',
              message: 'Removido',
              description: 'Você não tem mais treinador',
            });
          });
      })
      .catch(err => {
        showMessage({
          type: 'danger',
          message: 'Erro',
          description: 'Houve um problema, tente mais tarde',
        });
      });
  };
  const onRefresh = useCallback(() => {
    setRefresh(true);
    wait(1000).then(() => setRefresh(false));
  }, []);

  useEffect(() => {
    if (user.trainnerAssociate) {
      getTrainnerAssociate({
        uid: user.trainnerAssociate,
        onComplete: (trainner: any) => {
          if (trainner) {
            setTrainner(trainner);
          }
        },
        onFail: (err: any) => {},
      });
    }
  }, [refresh]);
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
      refreshControl={
        <RefreshControl
          progressViewOffset={50}
          refreshing={refresh}
          onRefresh={onRefresh}
          colors={[Colors.red]}
          progressBackgroundColor={Colors.background}
        />
      }
      showsVerticalScrollIndicator={false}>
      <ModalRemoveTrainner
        visible={visible}
        setVisible={setVisible}
        title="Deseja realmente remover treinador?"
        desc="Caso faça isso, você perderá o seu treino"
        onFunction={handleRemoveTrainner}
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
            size={12}
            weight={600}
            color={Colors.textColorWhite}
          />
        </View>
      </View>
      {!!trainner && <Space marginVertical={16} />}
      {!!trainner && (
        <View style={{width: '90%'}}>
          <Card>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <View style={{flexDirection: 'column', flex: 1}}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <View style={{width: 40, height: 40, borderRadius: 20}}>
                    <Image
                      source={{uri: trainner.avatar}}
                      style={{
                        width: '100%',
                        height: '100%',
                        borderRadius: 9999,
                      }}
                    />
                  </View>
                  <Space marginHorizontal={4} />
                  <View>
                    <Text title={trainner.name} size={14} weight={500} />
                    <Text title="Treinador(a)" size={12} weight={400} />
                  </View>
                </View>
                <Space marginVertical={4} />
                <View style={{width: '90%'}}>
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <View
                      style={{
                        backgroundColor: Colors.red,
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: 20,
                        height: 20,
                        borderRadius: 10,
                      }}>
                      <AcademicIcon width="14px" height="14px" />
                    </View>
                    <Space marginHorizontal={3} />
                    <Text
                      title={`${trainner.course} - ${trainner.university}`}
                      size={12}
                      weight={500}
                    />
                  </View>
                  <Space marginVertical={4} />
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <View
                      style={{
                        backgroundColor: Colors.red,
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: 20,
                        height: 20,
                        borderRadius: 10,
                      }}>
                      <SkillIcon width="12px" height="12px" />
                    </View>
                    <Space marginHorizontal={3} />
                    <Text title={trainner.experience} size={12} weight={500} />
                  </View>
                  <Space marginVertical={4} />
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <View
                      style={{
                        backgroundColor: Colors.red,
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: 20,
                        height: 20,
                        borderRadius: 10,
                      }}>
                      <SpecsIcon width="12px" height="12px" />
                    </View>
                    <Space marginHorizontal={3} />
                    <Text title={trainner.specs} size={12} weight={500} />
                  </View>
                </View>
              </View>
              <TouchableOpacity onPress={() => setVisible(true)}>
                <TrashIcon />
              </TouchableOpacity>
            </View>
          </Card>
        </View>
      )}
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
        {!!user && user.plan === 'basic' ? (
          <>
            <Space marginVertical={8} />
            <BannerAd size={BannerAdSize.FULL_BANNER} unitId={TestIds.BANNER} />
          </>
        ) : !purchase ? (
          <>
            <Space marginVertical={8} />
            <BannerAd size={BannerAdSize.FULL_BANNER} unitId={TestIds.BANNER} />
          </>
        ) : null}
      </View>
    </ProfileContainer>
  );
};

export default ProfileCommon;
