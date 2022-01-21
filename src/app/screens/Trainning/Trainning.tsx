import {
  Card,
  Header,
  Modal,
  ModalObservation,
  ModalScore,
  ModalVisualTrainning,
  Space,
  Text,
} from 'components';
import React, {useEffect, useState} from 'react';
import {TrainningStyle} from './styles';

import WeightSmallIcon from 'assets/svg/weightSmallIcon.svg';
import SerieIcon from 'assets/svg/repeatIcon.svg';
import RepeatIcon from 'assets/svg/repeatIcon2.svg';
import DurationIcon from 'assets/svg/durationIcon.svg';
import InstructionIcon from 'assets/svg/instructionIcon.svg';
import StarOutlineIcon from 'assets/svg/starOutline.svg';
import ExerciseIcon from 'assets/svg/weightIcon.svg';
import Refresh from 'assets/svg/refresh.svg';

import {
  ActivityIndicator,
  Image,
  ScrollView,
  TouchableOpacity,
  View,
} from 'react-native';
import Colors from '@styles';
import {useGetScore, useGetTrainning, useGetUser} from 'hooks';
import {useSelector} from 'react-redux';

import Clock from 'assets/svg/clockGray.svg';

import moment from 'moment';
import {firestore} from 'firebase';
import {showMessage} from 'react-native-flash-message';
import {BannerAd, BannerAdSize, TestIds} from '@react-native-admob/admob';

const Trainning = ({navigation}: any) => {
  const user = useSelector((state: any) => state.auth.user);
  const {getTrainning, getTrainningId} = useGetTrainning();
  const {getUser} = useGetUser();
  const {getScore} = useGetScore();
  const [visible, setVisible] = useState(false);
  const [scoreVisible, setScoreVisible] = useState(false);
  const [visibleSelect, setVisibleSelect] = useState(false);
  const [trainning, setTrainning] = useState<any>();
  const [loading, setLoading] = useState(true);
  const [trainner, setTrainner] = useState<any>();
  const [selected, setSelected] = useState(0);
  const [selectedExercise, setSelectedExercise] = useState<any>();
  const [selectedCategory, setSelectedCategory] = useState('');
  const [score, setScore] = useState<any>();
  const [trainningId, setTrainningId] = useState('');
  const [categories, setCategories] = useState<any[]>([]);
  const [send, setSend] = useState(false);
  const [scoreValue, setScoreValue] = useState('');
  const [visibleObs, setVisibleObs] = useState(false);
  const [title, setTitle] = useState('Observação');
  const [observation, setObservation] = useState('');

  const handleSelect = (index, value) => {
    setSelected(index);
    setSelectedCategory(value);
  };

  const handleScore = () => {
    if (scoreValue === '') {
      return showMessage({
        type: 'warning',
        message: 'Aviso',
        description: 'Você não colocou uma nota válida.',
      });
    }
    const data = {
      trainnerId: trainner.uid,
      score: scoreValue,
      createdAt: firestore.FieldValue.serverTimestamp(),
    };
    const updatedData = {
      trainnerId: trainner.uid,
      score: scoreValue,
      updatedAt: firestore.FieldValue.serverTimestamp(),
    };
    if (score) {
      firestore()
        .collection('trainningScores')
        .doc(trainningId)
        .update(updatedData)
        .then(res => {
          setScoreVisible(false);
          showMessage({
            type: 'success',
            message: 'Sucesso!',
            description: 'Muito obrigado por avaliar seu treino.',
          });
        })
        .catch(err => {});
    } else {
      firestore()
        .collection('trainningScores')
        .doc(trainningId)
        .set(data)
        .then(res => {
          setScoreVisible(false);
          showMessage({
            type: 'success',
            message: 'Sucesso!',
            description: 'Muito obrigado por avaliar seu treino.',
          });
        })
        .catch(err => {});
    }
  };
  useEffect(() => {
    getTrainning({
      uid: user.uid,
      onComplete: (trainningUser: any) => {
        const list: any = [];
        if (trainningUser) {
          setTrainning(trainningUser);
          setCategories(trainningUser.categories);
          setSelectedCategory(trainningUser.categories[0].value);
          getUser({
            uid: trainningUser.trainnerId,
            onComplete: (users: any) => {
              if (users) {
                setTrainner(users);
                setLoading(false);
              }
            },
            onFail: err => {},
          });
          getTrainningId({
            uid: user.uid,
            onComplete: id => {
              if (id) {
                setTrainningId(id);
              }
            },
            onFail: err => {},
          });
        } else {
          setLoading(false);
        }
      },
      onFail: err => {},
    });
  }, []);
  useEffect(() => {
    if (user.trainnerAssociate) {
      getScore({
        uid: trainningId,
        onComplete: scores => {
          if (scores) {
            setScore(scores);
          }
        },
        onFail: err => {},
      });
    }
    return function cleanup() {
      setTrainningId('');
    };
  }, []);

  const handleRequestTrainner = (description: any) => {
    setLoading(!loading);
    const data = {
      commonId: user.uid,
      trainnerId: trainner.uid,
      title: 'Novo treino',
      desc: `${user.name} solicitou um novo treino`,
      preference: description,
      createdAt: firestore.FieldValue.serverTimestamp(),
    };

    firestore()
      .collection('requests')
      .doc()
      .set(data)
      .then(res => {
        setLoading(false);
        setSend(!send);
      })
      .catch(err => {});
  };

  return (
    <TrainningStyle
      contentContainerStyle={{
        flexGrow: 1,
        padding: 16,
        alignItems: 'center',
        width: '100%',
      }}
      showsVerticalScrollIndicator={false}>
      <Header navigation={navigation} />
      <Modal
        visible={visibleSelect}
        setVisible={setVisibleSelect}
        trainner={trainner}
        loading={loading}
        send={send}
        title="Escolha um novo treinador"
        onFunction={(e: string | any) => handleRequestTrainner(e)}
      />
      <ModalObservation
        visible={visibleObs}
        setVisible={setVisibleObs}
        title={title}
        observation={observation}
      />
      <ModalScore
        visible={scoreVisible}
        setVisible={setScoreVisible}
        value={scoreValue}
        setValue={setScoreValue}
        onFunction={handleScore}
        title="Avaliação do seu treino"
        desc="Sua nota vai ser muito importante para a pontuação do treinador"
      />
      <ModalVisualTrainning
        visible={visible}
        setVisible={setVisible}
        title={selectedExercise ? selectedExercise.name : ''}
        image={selectedExercise ? selectedExercise.url : ''}
        imageTwo={
          selectedExercise
            ? selectedExercise.urlTwo
              ? selectedExercise.urlTwo
              : ''
            : ''
        }
      />
      {!!loading && (
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <ActivityIndicator size="large" color={Colors.red} />
        </View>
      )}
      {!loading && !!trainning && (
        <>
          <Space marginVertical={20} />
          <Card>
            {!!trainning && (
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'flex-end',
                }}>
                <Text
                  title={`${moment
                    .unix(trainning.expiredTrainning.seconds)
                    .format('[Expira em] DD [de] MMM [de] YYYY')}`}
                  weight={600}
                  size={11}
                  color={Colors.textGrayLight}
                />
                <Clock style={{marginLeft: 5}} />
              </View>
            )}
            <Space marginVertical={5} />
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <View style={{width: 30, height: 30, borderRadius: 15}}>
                <Image
                  source={{uri: trainner.avatar}}
                  style={{height: '100%', width: '100%', borderRadius: 9999}}
                />
              </View>
              <Space marginHorizontal={4} />
              <Text
                title={trainner.name}
                size={14}
                weight={500}
                color={Colors.inputColorText}
              />
              <Space marginHorizontal={12} />
              <TouchableOpacity onPress={() => setScoreVisible(true)}>
                <StarOutlineIcon />
              </TouchableOpacity>
              <Space marginHorizontal={4} />
              <TouchableOpacity
                style={{
                  backgroundColor: Colors.backgroundLight,
                  padding: 8,
                  borderRadius: 9999,
                }}
                onPress={() => setVisibleSelect(true)}>
                <Refresh width="14px" height="14px" />
              </TouchableOpacity>
            </View>
            <Space marginVertical={5} />
            {!!categories && (
              <ScrollView
                horizontal={true}
                showsHorizontalScrollIndicator={false}>
                {categories.length !== 0 &&
                  categories.map((category, index) => {
                    return (
                      <TouchableOpacity
                        key={category.label}
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                          justifyContent: 'center',
                          backgroundColor:
                            index === selected
                              ? Colors.lightRed2
                              : Colors.background,
                          borderRadius: 5,
                          paddingVertical: 2,
                          paddingHorizontal: 8,
                          marginRight: 8,
                        }}
                        onPress={() => handleSelect(index, category.value)}>
                        <Text
                          title={category.label}
                          size={14}
                          weight={500}
                          color={index === selected ? Colors.red : Colors.gray}
                        />
                      </TouchableOpacity>
                    );
                  })}
              </ScrollView>
            )}
            <Space marginVertical={8} />
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <View style={{flex: 1}}>
                <View style={{height: 20}} />
              </View>
              <View
                style={{
                  width: 35,
                  alignItems: 'center',
                }}>
                <WeightSmallIcon />
                <Space marginVertical={2} />
              </View>
              <Space marginHorizontal={2} />
              <View style={{width: 35, alignItems: 'center'}}>
                <SerieIcon />
                <Space marginVertical={2} />
              </View>
              <Space marginHorizontal={2} />
              <View style={{width: 35, alignItems: 'center'}}>
                <RepeatIcon />
                <Space marginVertical={2} />
              </View>
              <Space marginHorizontal={2} />
              <View style={{width: 35, alignItems: 'center'}}>
                <DurationIcon />
                <Space marginVertical={2} />
              </View>
              <Space marginHorizontal={2} />
              <View style={{width: 35, alignItems: 'center'}}>
                <InstructionIcon />
                <Space marginVertical={2} />
              </View>
            </View>
            <View style={{flexDirection: 'column', alignItems: 'flex-start'}}>
              {!!trainning &&
                trainning.trainning.length !== 0 &&
                trainning.trainning.map(exercise => {
                  if (exercise.category === selectedCategory) {
                    return (
                      <View
                        key={exercise.name}
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                          justifyContent: 'center',
                          marginBottom: 8,
                        }}>
                        <TouchableOpacity
                          style={{flex: 1}}
                          onPress={() => {
                            setSelectedExercise(exercise);
                            setVisible(true);
                          }}>
                          <Text
                            title={exercise.name}
                            size={14}
                            weight={500}
                            color={Colors.inputColorText}
                            numberOfLines={2}
                            ellipsizeMode="tail"
                          />
                        </TouchableOpacity>
                        <View
                          style={{
                            width: 35,
                            alignItems: 'center',
                            justifyContent: 'center',
                            backgroundColor: Colors.blueMedium,
                            borderRadius: 8,
                            paddingVertical: 8,
                          }}>
                          <Text
                            size={14}
                            title={exercise.type.weight}
                            weight={500}
                          />
                        </View>
                        <Space marginHorizontal={2} />
                        <View
                          style={{
                            width: 35,
                            alignItems: 'center',
                            justifyContent: 'center',
                            backgroundColor: Colors.blueLight,
                            borderRadius: 8,
                            paddingVertical: 8,
                          }}>
                          <Text
                            size={14}
                            title={exercise.type.series}
                            weight={500}
                          />
                        </View>
                        <Space marginHorizontal={2} />
                        <View
                          style={{
                            width: 35,
                            alignItems: 'center',
                            justifyContent: 'center',
                            backgroundColor: Colors.blueLight,
                            borderRadius: 8,
                            paddingVertical: 8,
                          }}>
                          <Text
                            size={14}
                            title={exercise.type.repeat}
                            weight={500}
                          />
                        </View>
                        <Space marginHorizontal={2} />
                        <View
                          style={{
                            width: 35,
                            alignItems: 'center',
                            justifyContent: 'center',
                            backgroundColor: Colors.blueLight,
                            borderRadius: 8,
                            paddingVertical: 8,
                          }}>
                          <Text
                            size={14}
                            title={exercise.type.duration}
                            weight={500}
                          />
                        </View>
                        <Space marginHorizontal={2} />
                        <TouchableOpacity
                          onPress={() => {
                            if (exercise.instruction.value === 'BST') {
                              setTitle('Exercício');
                              setObservation(exercise.instruction.selected);
                              setVisibleObs(true);
                            } else {
                              setTitle('Observação');
                              setObservation(exercise.instruction.desc);
                              setVisibleObs(true);
                            }
                          }}
                          disabled={
                            exercise.instruction.value === 'BST' ||
                            exercise.instruction.value === 'OBS'
                              ? false
                              : true
                          }
                          style={{
                            width: 35,
                            alignItems: 'center',
                            justifyContent: 'center',
                            backgroundColor:
                              exercise.instruction.value === 'DRP'
                                ? Colors.grayLight
                                : exercise.instruction.value === 'PIR'
                                ? Colors.greenLight
                                : exercise.instruction.value === 'BST'
                                ? Colors.lightRed
                                : exercise.instruction.value === 'OBS'
                                ? Colors.backYellowLight
                                : exercise.instruction.value === 'MIN'
                                ? Colors.colorBackRgba
                                : exercise.instruction.value === 'ADP'
                                ? Colors.lightOrange
                                : Colors.background,
                            borderRadius: 8,
                          }}>
                          <View
                            style={{
                              borderRadius: 8,
                              paddingVertical: 8,
                              justifyContent: 'center',
                              alignItems: 'center',
                            }}>
                            <Text
                              title={
                                exercise.instruction.value !== ''
                                  ? exercise.instruction.value
                                  : ''
                              }
                              size={13}
                              weight={600}
                              color={
                                exercise.instruction.value === 'DRP'
                                  ? Colors.textGrayMedium
                                  : exercise.instruction.value === 'PIR'
                                  ? Colors.green
                                  : exercise.instruction.value === 'BST'
                                  ? Colors.redDark
                                  : exercise.instruction.value === 'OBS'
                                  ? Colors.textYellow
                                  : exercise.instruction.value === 'MIN'
                                  ? Colors.textColorRXC
                                  : exercise.instruction.value === 'ADP'
                                  ? Colors.orange
                                  : Colors.inputColorText
                              }
                            />
                          </View>
                        </TouchableOpacity>
                      </View>
                    );
                  }
                })}
            </View>
          </Card>
          <Space marginVertical={20} />
          <Card>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-around',
              }}>
              <View
                style={{
                  width: 45,
                  height: 25,
                  borderRadius: 8,
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: Colors.lightRed,
                }}>
                <Text
                  title="BST"
                  weight={600}
                  color={Colors.redDark}
                  size={14}
                />
              </View>
              <View style={{width: '80%'}}>
                <Text
                  title="Realização de dois exercícios sem descanso entre eles para o mesmo músculo"
                  weight={500}
                  color={Colors.inputColorText}
                  size={14}
                />
              </View>
            </View>
            <Space marginVertical={8} />
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-around',
              }}>
              <View
                style={{
                  width: 45,
                  height: 25,
                  borderRadius: 8,
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: Colors.greenLight,
                }}>
                <Text title="PIR" weight={600} color={Colors.green} size={14} />
              </View>
              <View style={{width: '80%'}}>
                <Text
                  title="Realizar exercício com o peso mais baixo e ir aumentando a cada série, reduzindo o número de repetições. (Pode ser feito o contrário)"
                  weight={500}
                  color={Colors.inputColorText}
                  size={14}
                />
              </View>
            </View>
            <Space marginVertical={8} />
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-around',
              }}>
              <View
                style={{
                  width: 45,
                  height: 25,
                  borderRadius: 8,
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: Colors.grayLight,
                }}>
                <Text
                  title="DRP"
                  weight={600}
                  color={Colors.textGrayMedium}
                  size={14}
                />
              </View>
              <View style={{width: '80%'}}>
                <Text
                  title="Realizar o número de repetições no seu limite de esforço e ir diminuindo o peso"
                  weight={500}
                  color={Colors.inputColorText}
                  size={14}
                />
              </View>
            </View>
            <Space marginVertical={8} />

            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-around',
              }}>
              <View
                style={{
                  backgroundColor: Colors.backYellowLight,
                  width: 45,
                  height: 25,
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: 8,
                }}>
                <Text
                  title="OBS"
                  weight={600}
                  color={Colors.textYellow}
                  size={14}
                />
              </View>
              <View style={{width: '80%'}}>
                <Text
                  title="Exercício possui uma observação"
                  weight={500}
                  color={Colors.inputColorText}
                  size={14}
                />
              </View>
            </View>
            <Space marginVertical={8} />
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-around',
              }}>
              <View
                style={{
                  width: 45,
                  height: 25,
                  borderRadius: 8,
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: Colors.colorBackRgba,
                }}>
                <Text
                  title="MIN"
                  weight={600}
                  color={Colors.textColorRXC}
                  size={14}
                />
              </View>
              <View style={{width: '80%'}}>
                <Text
                  title="A contagem do descanco é por minuto"
                  weight={500}
                  color={Colors.inputColorText}
                  size={14}
                />
              </View>
            </View>
            <Space marginVertical={8} />
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-around',
              }}>
              <View
                style={{
                  width: 45,
                  height: 25,
                  borderRadius: 8,
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: Colors.lightOrange,
                }}>
                <Text
                  title="ADP"
                  weight={600}
                  color={Colors.orange}
                  size={14}
                />
              </View>
              <View style={{width: '80%'}}>
                <Text
                  title="O exercício pode adaptar o peso de acordo com seu ritmo"
                  weight={500}
                  color={Colors.inputColorText}
                  size={14}
                />
              </View>
            </View>
          </Card>
          <Space marginVertical={16} />
        </>
      )}
      {!loading && !trainning && (
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <ExerciseIcon width="120px" height="120px" />
          <Space marginVertical={4} />
          <Text
            title="Ops! Você não tem um treino"
            size={15}
            weight={500}
            color={Colors.grayMediumLight}
            center
          />
        </View>
      )}
      {!!user && user.plan === 'basic' && (
        <>
          <BannerAd size={BannerAdSize.FULL_BANNER} unitId={TestIds.BANNER} />
        </>
      )}
    </TrainningStyle>
  );
};

export default Trainning;
