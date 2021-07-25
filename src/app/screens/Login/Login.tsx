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
import React, {useState} from 'react';
import {View} from 'react-native';

import Line from 'assets/svg/Line.svg';

import {Container} from './styles';
import {emailValidate, fieldPass} from 'validation';
import {showMessage} from 'react-native-flash-message';
import {auth} from 'firebase';
import {userPersist} from 'functions';
import {useGetUser} from 'hooks';

const Login = ({navigation}: any) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({email: '', password: ''});
  const {getUser} = useGetUser();
  const validate = () => {
    const emailValidated = emailValidate(email);
    const passwordValidated = fieldPass(password, 6);
    setErrors({
      ...errors,
      email: emailValidated.error,
      password: passwordValidated.error,
    });
    if (!emailValidated.value || !passwordValidated.value) {
      return false;
    }
    return true;
  };

  const signIn = () => {
    const validated = validate();

    if (validated) {
      return auth()
        .signInWithEmailAndPassword(email, password)
        .then(async (res: any) => {
          const userLogged = {email: res.user.email, uid: res.user.uid};
          await getUser(userLogged.uid);
          showMessage({
            type: 'success',
            message: 'Login efetuado com sucesso!',
          });
          navigation.navigate('Private');
        })
        .catch(error => {
          switch (error.code) {
            case 'auth/user-not-found':
              return showMessage({
                type: 'danger',
                message: 'Usuário não encontrado',
              });
            case 'auth/wrong-password':
              return showMessage({
                type: 'danger',
                message: 'E-mail ou senha incorreta',
              });
          }
        });
    }
    return showMessage({
      type: 'danger',
      message: 'Preencha todos os campos!',
    });
  };
  return (
    <Container>
      <Scroll>
        <SimpleHeader
          back
          title="Efetuar login"
          size={18}
          weight={500}
          onBack={() => navigation.goBack()}
          marginBottom={16}
        />
        <Input
          placeholder="E-mail"
          value={email}
          onText={setEmail}
          error={errors.email}
        />
        <Input
          placeholder="Senha"
          value={password}
          onText={setPassword}
          error={errors.password}
          password
        />
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
          onPress={() => signIn()}
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
