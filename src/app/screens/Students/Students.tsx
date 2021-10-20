import Colors from '@styles';
import {Card, CarouselWarnings, Header, Space, Text} from 'components';
import {firestore} from 'firebase';
import React, {useEffect, useState} from 'react';
import {ActivityIndicator, Image, TouchableOpacity, View} from 'react-native';
import {useSelector} from 'react-redux';
import CreateTrainning from './CreateTrainning';
import {StudentStyle} from './styles';

import WarningIcon from 'assets/svg/warningIcon.svg';
import moment from 'moment';
import {useGetRequests, useGetTrainning, useGetUser} from 'hooks';

const Students = ({navigation}: any) => {
  const user = useSelector((state: any) => state.auth.user);
  const gym = useSelector((state: any) => state.trainner.gym);

  const getRequests = useGetRequests();
  const {getUserTypeAndAssociate, getUser} = useGetUser();
  const {getTrainningTrainner} = useGetTrainning();

  const [state, setState] = useState('');
  const [trainnings, setTrainnings] = useState<any[]>([]);
  const [commons, setCommons] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [profileGym, setProfileGym] = useState<any>();
  const [buttonTitle, setButtonTitle] = useState('Criar treino');
  const [request, setRequest] = useState<any[]>([]);
  const [mode, setMode] = useState('');
  const items = [
    {title: 'Criar treino'},
    {title: 'Excluir'},
    {title: 'Editar'},
  ];

  useEffect(() => {
    if (state !== '') {
      setLoading(true);
    } else {
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
        onComplete: trainning => {
          if (trainning) {
            setTrainnings(trainning);
            setLoading(false);
          }
        },
        onFail: err => {},
      });
    }
  }, [state]);

  useEffect(() => {
    getRequests({
      uid: user.uid,
      onComplete: requests => {
        if (requests) {
          setRequest(requests);
        }
      },
      onFail: err => {},
    });
  }, []);

  if (state === 'Criar treino') {
    return <CreateTrainning setState={setState} />;
  }
  return (
    <StudentStyle
      contentContainerStyle={{
        flexGrow: 1,
        padding: 16,
        alignItems: 'center',
        width: '100%',
      }}
      showsVerticalScrollIndicator={false}>
      <Header navigation={navigation} />
      {!!loading && (
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <ActivityIndicator size="large" color={Colors.red} />
        </View>
      )}
      {!loading && (
        <>
          <Space marginVertical={20} />
          {!!request && request.length !== 0 && (
            <CarouselWarnings data={request} />
          )}
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
                        <TouchableOpacity
                          key={common.name}
                          style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            marginBottom: 16,
                          }}>
                          <View
                            style={{
                              flexDirection: 'row',
                              alignItems: 'center',
                            }}>
                            <View
                              style={{width: 28, height: 28, borderRadius: 14}}>
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
                          {moment(Date.now()).isAfter(trainning.expiration) && (
                            <View style={{width: 20, height: 20}}>
                              <WarningIcon width="100%" height="100%" />
                            </View>
                          )}
                        </TouchableOpacity>
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
