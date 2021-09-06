import {
  BoxUpload,
  ButtonRed,
  DropdownCategories,
  DropdownType,
  Input,
  SimpleHeader,
  Space,
  Text,
} from 'components';
import {firestore} from 'firebase';
import React, {useEffect, useState} from 'react';
import {BackHandler} from 'react-native';
import {showMessage} from 'react-native-flash-message';
import {fieldValidate} from 'validation';
import {ExerciseStyle} from './styles';

interface CreateExerciseProps {
  goBack: any;
  user: any;
}

const CreateExercise = ({goBack, user}: CreateExerciseProps) => {
  const [category, setCategory] = useState('');
  const [type, setType] = useState('');
  const [name, setName] = useState('');
  const [url, setUrl] = useState('');
  const [errors, setErrors] = useState({
    category: '',
    type: '',
    name: '',
    url: '',
  });

  const handleBack = () => {
    goBack(false);
    return true;
  };
  const verify = () => {
    const categoryVerified = fieldValidate(category);
    const typeVerified = fieldValidate(type);
    const nameVerified = fieldValidate(name);
    const urlVerified = fieldValidate(url);
    setErrors({
      ...errors,
      category: categoryVerified.error,
      type: typeVerified.error,
      name: nameVerified.error,
      url: urlVerified.error,
    });
    if (
      !categoryVerified.value &&
      !typeVerified.value &&
      !nameVerified.value &&
      !urlVerified.value
    ) {
      return true;
    }
    return false;
  };

  const handleCreateExercise = () => {
    const verified = verify();
    console.log(verified);
    if (verified) {
      const data = {
        gym: user.uid,
        name: name,
        type: type,
        category: category,
        url: url,
      };
      firestore()
        .collection('exercises')
        .doc()
        .set(data)
        .then(() => {
          showMessage({
            type: 'success',
            message: 'Sucesso',
            description: 'O exercício foi criado.',
          });
          goBack(false);
        })
        .catch(error => {});
    }
  };

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      handleBack,
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
      <Input
        placeholder="Nome do exercício"
        value={name}
        onText={e => setName(e)}
        error={errors.name}
      />
      <Space marginVertical={20} />
      <BoxUpload setUrl={setUrl} error={errors.url} />
      <Space marginVertical={50} />
      <ButtonRed
        title="Criar exercício"
        size={15}
        weight={500}
        color="#FFF"
        onPress={handleCreateExercise}
      />
    </ExerciseStyle>
  );
};

export default CreateExercise;
