import {
  Button,
  Card,
  InputNota,
  ModalInstruction,
  ModalVisualTrainning,
  ModalObservation,
  SimpleHeader,
  Space,
  Text,
} from 'components';
import React, {useEffect, useState} from 'react';

import KiloIcon from 'assets/svg/kiloIcon.svg';
import CalendarIcon from 'assets/svg/calendarIcon.svg';
import HeightIcon from 'assets/svg/heightIcon.svg';
import WeightSmallIcon from 'assets/svg/weightSmallIcon.svg';
import SerieIcon from 'assets/svg/repeatIcon.svg';
import RepeatIcon from 'assets/svg/repeatIcon2.svg';
import DurationIcon from 'assets/svg/durationIcon.svg';
import InstructionIcon from 'assets/svg/instructionIcon.svg';
import ExerciseIcon from 'assets/svg/weightIcon.svg';
import VerticalLine from 'assets/svg/verticalLine.svg';

import {
  ActivityIndicator,
  ScrollView,
  TouchableOpacity,
  View,
} from 'react-native';
import Colors from '@styles';
import {useGetCategories, useGetTrainning} from 'hooks';

import Clock from 'assets/svg/clockGray.svg';

import moment from 'moment';
import {firestore} from 'firebase';
import {showMessage} from 'react-native-flash-message';

interface VisualStudentsProps {
  mode: string;
  setState: any;
  setButtonTitle: any;
  setMode: any;
  common: any;
}

const VisualStudents = ({
  mode,
  setState,
  common,
  setButtonTitle,
  setMode,
}: VisualStudentsProps) => {
  const {getTrainningId, getTrainning} = useGetTrainning();
  const getCategories = useGetCategories();
  const [trainning, setTrainning] = useState<any>();
  const [visible, setVisible] = useState(false);
  const [instruct, setInstruct] = useState(false);
  const [observation, setObservation] = useState(false);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [categories, setCategories] = useState<any[]>([]);
  const [selectedExercise, setSelectedExercise] = useState<any>();
  const handleSelect = (index, value) => {
    setSelected(index);
    setSelectedCategory(value);
  };

  useEffect(() => {
    getTrainning({
      uid: common.uid,
      onComplete: trainningUser => {
        const list: any = [];

        if (trainningUser) {
          setTrainning(trainningUser);
          getCategories({
            onComplete: category => {
              if (category) {
                category.map(cat => {
                  trainningUser.categories.map(tr => {
                    if (tr.value === cat.value) {
                      list.push(cat);
                    }
                  });
                });
                setCategories(list);
                setSelectedCategory(list[0].value);
                setLoading(false);
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

  const verify = () => {
    const test = trainning.trainning.every(function (exercise) {
      if (
        exercise.type.weight === '' ||
        exercise.type.series === '' ||
        exercise.type.repeat === '' ||
        exercise.type.duration === ''
      ) {
        return false;
      } else {
        return true;
      }
    });
    return test;
  };
  const handleUpdate = () => {
    const verified = verify();
    if (verified) {
      getTrainningId({
        uid: common.uid,
        onComplete: trainningId => {
          if (trainningId) {
            firestore()
              .collection('trainnings')
              .doc(trainningId)
              .update(trainning)
              .then(res => {
                showMessage({
                  type: 'success',
                  message: 'Treino alterado com sucesso!',
                });
                setState('');
              })
              .catch(err => {});
          }
        },
        onFail: err => {},
      });
    } else {
      showMessage({
        type: 'warning',
        message: 'Campo vazio',
        description: 'Você precisa preencher todos os campos',
      });
    }
  };
  return (
    <ScrollView
      contentContainerStyle={{
        flexGrow: 1,
        padding: 16,
        alignItems: 'center',
        width: '100%',
        backgroundColor: Colors.background,
      }}
      showsVerticalScrollIndicator={false}>
      <ModalInstruction
        title="Criar instrução"
        visible={instruct}
        setVisible={setInstruct}
        exercises={selectedExercise}
        exerciseSelected={
          selectedExercise ? selectedExercise.instruction.selected : ''
        }
        instruct={selectedExercise ? selectedExercise.instruction.value : ''}
        onFunction={(instruction, desc, exerciseSelected) => {
          selectedExercise.instruction.value = instruction;
          selectedExercise.instruction.desc = desc;
          selectedExercise.instruction.selected = exerciseSelected;
        }}
      />
      <ModalObservation
        visible={observation}
        setVisible={setObservation}
        title={title}
        observation={desc}
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
      <SimpleHeader
        back
        onBack={() => {
          setMode('');
          setButtonTitle('Criar treino');
          setState('');
        }}
        title="Treino do Aluno"
        size={18}
        weight={600}
      />
      {!!loading && (
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <ActivityIndicator size="large" color={Colors.red} />
        </View>
      )}
      {!loading && !trainning && (
        <View>
          <Text
            title="Aluno ainda não tem um treino"
            size={15}
            weight={500}
            color={Colors.gray}
          />
        </View>
      )}
      {!loading && !!trainning && (
        <>
          <Space marginVertical={10} />
          <Card>
            <View>
              <Text
                title="Algumas informações do aluno"
                weight={600}
                size={14}
                color={Colors.inputColorText}
                center
              />
              <Space marginVertical={8} />
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-around',
              }}>
              <View>
                <ScrollView
                  style={{height: 100, width: '100%'}}
                  showsVerticalScrollIndicator={false}
                  nestedScrollEnabled={true}
                  contentContainerStyle={{paddingVertical: 2}}>
                  {!!common &&
                    Object.keys(common.problemHealth).map(problem => {
                      if (common.problemHealth[problem].value === true) {
                        return (
                          <View key={problem}>
                            <View
                              style={{
                                backgroundColor: Colors.blueMedium,
                                width: 80,
                                borderRadius: 8,
                                alignItems: 'center',
                                justifyContent: 'center',
                                padding: 2,
                              }}>
                              <Text
                                title={common.problemHealth[problem].title}
                                weight={600}
                                size={11}
                                color={Colors.inputColorText}
                              />
                            </View>
                            <Space marginVertical={4} />
                            <View
                              style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                              }}>
                              <Space marginHorizontal={5} />
                              {!!common.problemHealth[problem].desc && (
                                <View
                                  style={{
                                    width: 90,
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    borderRadius: 8,
                                    backgroundColor: Colors.blueLight,
                                    padding: 5,
                                  }}>
                                  <Text
                                    title={common.problemHealth[problem].desc}
                                    weight={600}
                                    size={10}
                                    color={Colors.inputColorText}
                                  />
                                </View>
                              )}
                            </View>
                            {!!common.problemHealth[problem].desc && (
                              <Space marginVertical={4} />
                            )}
                          </View>
                        );
                      }
                    })}
                </ScrollView>
              </View>
              <View>
                <VerticalLine />
              </View>
              <View>
                {!!common && (
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <View
                      style={{flexDirection: 'column', alignItems: 'center'}}>
                      <KiloIcon />
                      <Space marginVertical={2} />
                      <View
                        style={{
                          width: 45,
                          height: 45,
                          borderRadius: 15,
                          backgroundColor: Colors.blueMedium,
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}>
                        <Text
                          title={common.weight}
                          size={15}
                          weight={600}
                          color={Colors.inputColorText}
                        />
                      </View>
                    </View>
                    <Space marginHorizontal={2.5} />
                    <View
                      style={{flexDirection: 'column', alignItems: 'center'}}>
                      <CalendarIcon />
                      <Space marginVertical={2} />
                      <View
                        style={{
                          width: 45,
                          height: 45,
                          borderRadius: 15,
                          backgroundColor: Colors.blueLight,
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}>
                        <Text
                          title={common.age}
                          size={15}
                          weight={600}
                          color={Colors.inputColorText}
                        />
                      </View>
                    </View>
                    <Space marginHorizontal={2.5} />
                    <View
                      style={{flexDirection: 'column', alignItems: 'center'}}>
                      <HeightIcon />
                      <Space marginVertical={2} />
                      <View
                        style={{
                          width: 45,
                          height: 45,
                          borderRadius: 15,
                          backgroundColor: Colors.blueLight,
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}>
                        <Text
                          title={common.height}
                          size={15}
                          weight={600}
                          color={Colors.inputColorText}
                        />
                      </View>
                    </View>
                  </View>
                )}
              </View>
            </View>
          </Card>
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
                          />
                        </TouchableOpacity>
                        <View
                          style={{
                            width: 35,
                            alignItems: 'center',
                            justifyContent: 'center',
                            backgroundColor:
                              mode === 'Editar' ? '' : Colors.blueMedium,
                            borderRadius: 8,
                            paddingVertical: mode === 'Editar' ? 0 : 8,
                          }}>
                          {mode === 'Editar' ? (
                            <InputNota
                              background={Colors.blueMedium}
                              value={exercise.type.weight}
                              onText={e => (exercise.type.weight = e)}
                            />
                          ) : (
                            <Text
                              size={14}
                              title={exercise.type.weight}
                              weight={500}
                            />
                          )}
                        </View>
                        <Space marginHorizontal={2} />
                        <View
                          style={{
                            width: 35,
                            alignItems: 'center',
                            justifyContent: 'center',
                            backgroundColor:
                              mode === 'Editar' ? '' : Colors.blueLight,
                            borderRadius: 8,
                            paddingVertical: mode === 'Editar' ? 0 : 8,
                          }}>
                          {mode === 'Editar' ? (
                            <InputNota
                              background={Colors.blueLight}
                              value={exercise.type.series}
                              onText={e => (exercise.type.series = e)}
                            />
                          ) : (
                            <Text
                              size={14}
                              title={exercise.type.series}
                              weight={500}
                            />
                          )}
                        </View>
                        <Space marginHorizontal={2} />
                        <View
                          style={{
                            width: 35,
                            alignItems: 'center',
                            justifyContent: 'center',
                            backgroundColor:
                              mode === 'Editar' ? '' : Colors.blueLight,
                            borderRadius: 8,
                            paddingVertical: mode === 'Editar' ? 0 : 8,
                          }}>
                          {mode === 'Editar' ? (
                            <InputNota
                              background={Colors.blueLight}
                              value={exercise.type.repeat}
                              onText={e => (exercise.type.repeat = e)}
                            />
                          ) : (
                            <Text
                              size={14}
                              title={exercise.type.repeat}
                              weight={500}
                            />
                          )}
                        </View>
                        <Space marginHorizontal={2} />
                        <View
                          style={{
                            width: 35,
                            alignItems: 'center',
                            justifyContent: 'center',
                            backgroundColor:
                              mode === 'Editar' ? '' : Colors.blueLight,
                            borderRadius: 8,
                            paddingVertical: mode === 'Editar' ? 0 : 8,
                          }}>
                          {mode === 'Editar' ? (
                            <InputNota
                              background={Colors.blueLight}
                              value={exercise.type.duration}
                              onText={e => (exercise.type.duration = e)}
                            />
                          ) : (
                            <Text
                              size={14}
                              title={exercise.type.duration}
                              weight={500}
                            />
                          )}
                        </View>
                        <Space marginHorizontal={2} />
                        <TouchableOpacity
                          disabled={
                            exercise.instruction.value === 'BST' ||
                            exercise.instruction.value === 'OBS' ||
                            mode === 'Editar'
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
                                : mode === 'Editar'
                                ? Colors.lightGray
                                : Colors.background,
                            borderRadius: 8,
                          }}
                          onPress={() => {
                            if (mode === 'Editar') {
                              setSelectedExercise(exercise);
                              setInstruct(true);
                            } else if (
                              mode !== 'Editar' &&
                              exercise.instruction.value === 'BST'
                            ) {
                              setTitle('Exercício');
                              setDesc(exercise.instruction.selected);
                              setObservation(true);
                            } else if (
                              mode !== 'Editar' &&
                              exercise.instruction.value === 'OBS'
                            ) {
                              setTitle('Observação');
                              setDesc(exercise.instruction.desc);
                              setObservation(true);
                            }
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
                                  : mode === 'Editar'
                                  ? 'INS'
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
      {!loading && trainning.length === 0 && (
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <ExerciseIcon width="120px" height="120px" />
          <Space marginVertical={4} />
          <Text
            title="Opa! Você não tem um treino"
            size={15}
            weight={500}
            color={Colors.grayMediumLight}
            center
          />
        </View>
      )}
      {!loading && mode === 'Editar' && (
        <Button
          background={Colors.red}
          title="Salvar alterações"
          weight={500}
          size={14}
          color={Colors.textColorWhite}
          onPress={() => handleUpdate()}
        />
      )}
    </ScrollView>
  );
};

export default VisualStudents;
