import Colors from '@styles';
import {
  Button,
  Card,
  InputNota,
  ModalCreateTrainning,
  ModalInstruction,
  SimpleHeader,
  Space,
  Text,
} from 'components';
import {firestore} from 'firebase';
import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Image,
  ScrollView,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

import KiloIcon from 'assets/svg/kiloIcon.svg';
import CalendarIcon from 'assets/svg/calendarIcon.svg';
import HeightIcon from 'assets/svg/heightIcon.svg';
import WeightSmallIcon from 'assets/svg/weightSmallIcon.svg';
import SerieIcon from 'assets/svg/repeatIcon.svg';
import RepeatIcon from 'assets/svg/repeatIcon2.svg';
import DurationIcon from 'assets/svg/durationIcon.svg';
import InstructionIcon from 'assets/svg/instructionIcon.svg';
import VerticalLine from 'assets/svg/verticalLine.svg';
import {showMessage} from 'react-native-flash-message';
import {useSelector} from 'react-redux';

interface StepProps {
  categorySelected: any[];
  exercisesSelected: any[];
  setExercisesSelected: any;
  setTrainningStep: any;
  commonId: string;
  setSend: any;
}

const Step2 = ({
  categorySelected,
  setTrainningStep,
  commonId,
  exercisesSelected,
  setSend,
}: StepProps) => {
  const user = useSelector((state: any) => state.auth.user);
  const [student, setStudent] = useState<any>();
  const [category, setCategory] = useState<any[]>(categorySelected);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [visible, setVisible] = useState(false);
  const [createTrainning, setCreateTrainning] = useState(false);
  const [exercise, setExercise] = useState<any>();

  useEffect(() => {
    firestore()
      .collection('users')
      .doc(commonId)
      .get()
      .then(querySnapshot => {
        setStudent(querySnapshot.data());
        setLoading(false);
      })
      .catch(err => {});

    setSelectedCategory(category[0].value);
  }, []);

  const handleSelect = (index, value) => {
    setSelected(index);
    setSelectedCategory(value);
  };

  const verify = () => {
    const test = exercisesSelected.every(function (exercise) {
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
      <ModalCreateTrainning
        title="Finalizando treino"
        visible={createTrainning}
        setVisible={setCreateTrainning}
        commonId={commonId}
        trainnerId={user.uid}
        setSend={setSend}
        exercisesSelected={exercisesSelected}
      />
      <ModalInstruction
        title="Criar instrução"
        visible={visible}
        setVisible={setVisible}
        instruct={exercise ? exercise.instruction.value : ''}
        onFunction={(instruction, desc) => {
          exercise.instruction.value = instruction;
          exercise.instruction.desc = desc;
        }}
      />
      <SimpleHeader
        title="Criar treino"
        back
        size={18}
        weight={500}
        color={Colors.textColorBlack}
        onBack={() => setTrainningStep('step1')}
      />
      {!!loading && (
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <ActivityIndicator size="large" color={Colors.red} />
        </View>
      )}
      {!loading && (
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
                  {!!student &&
                    Object.keys(student.problemHealth).map(problem => {
                      if (student.problemHealth[problem].value === true) {
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
                                title={student.problemHealth[problem].title}
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
                              {!!student.problemHealth[problem].desc && (
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
                                    title={student.problemHealth[problem].desc}
                                    weight={600}
                                    size={10}
                                    color={Colors.inputColorText}
                                  />
                                </View>
                              )}
                            </View>
                            {!!student.problemHealth[problem].desc && (
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
                {!!student && (
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
                          title={student.weight}
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
                          title={student.age}
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
                          title={student.height}
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
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <View style={{width: 30, height: 30, borderRadius: 15}}>
                <Image
                  source={{uri: student.avatar}}
                  style={{height: '100%', width: '100%', borderRadius: 9999}}
                />
              </View>
              <Space marginHorizontal={4} />
              <Text
                title={student.name}
                size={14}
                weight={500}
                color={Colors.inputColorText}
              />
            </View>
            <Space marginVertical={5} />
            {!!categorySelected && (
              <ScrollView
                horizontal={true}
                showsHorizontalScrollIndicator={false}>
                {categorySelected.length !== 0 &&
                  categorySelected.map((category, index) => {
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
              {!!exercisesSelected &&
                exercisesSelected.length !== 0 &&
                exercisesSelected.map(exercise => {
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
                        <View style={{flex: 1}}>
                          <Text
                            title={exercise.name}
                            size={14}
                            weight={500}
                            color={Colors.inputColorText}
                          />
                        </View>
                        <View
                          style={{
                            width: 35,
                            alignItems: 'center',
                            justifyContent: 'center',
                          }}>
                          <InputNota
                            background={Colors.blueMedium}
                            value={exercise.type.weight}
                            onText={e => (exercise.type.weight = e)}
                          />
                        </View>
                        <Space marginHorizontal={2} />
                        <View
                          style={{
                            width: 35,
                            alignItems: 'center',
                            justifyContent: 'center',
                          }}>
                          <InputNota
                            background={Colors.blueLight}
                            value={exercise.type.series}
                            onText={e => (exercise.type.series = e)}
                          />
                        </View>
                        <Space marginHorizontal={2} />
                        <View
                          style={{
                            width: 35,
                            alignItems: 'center',
                            justifyContent: 'center',
                          }}>
                          <InputNota
                            background={Colors.blueLight}
                            value={exercise.type.repeat}
                            onText={e => (exercise.type.repeat = e)}
                          />
                        </View>
                        <Space marginHorizontal={2} />
                        <View
                          style={{
                            width: 35,
                            alignItems: 'center',
                            justifyContent: 'center',
                          }}>
                          <InputNota
                            background={Colors.blueLight}
                            value={exercise.type.duration}
                            onText={e => (exercise.type.duration = e)}
                          />
                        </View>
                        <Space marginHorizontal={2} />
                        <View
                          style={{
                            width: 35,
                            alignItems: 'center',
                            justifyContent: 'center',
                            backgroundColor:
                              exercise.instruction.value === 'OBS'
                                ? Colors.backYellowLight
                                : exercise.instruction.value === 'MIN'
                                ? Colors.colorBackRgba
                                : exercise.instruction.value === 'ADP'
                                ? Colors.lightOrange
                                : Colors.lightGray,
                            borderRadius: 8,
                          }}>
                          <TouchableOpacity
                            style={{
                              borderRadius: 8,
                              padding: 4,
                              flex: 1,
                              justifyContent: 'center',
                              alignItems: 'center',
                            }}
                            onPress={() => {
                              setExercise(exercise);
                              setVisible(true);
                            }}>
                            <Text
                              title={
                                exercise.instruction.value !== ''
                                  ? exercise.instruction.value
                                  : 'INS'
                              }
                              size={13}
                              weight={600}
                              color={
                                exercise.instruction.value === 'OBS'
                                  ? Colors.textYellow
                                  : exercise.instruction.value === 'MIN'
                                  ? Colors.textColorRXC
                                  : exercise.instruction.value === 'ADP'
                                  ? Colors.orange
                                  : Colors.inputColorText
                              }
                            />
                          </TouchableOpacity>
                        </View>
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
                  center
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
                  title="A contagem do descanco é por minutos"
                  weight={500}
                  color={Colors.inputColorText}
                  size={14}
                  center
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
                  center
                />
              </View>
            </View>
          </Card>
          <Space marginVertical={20} />
          <Button
            title="Criar treino"
            weight={500}
            size={14}
            color={Colors.textColorWhite}
            background={Colors.red}
            onPress={() => {
              const verified = verify();

              if (verified) {
                return setCreateTrainning(true);
              }
              return showMessage({
                type: 'warning',
                message: 'Campos Vazios',
                description: 'Precisa preencher todos os campos',
              });
            }}
          />
        </>
      )}
    </ScrollView>
  );
};

export default Step2;
