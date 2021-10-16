import Colors from '@styles';
import {Button, Card, SimpleHeader, Space, Text} from 'components';
import {firestore} from 'firebase';
import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Image,
  ScrollView,
  TouchableOpacity,
  View,
} from 'react-native';

import KiloIcon from 'assets/svg/kiloIcon.svg';
import CalendarIcon from 'assets/svg/calendarIcon.svg';
import HeightIcon from 'assets/svg/heightIcon.svg';
import VerticalLine from 'assets/svg/verticalLine.svg';

interface StepProps {
  categorySelected: any[];
  exercisesSelected: any[];
  setExercisesSelected: any;
  setTrainningStep: any;
  commonId: string;
}

const Step2 = ({
  categorySelected,
  setTrainningStep,
  commonId,
  exercisesSelected,
  setExercisesSelected,
}: StepProps) => {
  const [student, setStudent] = useState<any>();
  const [category, setCategory] = useState<any[]>(categorySelected);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState('');

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
            {!!exercisesSelected &&
              exercisesSelected.length !== 0 &&
              exercisesSelected.map(exercise => {
                if (exercise.category === selectedCategory) {
                  return (
                    <Text
                      key={exercise.name}
                      title={exercise.name}
                      size={15}
                      weight={500}
                      color={Colors.inputColorText}
                    />
                  );
                }
              })}
          </Card>
        </>
      )}
      <Space marginVertical={20} />
      <Button
        title="Avançar"
        weight={500}
        size={14}
        color={Colors.textColorWhite}
        background={Colors.red}
        onPress={() => {}}
      />
    </ScrollView>
  );
};

export default Step2;
