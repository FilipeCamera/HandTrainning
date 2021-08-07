import {SimpleHeader} from 'components';
import React, {useEffect} from 'react';
import {BackHandler} from 'react-native';
import {ExerciseStyle} from './styles';

interface CreateExerciseProps {
  goBack: any;
}

const CreateExercise = ({goBack}: CreateExerciseProps) => {
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
    </ExerciseStyle>
  );
};

export default CreateExercise;
