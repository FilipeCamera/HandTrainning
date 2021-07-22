import {
  Button,
  ButtonRed,
  ButtonText,
  Input,
  Scroll,
  SimpleHeader,
  Space,
  Text,
} from 'components';
import React from 'react';
import {View} from 'react-native';

import Line from 'assets/svg/Line.svg';

import {Container} from './styles';

const Register = ({navigation}: any) => {
  return (
    <Container>
      <Scroll>
        <SimpleHeader
          back
          title="Cadastrar"
          onBack={() => navigation.goBack()}
          marginBottom={16}
        />
        <Input placeholder="E-mail" />
        <Input placeholder="Senha" />
        <Input placeholder="Confirmar senha" />
        <Space marginVertical={20} />
        <ButtonRed
          title="Cadastrar"
          background="#FF6859"
          size={15}
          color="#fff"
          weight={500}
        />
        <Space marginVertical={12} />
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Text
            title="Já possui uma conta?"
            size={15}
            weight={400}
            color="#4C5673"
          />
          <Space marginHorizontal={2} />
          <ButtonText
            title="Faça o login"
            size={15}
            weight={600}
            color="#FF6859"
          />
        </View>
        <Space marginVertical={24} />
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-around',
            width: '95%',
          }}>
          <Line width="120px" />
          <Text title="ou" size={18} weight={500} color="#090A0A" />
          <Line width="120px" />
        </View>
        <Space marginVertical={16} />
        <Button
          google
          title="sign up with Google"
          border
          color="#090A0A"
          weight={500}
          size={15}
          notShadow
        />
        <Button
          apple
          title="sign up with Apple"
          border
          color="#090A0A"
          weight={500}
          size={15}
          notShadow
        />
        <Button
          facebook
          title="sign up with Facebook"
          border
          color="#090A0A"
          weight={500}
          size={15}
          notShadow
        />
      </Scroll>
    </Container>
  );
};

export default Register;
