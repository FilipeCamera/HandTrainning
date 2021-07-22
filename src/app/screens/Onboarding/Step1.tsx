import {ButtonText, Space, Text} from 'components';
import React from 'react';

import {Container} from './styles';

import Exercise from 'assets/svg/Exercise.svg';
import {View} from 'react-native';

interface StepProps {
  stateChange: () => any;
}

const Step1 = ({stateChange}: StepProps) => {
  return (
    <Container>
      <Exercise />
      <Space marginVertical={5} />
      <Text title="Seja bem-vindo" weight={600} size={20} color="#090A0A" />
      <View style={{width: '90%'}}>
        <Text
          title="Precisamos finalizar o seu cadastro, aperte em avançar para continuar!"
          weight={400}
          size={16}
          color="#999999"
          center
        />
      </View>
      <View style={{position: 'absolute', bottom: 25, right: 25}}>
        <ButtonText
          title="Avançar"
          weight={500}
          size={16}
          color="#FF6859"
          onPress={stateChange}
        />
      </View>
    </Container>
  );
};

export default Step1;
