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
import {BannerAd, BannerAdSize, TestIds} from '@react-native-admob/admob';
import {purchased} from 'payments';

const Students = ({navigation}: any) => {
  const user = useSelector((state: any) => state.auth.user);

  const {getUserCommonsTrainnerId} = useGetUser();
  const {getTrainningTrainner, getTrainningId} = useGetTrainning();
  const {getRequests} = useGetRequests();
  const [state, setState] = useState('');
  const [trainnings, setTrainnings] = useState<any[]>([]);
  const [commons, setCommons] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [purchase, setPurchase] = useState(false);
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

  const loadPurchase = async () => {
    const res = await purchased(user.planId);
    setPurchase(res);
  };

  useEffect(() => {
    loadPurchase();
  }, [purchase]);

  const deleteTrainning = (commonId: string) => {
    getTrainningId({
      uid: commonId,
      onComplete: (trainningId: any) => {
        if (trainningId) {
          firestore()
            .collection('trainnings')
            .doc(trainningId)
            .delete()
            .then(() => {
              showMessage({
                type: 'success',
                message: 'Sucesso',
                description: 'Treino do aluno excluído',
              });
              setCommons(commons.filter(common => common.uid !== commonId));
              firestore()
                .collection('trainningScores')
                .doc(trainningId)
                .delete();
            })
            .catch(err => {});
        } else {
          firestore()
            .collection('users')
            .doc(user.uid)
            .update({
              commons: commons.filter(common => {
                if (common.uid !== commonId) {
                  return common.uid;
                }
              }),
            })
            .then(() => {
              firestore()
                .collection('users')
                .doc(commonId)
                .update({trainnerAssociate: null});
              setCommons(commons.filter(common => common.uid !== commonId));
            });
        }
      },
      onFail: err => {},
    });
  };

  useEffect(() => {
    if (state === 'Criar treino') {
      setMode('');
    }
    getUserCommonsTrainnerId({
      uid: user.uid,
      onComplete: (common: any) => {
        if (common) {
          setCommons(common);
        }
      },
    });
    getRequests({
      uid: user.uid,
      onComplete: requests => {
        if (requests) {
          setRequest(requests);
        }
      },
      onFail: err => {},
    });
    getTrainningTrainner({
      uid: user.uid,
      onComplete: listTrainning => {
        if (listTrainning) {
          setTrainnings(listTrainning);
          setLoading(false);
        }
      },
      onFail: err => {},
    });
  }, [loading, refresh, state]);
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
    <>
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
          <View
            style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            <ActivityIndicator size="large" color={Colors.red} />
          </View>
        )}
        {!loading && commons.length === 0 && (
          <View
            style={{
              flex: 1,
              alignItems: 'center',
              justifyContent: request.length !== 0 ? 'flex-start' : 'center',
              width: '100%',
            }}>
            {request.length !== 0 && (
              <>
                <Space marginVertical={20} />
                <View style={{height: 120}}>
                  <CarouselWarnings data={request} />
                </View>
              </>
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
                title="Convidar primeiro aluno"
                size={14}
                weight={500}
                color={Colors.textColorWhite}
                onPress={() => {
                  navigation.navigate('Invites');
                }}
              />
            </View>
          </View>
        )}
        {!loading && commons.length !== 0 && (
          <>
            {request.length !== 0 && (
              <>
                <Space marginVertical={20} />
                <CarouselWarnings data={request} />
              </>
            )}

            <Space marginVertical={20} />
            <Card>
              <View style={{alignItems: 'flex-end'}}>
                <Text
                  title={`Total: ${commons.length} alunos`}
                  weight={500}
                  size={12}
                  color={Colors.grayMediumLight}
                />
              </View>

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
              {commons.map(common => {
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
                        justifyContent: 'space-between',
                        flex: 1,
                      }}
                      onPress={() => {
                        setSelectedCommon(common);
                        setMode('');
                        setState('Visualizar');
                      }}
                      disabled={
                        trainnings.length !== 0
                          ? trainnings.some(trainning => {
                              if (trainning.commonId === common.uid) {
                                return false;
                              }
                              return true;
                            })
                          : true
                      }>
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
                      {trainnings
                        .filter(trainning => common.uid === trainning.commonId)
                        .map(trainning => {
                          if (
                            moment(Date.now()).isAfter(
                              trainning.expiredTrainning.seconds * 1000,
                            )
                          ) {
                            return (
                              <View
                                style={{width: 20, height: 20}}
                                key={trainning.commonId}>
                                <WarningIcon width="100%" height="100%" />
                              </View>
                            );
                          }
                        })}
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
                        onPress={() => deleteTrainning(common.uid)}>
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
                        }}
                        disabled={
                          trainnings.length !== 0
                            ? trainnings.some(trainning => {
                                if (trainning.commonId === common.uid) {
                                  return false;
                                }
                                return true;
                              })
                            : true
                        }>
                        <View style={{width: 18, height: 18}}>
                          <EditIcon width="100%" height="100%" />
                        </View>
                      </TouchableOpacity>
                    )}
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
      {!!user && user.plan === 'basic' ? (
        <BannerAd
          size={BannerAdSize.FULL_BANNER}
          unitId="ca-app-pub-4288571417280592/8570033270"
        />
      ) : !purchase ? (
        <BannerAd
          size={BannerAdSize.FULL_BANNER}
          unitId="ca-app-pub-4288571417280592/8570033270"
        />
      ) : null}
    </>
  );
};

export default Students;
