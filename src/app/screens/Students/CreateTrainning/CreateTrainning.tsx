import Colors from '@styles';
import {
  Button,
  DropdownStudents,
  Label,
  SimpleHeader,
  Space,
  Text,
} from 'components';
import {firestore} from 'firebase';
import React, {useEffect, useState} from 'react';
import {ScrollView, TouchableOpacity, View} from 'react-native';
import {useSelector} from 'react-redux';

interface CreateTrainningProps {
  setState: any;
}

const CreateTrainning = ({setState}: CreateTrainningProps) => {
  const gym = useSelector((state: any) => state.trainner.gym);
  const [error, setError] = useState({aluno: ''});
  const [exercises, setExercises] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  useEffect(() => {
    firestore()
      .collection('categories')
      .get()
      .then(querySnapshot => {
        const category = querySnapshot.docs.map(doc => doc.data());
        setCategories(category);
      })
      .catch(err => {});
  }, []);

  useEffect(() => {
    firestore()
      .collection('exercises')
      .where('gym', '==', gym.gym)
      .get()
      .then(querySnapshot => {
        const exercise = querySnapshot.docs.map(doc => doc.data());
        setExercises(exercise);
      })
      .catch(err => {});
  }, []);
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
        back
        title="Criar treino"
        size={18}
        weight={600}
        onBack={() => setState('')}
      />
      <Space marginVertical={20} />
      <DropdownStudents error={error.aluno} />
      <Space marginVertical={25} />
      <Label
        title="Selecione as categorias"
        size={16}
        color={Colors.textColorBlack}
      />
      <Space marginVertical={20} />
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          flexWrap: 'wrap',
          justifyContent: 'space-around',
        }}>
        {!!categories &&
          categories.length !== 0 &&
          categories.map(category => {
            return (
              <TouchableOpacity
                key={category.value}
                style={{
                  width: 140,
                  height: 40,
                  borderRadius: 8,
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-around',
                  backgroundColor: Colors.backgroundLight,
                  marginVertical: 8,
                }}>
                <Text
                  title={category.label}
                  size={14}
                  weight={500}
                  color={Colors.inputColorText}
                />
                <Text
                  title="1"
                  size={14}
                  weight={500}
                  color={Colors.inputColorText}
                />
              </TouchableOpacity>
            );
          })}
      </View>
      <Space marginVertical={20} />
      <Button
        title="Avançar"
        weight={500}
        size={14}
        color={Colors.textColorWhite}
        background={Colors.red}
      />
    </ScrollView>
  );
};

export default CreateTrainning;
