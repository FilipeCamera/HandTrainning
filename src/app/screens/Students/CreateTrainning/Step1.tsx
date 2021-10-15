import Colors from '@styles';
import {Card, SimpleHeader, Space, Text} from 'components';
import {firestore} from 'firebase';
import React, {useEffect, useState} from 'react';
import {ScrollView, View} from 'react-native';

import KiloIcon from 'assets/svg/kiloIcon.svg';
import CalendarIcon from 'assets/svg/calendarIcon.svg';
import HeightIcon from 'assets/svg/heightIcon.svg';
import VerticalLine from 'assets/svg/verticalLine.svg';

interface StepProps {
  categorySelected: any[];
  setTrainningStep: any;
  commonId: string;
}

const Step1 = ({categorySelected, setTrainningStep, commonId}: StepProps) => {
  const [student, setStudent] = useState<any>();

  useEffect(() => {
    firestore()
      .collection('users')
      .doc(commonId)
      .get()
      .then(querySnapshot => {
        setStudent(querySnapshot.data());
      })
      .catch(err => {});
  }, []);
  console.log(student);
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
        onBack={() => setTrainningStep('')}
      />
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
              contentContainerStyle={{paddingVertical: 2}}>
              {!!student &&
                Object.keys(student.problemHealth).map(problem => {
                  if (student.problemHealth[problem].value === true) {
                    return (
                      <View>
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
                          style={{flexDirection: 'row', alignItems: 'center'}}>
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
                <View style={{flexDirection: 'column', alignItems: 'center'}}>
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
                <View style={{flexDirection: 'column', alignItems: 'center'}}>
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
                <View style={{flexDirection: 'column', alignItems: 'center'}}>
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
    </ScrollView>
  );
};

export default Step1;
