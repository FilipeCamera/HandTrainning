import {SimpleHeader, Space, Text} from 'components';
import React, {useState, useEffect} from 'react';
import {View, BackHandler} from 'react-native';
import {ExerciseStyle} from './styles';

import Notify from 'assets/svg/Notify.svg';
import CreateExercise from './CreateExercise';

const Exercise = () => {
  const [create, setCreate] = useState(false);

  if (create) {
    return <CreateExercise goBack={setCreate} />;
  }
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
        add
        title="Exercícios"
        color="#090A0A"
        size={20}
        weight={500}
        onAdd={() => setCreate(true)}
      />
      <View
        style={{
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          flex: 1,
        }}>
        <Notify />
        <Space marginVertical={10} />
        <Text
          title="Nenhum exercício criado"
          size={16}
          weight={500}
          color="#D0D0D0"
        />
      </View>
    </ExerciseStyle>
  );
};

export default Exercise;
