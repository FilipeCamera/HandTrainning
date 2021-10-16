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
import {
  ActivityIndicator,
  ScrollView,
  TouchableOpacity,
  View,
} from 'react-native';
import {showMessage} from 'react-native-flash-message';
import {useSelector} from 'react-redux';
import {fieldValidate} from 'validation';
import Step1 from './Step1';
import Step2 from './Step2';

interface CreateTrainningProps {
  setState: any;
}

const CreateTrainning = ({setState}: CreateTrainningProps) => {
  const gym = useSelector((state: any) => state.trainner.gym);
  const [error, setError] = useState({aluno: ''});
  const [trainningStep, setTrainningStep] = useState('');
  const [student, setStudent] = useState('');
  const [exercises, setExercises] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<any[]>([]);
  const [exercisesSelected, setexercisesSelected] = useState<any[]>([]);
  const verify = () => {
    const studentsVerified = fieldValidate(student);
    setError({aluno: studentsVerified.error});
    if (!studentsVerified.value && selectedCategory.length !== 0) {
      return true;
    }
    return false;
  };

  const handleSelect = index => {
    const list = categories.map((c, i) => {
      if (i === index) {
        return {...c, selected: !c.selected};
      }
      return {...c, selected: c.selected};
    });
    const listSelected = list.filter(l => l.selected === true);
    setCategories(list);
    setSelectedCategory(listSelected);
  };

  useEffect(() => {
    firestore()
      .collection('categories')
      .get()
      .then(querySnapshot => {
        const list: any = [];
        const category = querySnapshot.docs.map(doc => doc.data());
        category.map(cat => {
          list.push({
            label: cat.label,
            value: cat.value,
            selected: false,
          });
        });
        setCategories(list);
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

  if (trainningStep === 'step2') {
    return (
      <Step2
        setTrainningStep={setTrainningStep}
        categorySelected={selectedCategory}
        commonId={student}
        exercisesSelected={exercisesSelected}
        setExercisesSelected={setexercisesSelected}
      />
    );
  }
  if (trainningStep === 'step1') {
    return (
      <Step1
        setTrainningStep={setTrainningStep}
        categorySelected={selectedCategory}
        commonId={student}
        exercisesSelected={exercisesSelected}
        setExercisesSelected={setexercisesSelected}
      />
    );
  }
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
      <DropdownStudents
        error={error.aluno}
        value={student}
        onValue={setStudent}
      />
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
        {categories.length === 0 && (
          <View
            style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            <ActivityIndicator size="large" color={Colors.red} />
          </View>
        )}
        {!!categories &&
          categories.length !== 0 &&
          categories.map((category, index) => {
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
                  backgroundColor: category.selected
                    ? Colors.red
                    : Colors.backgroundLight,
                  marginVertical: 8,
                }}
                onPress={() => handleSelect(index)}>
                <Text
                  title={category.label}
                  size={14}
                  weight={500}
                  color={
                    category.selected
                      ? Colors.textColorWhite
                      : Colors.inputColorText
                  }
                />
                <Text
                  title={
                    exercises.filter(
                      exercise => exercise.category === category.value,
                    ).length
                  }
                  size={14}
                  weight={500}
                  color={
                    category.selected
                      ? Colors.textColorWhite
                      : Colors.inputColorText
                  }
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
        onPress={() => {
          const verified = verify();
          if (verified) {
            return setTrainningStep('step1');
          }
          return showMessage({
            type: 'danger',
            message: 'Precisa selecionar um aluno ou selecionar as categorias',
          });
        }}
      />
    </ScrollView>
  );
};

export default CreateTrainning;
