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

const Login = ({navigation}: any) => {
  return (
    <Container>
      <Scroll>
        <SimpleHeader
          back
          title="Efetuar login"
          onBack={() => navigation.goBack()}
          marginBottom={16}
        />
        <Input placeholder="E-mail" />
        <Input placeholder="Senha" />
        <View style={{width: '95%', alignItems: 'flex-start'}}>
          <ButtonText
            title="Esqueceu a senha?"
            weight={600}
            size={13}
            color="#FF6859"
          />
        </View>
        <Space marginVertical={20} />
        <ButtonRed
          title="Acessar"
          background="#FF6859"
          size={15}
          color="#fff"
          weight={500}
          onPress={() => navigation.navigate('Onboarding')}
        />
        <Space marginVertical={12} />
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Text
            title="Não possui uma conta?"
            size={15}
            weight={400}
            color="#4C5673"
          />
          <Space marginHorizontal={2} />
          <ButtonText
            title="Cadastre-se"
            size={15}
            weight={600}
            color="#FF6859"
            onPress={() => navigation.navigate('Register')}
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
          title="sign in with Google"
          border
          color="#090A0A"
          weight={500}
          size={15}
          notShadow
        />
        <Button
          apple
          title="sign in with Apple"
          border
          color="#090A0A"
          weight={500}
          size={15}
          notShadow
        />
        <Button
          facebook
          title="sign in with Facebook"
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

export default Login;
