import {Header, Space, Text} from 'components';
import React, {useState} from 'react';
import {TrainningStyle} from './styles';

import ExerciseIcon from 'assets/svg/weightIcon.svg';
import {View} from 'react-native';
import Colors from '@styles';

const Trainning = () => {
  const [trainning, setTrainning] = useState(false);
  return (
    <TrainningStyle
      contentContainerStyle={{
        flexGrow: 1,
        padding: 16,
        alignItems: 'center',
        width: '100%',
      }}
      showsVerticalScrollIndicator={false}>
      <Header />
      {!trainning && (
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <ExerciseIcon width="120px" height="120px" />
          <Space marginVertical={4} />
          <Text
            title="Opa! Você não tem um treino"
            size={15}
            weight={500}
            color={Colors.textWhiteLight}
            center
          />
        </View>
      )}
    </TrainningStyle>
  );
};

export default Trainning;
