import {ButtonText, Space, Text} from 'components';
import React from 'react';

import {Container} from './styles';

import Exercise from 'assets/svg/Exercise.svg';
import {View} from 'react-native';

const Step1 = () => {
  return (
    <Container>
      <Exercise />
      <Space marginVertical={5} />
      <Text title="Seja bem-vindo" weight={600} size={22} color="#090A0A" />
      <Text
        title="Precisamos finalizar o seu cadastro, aperte em avançar para continuar!"
        weight={400}
        size={18}
        color="#999999"
        center
      />
      <View style={{position: 'absolute', bottom: 25, right: 25}}>
        <ButtonText title="Avançar" weight={500} size={16} color="#FF6859" />
      </View>
    </Container>
  );
};

export default Step1;
