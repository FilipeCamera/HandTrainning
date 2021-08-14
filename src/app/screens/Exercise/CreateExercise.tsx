import {
  Button,
  DropdownCategories,
  DropdownType,
  Input,
  SimpleHeader,
  Space,
} from 'components';
import React, {useEffect, useState} from 'react';
import {BackHandler} from 'react-native';
import {ExerciseStyle} from './styles';

interface CreateExerciseProps {
  goBack: any;
}

const CreateExercise = ({goBack}: CreateExerciseProps) => {
  const [category, setCategory] = useState('');
  const [type, setType] = useState('');
  const [name, setName] = useState('');
  const [errors, setErrors] = useState({category: '', type: ''});
  const handleCreate = () => {
    goBack(false);
    return true;
  };
  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      handleCreate,
    );
    return () => backHandler.remove();
  }, []);
  return (
    <ExerciseStyle
      contentContainerStyle={{
        flexGrow: 1,
        padding: 16,
        alignItems: 'center',
        width: '100%',
      }}
      showsVerticalScrollIndicator={false}>
      <SimpleHeader
        back
        title="Exercícios"
        color="#090A0A"
        size={20}
        weight={500}
        onBack={() => goBack(false)}
      />
      <Space marginVertical={10} />
      <DropdownCategories
        value={category}
        onValue={(e: any) => setCategory(e)}
        error={errors.category}
      />
      <Space marginVertical={4} />
      <DropdownType
        value={type}
        onValue={(e: any) => setType(e)}
        error={errors.type}
      />
      <Input placeholder="Nome do exercício" />

      <Button
        title="Criar exercício"
        size={15}
        weight={500}
        color="#FFF"
        background="#FF6859"
      />
    </ExerciseStyle>
  );
};

export default CreateExercise;
