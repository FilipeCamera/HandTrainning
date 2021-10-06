import React, {useState} from 'react';
import {Image, TouchableOpacity, View} from 'react-native';
import {CardCommonStyle} from './styles';

import Refresh from 'assets/svg/refresh.svg';
import RectangleRed from 'assets/svg/RectangleRed.svg';
import RectangleGray from 'assets/svg/RectangleGray.svg';
import Notify from 'assets/svg/Notify.svg';
import RunnerRed from 'assets/svg/RunnerRed.svg';
import Exercise from 'assets/svg/Exercise.svg';
import Star from 'assets/svg/stars.svg';
import Clock from 'assets/svg/clock.svg';

import {styles} from '../Board/styles';
import {useSelector} from 'react-redux';
import {ButtonText, Space, Text} from 'components';
import Colors from '@styles';

interface CardCommonProps {
  navigation: any;
  setVisible: any;
  setSend: any;
  setLoading: any;
}

const CardCommon = ({
  navigation,
  setVisible,
  setSend,
  setLoading,
}: CardCommonProps) => {
  const user = useSelector((state: any) => state.auth.user);
  const [trainning, setTrainning] = useState(false);

  return (
    <>
      {!!trainning && (
        <CardCommonStyle style={styles.shadow}>
          <RectangleRed width="100%" style={{position: 'absolute', top: -14}} />
          {user.sex === 'woman' && (
            <RunnerRed
              width="220px"
              height="290px"
              style={{position: 'absolute', right: 0, bottom: 60}}
            />
          )}
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'flex-end',
              paddingTop: 10,
              paddingHorizontal: 20,
            }}>
            <Text
              title="29d 12:25:59"
              weight={600}
              size={10}
              color={Colors.textColorWhite}
            />
            <Clock style={{marginLeft: 5}} />
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              paddingHorizontal: 16,
              marginBottom: 20,
            }}>
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'flex-start',
                width: 130,
              }}>
              <Text
                title="Seu Treino"
                size={30}
                weight={700}
                color={Colors.textColorWhite}
                style={{width: 130}}
              />
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Star />
              <Text
                title="9.5"
                size={12}
                weight={700}
                color={Colors.orange}
                style={{position: 'absolute', bottom: 10}}
              />
            </View>
          </View>
          {user.sex === 'woman' && (
            <View>
              <View style={{padding: 16}}>
                <Text
                  title="Treinador"
                  size={16}
                  weight={600}
                  color={Colors.textColorBlack}
                />
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginTop: 5,
                  }}>
                  <View style={{width: 50, height: 50, borderRadius: 25}}>
                    <Image
                      source={{
                        uri: 'https://images.unsplash.com/photo-1626806810916-f895a624c6f0?ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw0fHx8ZW58MHx8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
                      }}
                      style={{
                        width: '100%',
                        height: '100%',
                        borderRadius: 9999,
                      }}
                    />
                  </View>
                  <TouchableOpacity
                    style={{
                      marginLeft: 10,
                      backgroundColor: Colors.backgroundLight,
                      padding: 8,
                      borderRadius: 9999,
                    }}>
                    <Refresh width="18px" height="18px" />
                  </TouchableOpacity>
                </View>
                <View style={{marginTop: 16}}>
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Text
                      title="Nome:"
                      size={13}
                      weight={600}
                      color={Colors.textColorBlack}
                    />
                    <Space marginHorizontal={2.5} />
                    <Text
                      title={user.name}
                      size={13}
                      weight={500}
                      color={Colors.textColorBlack}
                    />
                  </View>
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Text
                      title="Formação:"
                      size={13}
                      weight={600}
                      color={Colors.textColorBlack}
                    />
                    <Space marginHorizontal={2.5} />
                    <Text
                      title={user.name}
                      size={13}
                      weight={500}
                      color={Colors.textColorBlack}
                    />
                  </View>
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Text
                      title="Experiência:"
                      size={13}
                      weight={600}
                      color={Colors.textColorBlack}
                    />
                    <Space marginHorizontal={2.5} />
                    <Text
                      title={user.name}
                      size={13}
                      weight={500}
                      color={Colors.textColorBlack}
                    />
                  </View>
                </View>
              </View>
            </View>
          )}
          {user.sex === 'man' && (
            <>
              <View style={{padding: 16, marginTop: 20}}>
                <Text
                  title="Treinador"
                  size={16}
                  weight={600}
                  color={Colors.textColorBlack}
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
                      marginTop: 5,
                    }}>
                    <View style={{width: 60, height: 60, borderRadius: 30}}>
                      <Image
                        source={{
                          uri: 'https://images.unsplash.com/photo-1626806810916-f895a624c6f0?ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw0fHx8ZW58MHx8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
                        }}
                        style={{
                          width: '100%',
                          height: '100%',
                          borderRadius: 9999,
                        }}
                      />
                    </View>
                    <TouchableOpacity
                      style={{
                        marginLeft: 10,
                        backgroundColor: Colors.backgroundLight,
                        padding: 8,
                        borderRadius: 9999,
                      }}>
                      <Refresh width="18px" height="18px" />
                    </TouchableOpacity>
                  </View>
                  <View style={{marginTop: 16}}>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                      <Text
                        title="Nome:"
                        size={13}
                        weight={600}
                        color={Colors.textColorBlack}
                      />
                      <Space marginHorizontal={2.5} />
                      <Text
                        title={user.name}
                        size={13}
                        weight={500}
                        color={Colors.textColorBlack}
                      />
                    </View>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                      <Text
                        title="Formação:"
                        size={13}
                        weight={600}
                        color={Colors.textColorBlack}
                      />
                      <Space marginHorizontal={2.5} />
                      <Text
                        title={user.name}
                        size={13}
                        weight={500}
                        color={Colors.textColorBlack}
                      />
                    </View>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                      <Text
                        title="Experiência:"
                        size={13}
                        weight={600}
                        color={Colors.textColorBlack}
                      />
                      <Space marginHorizontal={2.5} />
                      <Text
                        title={user.name}
                        size={13}
                        weight={500}
                        color={Colors.textColorBlack}
                      />
                    </View>
                  </View>
                </View>
              </View>
            </>
          )}
          {user.sex === 'man' && <Exercise style={{alignSelf: 'center'}} />}
          <View
            style={{
              position: 'absolute',
              bottom: 10,
              alignSelf: 'center',
            }}>
            <ButtonText
              title="Visualizar treino"
              size={14}
              weight={500}
              color={Colors.red}
              onPress={() => navigation.navigate('Trainning')}
            />
          </View>
        </CardCommonStyle>
      )}
      {!trainning && (
        <CardCommonStyle style={styles.shadow}>
          <RectangleGray
            width="100%"
            style={{position: 'absolute', top: -14}}
          />
          <View
            style={{
              padding: 16,
              alignItems: 'flex-start',
              justifyContent: 'center',
              marginBottom: 30,
            }}>
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'flex-start',
                width: 130,
              }}>
              <Text
                title="Seu Treino"
                size={30}
                weight={700}
                color={Colors.textColorWhite}
                style={{width: 130}}
              />
            </View>
          </View>
          <View
            style={{
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              padding: 16,
              marginTop: 20,
            }}>
            <Text
              title="Você não possui um treino"
              weight={600}
              size={15}
              color={Colors.gray}
            />
            <Notify style={{marginVertical: 40}} />
          </View>
          <View style={{position: 'absolute', bottom: 10, alignSelf: 'center'}}>
            <ButtonText
              title="Solicitar novo treino"
              size={14}
              weight={500}
              color={Colors.red}
              onPress={() => {
                setVisible(true);
                setLoading(false);
                setSend(false);
              }}
            />
          </View>
        </CardCommonStyle>
      )}
    </>
  );
};

export default CardCommon;
