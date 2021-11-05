import Colors from '@styles';
import {Button, Card, CarouselWarnings, Header, Space, Text} from 'components';
import React, {useCallback, useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Image,
  RefreshControl,
  TouchableOpacity,
  View,
} from 'react-native';
import {useSelector} from 'react-redux';
import CreateTrainning from './CreateTrainning';
import {StudentStyle} from './styles';

import WarningIcon from 'assets/svg/warningIcon.svg';
import TrashIcon from 'assets/svg/trashIcon.svg';
import EditIcon from 'assets/svg/editIcon.svg';
import moment from 'moment';
import {useGetRequests, useGetTrainning, useGetUser} from 'hooks';
import VisualStudents from './VisualStudents';
import {firestore} from 'firebase';
import {showMessage} from 'react-native-flash-message';

const Students = ({navigation}: any) => {
  const user = useSelector((state: any) => state.auth.user);
  const gym = useSelector((state: any) => state.trainner.gym);

  const {getRequestsByGym} = useGetRequests();
  const {getUserTypeAndAssociate, getUser} = useGetUser();
  const {getTrainningTrainner, getTrainningId} = useGetTrainning();

  const [state, setState] = useState('');
  const [trainnings, setTrainnings] = useState<any[]>([]);
  const [commons, setCommons] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [profileGym, setProfileGym] = useState<any>();
  const [buttonTitle, setButtonTitle] = useState('Criar treino');
  const [request, setRequest] = useState<any[]>([]);
  const [selectedCommon, setSelectedCommon] = useState<any>();
  const [mode, setMode] = useState('');
  const items = [
    {title: 'Criar treino'},
    {title: 'Excluir'},
    {title: 'Editar'},
  ];
  const [refresh, setRefresh] = useState(false);

  const wait = timeout => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  };

  const onRefresh = useCallback(() => {
    setRefresh(true);
    wait(1000).then(() => setRefresh(false));
  }, []);
  const handleDeleteTrainning = uid => {
    getTrainningId({
      uid,
      onComplete: trainningId => {
        if (trainningId) {
          firestore().collection('trainnings').doc(trainningId).delete();
        }
      },
      onFail: err => {},
    });
  };

  useEffect(() => {
    if (state !== '') {
      setLoading(true);
      setMode('');
    } else {
      if (gym && gym.gym !== undefined) {
        getUser({
          uid: gym.gym,
          onComplete: user => {
            if (user) {
              setProfileGym(user);
            }
          },
          onFail: err => {},
        });

        getUserTypeAndAssociate({
          type: 'common',
          associate: gym.gym,
          onComplete: users => {
            if (users) {
              setCommons(users);
            }
          },
          onFail: err => {},
        });

        getTrainningTrainner({
          uid: user.uid,
          gym: gym.gym,
          onComplete: trainning => {
            if (trainning) {
              setTrainnings(trainning);
              setLoading(false);
            }
          },
          onFail: err => {},
        });
      } else {
        setLoading(false);
      }
    }
  }, [state, gym, refresh]);

  useEffect(() => {
    if (!!gym && gym.gym !== undefined) {
      getRequestsByGym({
        uid: user.uid,
        gym: gym.gym,
        onComplete: requests => {
          if (requests) {
            setRequest(requests);
          }
        },
        onFail: err => {},
      });
    }
  }, [refresh]);

  if (state === 'Criar treino') {
    return (
      <CreateTrainning setState={setState} setButtonTitle={setButtonTitle} />
    );
  }
  if (state === 'Visualizar') {
    return (
      <VisualStudents
        setState={setState}
        common={selectedCommon}
        mode={mode}
        setMode={setMode}
        setButtonTitle={setButtonTitle}
      />
    );
  }
  return (
    <StudentStyle
      contentContainerStyle={{
        flexGrow: 1,
        padding: 16,
        alignItems: 'center',
        width: '100%',
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
      <Header navigation={navigation} />
      {!!loading && (
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <ActivityIndicator size="large" color={Colors.red} />
        </View>
      )}
      {!loading && trainnings.length === 0 && (
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
          }}>
          <Space marginVertical={20} />
          {!!request && request.length !== 0 && (
            <CarouselWarnings data={request} />
          )}
          <Space marginVertical={20} />
          <Text
            title="Ops! Você não tem nenhum aluno."
            size={15}
            weight={500}
            color={Colors.textGrayLight}
            center
          />
          <Space marginVertical={20} />
          <View
            style={{
              width: '100%',
              alignItems: 'center',
              position: 'absolute',
              bottom: 8,
            }}>
            <Button
              background={Colors.red}
              title="Criar primeiro treino"
              size={14}
              weight={500}
              color={Colors.textColorWhite}
              onPress={() => {
                if (gym && gym.gym !== undefined) {
                  setState('Criar treino');
                } else {
                  showMessage({
                    type: 'danger',
                    message: 'Aviso',
                    description:
                      'Usuário precisa tá associado a uma academia para criar o treino',
                  });
                }
              }}
            />
          </View>
        </View>
      )}
      {!loading && trainnings.length !== 0 && (
        <>
          <Space marginVertical={20} />
          {!!request && request.length !== 0 && (
            <CarouselWarnings data={request} />
          )}
          <Space marginVertical={20} />
          <Card>
            <View style={{alignItems: 'flex-end'}}>
              <Text
                title={`Total: ${trainnings.length} alunos`}
                weight={500}
                size={12}
                color={Colors.grayMediumLight}
              />
            </View>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <View
                style={{
                  width: 28,
                  height: 28,
                  borderRadius: 14,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Image
                  source={{uri: profileGym.avatar}}
                  style={{
                    width: '100%',
                    height: '100%',
                    borderRadius: 9999,
                  }}
                />
              </View>
              <Space marginHorizontal={4} />
              <View>
                <Text
                  title={profileGym.name}
                  size={14}
                  weight={500}
                  color={Colors.textColorRX}
                />
              </View>
            </View>
            <Space marginVertical={5} />
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              {items.map((item, index) => (
                <TouchableOpacity
                  onPress={() => {
                    setButtonTitle(item.title);
                    if (item.title === 'Criar treino') {
                      setState(item.title);
                    } else {
                      setMode(item.title);
                    }
                  }}
                  key={item.title}
                  style={{
                    backgroundColor:
                      item.title === buttonTitle
                        ? Colors.redOpacity
                        : Colors.background,
                    marginRight: 8,
                    paddingHorizontal: 8,
                    paddingVertical: 3,
                    borderRadius: 8,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <Text
                    title={item.title}
                    size={12}
                    weight={500}
                    color={
                      item.title === buttonTitle ? Colors.red : Colors.gray
                    }
                  />
                </TouchableOpacity>
              ))}
            </View>
            <Space marginVertical={10} />
            {trainnings.map(trainning => {
              return (
                <View key={trainning.commonId}>
                  {commons
                    .filter(common => common.uid === trainning.commonId)
                    .map(common => {
                      return (
                        <View
                          key={common.name}
                          style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            marginBottom: 16,
                          }}>
                          <TouchableOpacity
                            style={{
                              flexDirection: 'row',
                              alignItems: 'center',
                            }}
                            onPress={() => {
                              setSelectedCommon(common);
                              setMode('');
                              setState('Visualizar');
                            }}>
                            <View
                              style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                              }}>
                              <View
                                style={{
                                  width: 28,
                                  height: 28,
                                  borderRadius: 14,
                                }}>
                                <Image
                                  source={{uri: common.avatar}}
                                  style={{
                                    width: '100%',
                                    height: '100%',
                                    borderRadius: 9999,
                                  }}
                                />
                              </View>
                              <Space marginHorizontal={4} />
                              <Text
                                title={common.name}
                                size={14}
                                weight={500}
                                color={Colors.textColorRX}
                              />
                            </View>
                            {moment(Date.now()).isAfter(
                              trainning.expiration,
                            ) && (
                              <View style={{width: 20, height: 20}}>
                                <WarningIcon width="100%" height="100%" />
                              </View>
                            )}
                          </TouchableOpacity>
                          {mode === 'Excluir' && (
                            <TouchableOpacity
                              style={{
                                alignItems: 'center',
                                justifyContent: 'center',
                                backgroundColor: Colors.lightRed2,
                                width: 32,
                                height: 32,
                                borderRadius: 16,
                              }}
                              onPress={() => {
                                handleDeleteTrainning(common.uid);
                                setTrainnings(
                                  trainnings.filter(
                                    trainning =>
                                      trainning.commonId !== common.uid,
                                  ),
                                );
                              }}>
                              <View style={{width: 18, height: 18}}>
                                <TrashIcon width="100%" height="100%" />
                              </View>
                            </TouchableOpacity>
                          )}
                          {mode === 'Editar' && (
                            <TouchableOpacity
                              style={{
                                alignItems: 'center',
                                justifyContent: 'center',
                                backgroundColor: Colors.backYellowLight,
                                width: 32,
                                height: 32,
                                borderRadius: 16,
                              }}
                              onPress={() => {
                                setSelectedCommon(common);
                                setState('Visualizar');
                              }}>
                              <View style={{width: 18, height: 18}}>
                                <EditIcon width="100%" height="100%" />
                              </View>
                            </TouchableOpacity>
                          )}
                        </View>
                      );
                    })}
                </View>
              );
            })}
            <Space marginVertical={8} />
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <View
                style={{
                  width: 15,
                  height: 15,
                }}>
                <WarningIcon width="100%" height="100%" />
              </View>
              <Space marginHorizontal={4} />
              <Text
                title="O treino do aluno já se expirou"
                size={12}
                weight={500}
                color={Colors.textGrayMedium}
              />
            </View>
          </Card>
          <Space marginVertical={20} />
        </>
      )}
    </StudentStyle>
  );
};

export default Students;
