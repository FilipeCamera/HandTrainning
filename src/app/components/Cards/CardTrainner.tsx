import React, {useEffect, useState} from 'react';

import RectangleRed from 'assets/svg/RectangleRed.svg';
import Star from 'assets/svg/stars.svg';
import TrainnerActivity from 'assets/svg/trainner_activity.svg';
import {CardTrainnerStyle, styles} from './styles';
import {ActivityIndicator, Image, View} from 'react-native';
import {ButtonText, Space, Text} from 'components';
import Colors from '@styles';
import {firestore} from 'firebase';
import {useSelector} from 'react-redux';

const CardTrainner = ({navigation}: any) => {
  const user = useSelector((state: any) => state.auth.user);
  const [trainnings, setTrainnings] = useState(0);
  const [requests, setRequests] = useState(0);
  const [score, setScore] = useState('');
  const [commons, setCommons] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    firestore()
      .collection('trainnings')
      .where('trainnerId', '==', user.uid)
      .get()
      .then(querySnapshot => {
        const list = querySnapshot.docs.map(doc => doc.data());
        setTrainnings(list.length);
      })
      .catch(err => {});
    firestore()
      .collection('requests')
      .where('trainnerId', '==', user.uid)
      .get()
      .then(querySnapshot => {
        setRequests(querySnapshot.docs.length);
      })
      .catch(err => {});
  }, []);

  useEffect(() => {
    firestore()
      .collection('users')
      .where('type', '==', 'common')
      .get()
      .then(querySnap => {
        const list = querySnap.docs.map(doc => doc.data());
        firestore()
          .collection('trainnings')
          .where('trainnerId', '==', user.uid)
          .get()
          .then(querySnapshot => {
            const common: any = [];
            const trainning = querySnapshot.docs.map(doc => doc.data());
            list.map(l => {
              trainning.map(t => {
                if (t.commonId === l.uid) {
                  common.push(l);
                }
              });
            });
            setCommons(common);
            setLoading(false);
          })
          .catch(err => {});
      })
      .catch(err => {});
  }, []);
  return (
    <CardTrainnerStyle style={styles.shadow}>
      <RectangleRed width="100%" style={{position: 'absolute', top: -14}} />
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: 16,
          marginBottom: 20,
        }}>
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'flex-start',
            width: 130,
          }}>
          <Text
            title="Seus Alunos"
            size={30}
            weight={700}
            color={Colors.textColorWhite}
            style={{width: 130}}
          />
        </View>
        {score !== '' && (
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Star />
            <Text
              title={score}
              size={12}
              weight={700}
              color={Colors.orange}
              style={{position: 'absolute', bottom: 10}}
            />
          </View>
        )}
      </View>
      {!!loading && (
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <ActivityIndicator size="large" color={Colors.red} />
        </View>
      )}
      {!loading && (
        <>
          <Space marginVertical={6} />
          <View style={{padding: 16}}>
            <Text
              title="Alunos"
              size={16}
              weight={600}
              color={Colors.textColorRX}
            />
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  flex: 1,
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'flex-start',
                    flex: 1,
                  }}>
                  {commons.map((common, index) => {
                    console.log(common);
                    if (index <= 3) {
                      return (
                        <View
                          key={common.uid}
                          style={{
                            width: 40,
                            height: 40,
                            borderRadius: 20,
                            borderWidth: 2,
                            borderColor: Colors.background,
                            marginLeft: index !== 0 ? -20 : 0,
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
                      );
                    }
                  })}
                  <Space marginHorizontal={2} />
                  {commons.length > 3 && (
                    <Text
                      title={`+${commons.length - 3}`}
                      size={12}
                      weight={500}
                      color={Colors.redMedium}
                    />
                  )}
                </View>
              </View>
              <View>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Text
                    title="Total:"
                    size={14}
                    weight={600}
                    color={Colors.textColorRX}
                  />
                  <Space marginHorizontal={2.5} />
                  <Text
                    title={`${trainnings} ${
                      trainnings > 1 ? 'alunos' : 'aluno'
                    }`}
                    size={14}
                    weight={500}
                    color={Colors.textColorRX}
                  />
                </View>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Text
                    title="Novo treino:"
                    size={14}
                    weight={600}
                    color={Colors.textColorRX}
                  />
                  <Space marginHorizontal={2.5} />
                  <Text
                    title={`${
                      requests > 1
                        ? `${requests} solicitações`
                        : `${requests} solicitação`
                    }`}
                    size={14}
                    weight={500}
                    color={Colors.textColorRX}
                  />
                </View>
              </View>
            </View>
          </View>
          <TrainnerActivity
            style={{alignSelf: 'center', marginTop: 10}}
            width="95%"
          />
          <View
            style={{
              position: 'absolute',
              bottom: 0,
              alignSelf: 'center',
              marginVertical: 8,
            }}>
            <ButtonText
              title="Visualizar"
              size={12}
              weight={500}
              color={Colors.red}
              onPress={() => navigation.navigate('Commons')}
            />
          </View>
        </>
      )}
    </CardTrainnerStyle>
  );
};

export default CardTrainner;
