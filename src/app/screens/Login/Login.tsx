import {
  Button,
  ButtonRed,
  ButtonText,
  Input,
  ModalForgotPassword,
  Scroll,
  SimpleHeader,
  Space,
  Text,
} from 'components';
import React, {useState} from 'react';
import {Platform, View} from 'react-native';

import Line from 'assets/svg/Line.svg';

import {Container} from './styles';
import {emailValidate, fieldPass} from 'validation';
import {showMessage} from 'react-native-flash-message';
import {auth} from 'firebase';
import {userPersist} from 'functions';
import {useGetUser} from 'hooks';
import Colors from '@styles';
import {GoogleSignin} from '@react-native-google-signin/google-signin';

const Login = ({navigation}: any) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({email: '', password: ''});
  const [visible, setVisible] = useState(false);
  const {getUserLogged, getUser} = useGetUser();
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
  const save = (user: any) => {
    getUser({
      uid: user.uid,
      onComplete: user => {
        if (user) {
          userPersist(user);
          navigation.navigate('Private');
        }
      },
    });
  };

  const signInGoogle = async () => {
    await GoogleSignin.hasPlayServices();
    const {idToken} = await GoogleSignin.signIn();
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);
    return auth()
      .signInWithCredential(googleCredential)
      .then(() => {
        getUserLogged({
          onComplete: (user: any) => {
            if (user) {
              save(user);
            }
          },
        });
        showMessage({
          type: 'success',
          message: 'Login efetuado com sucesso!',
        });
        navigation.navigate('Private');
      })
      .catch(err => {});
  };

  const signIn = () => {
    const validated = validate();

    if (validated) {
      return auth()
        .signInWithEmailAndPassword(email, password)
        .then(() => {
          getUserLogged({
            onComplete: (user: any) => {
              if (user) {
                save(user);
              }
            },
          });
          showMessage({
            type: 'success',
            message: 'Login efetuado com sucesso!',
          });
          navigation.navigate('Private');
        })
        .catch(error => {
          console.log(error);
          switch (error.code) {
            case 'auth/user-not-found':
              return showMessage({
                type: 'danger',
                message: 'Usu??rio n??o encontrado. Por favor, tente novamente!',
              });
            case 'auth/wrong-password':
              return showMessage({
                type: 'danger',
                message:
                  'E-mail ou senha incorreta. Por favor, tente novamente!',
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
      <ModalForgotPassword visible={visible} setVisible={setVisible} />
      <Scroll>
        <SimpleHeader
          back
          title="Efetuar login"
          size={18}
          weight={500}
          onBack={() => navigation.goBack()}
          marginBottom={16}
        />
        <Space marginVertical={4} />
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
            color={Colors.red}
            onPress={() => setVisible(true)}
          />
        </View>
        <Space marginVertical={20} />
        <ButtonRed
          title="Acessar"
          background={Colors.red}
          size={15}
          color={Colors.textColorWhite}
          weight={500}
          onPress={() => signIn()}
        />
        <Space marginVertical={12} />
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Text
            title="N??o possui uma conta?"
            size={15}
            weight={400}
            color={Colors.textColorRXC}
          />
          <Space marginHorizontal={2} />
          <ButtonText
            title="Cadastre-se"
            size={15}
            weight={600}
            color={Colors.red}
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
          <Text
            title="ou"
            size={18}
            weight={500}
            color={Colors.textColorBlack}
          />
          <Line width="120px" />
        </View>
        <Space marginVertical={16} />
        <Button
          onPress={() => signInGoogle()}
          google
          title="sign in with Google"
          border
          color={Colors.textColorBlack}
          weight={500}
          size={15}
          notShadow
        />
        {Platform.OS === 'ios' && (
          <Button
            apple
            title="sign in with Apple"
            border
            color={Colors.textColorBlack}
            weight={500}
            size={15}
            notShadow
          />
        )}
        <Button
          facebook
          title="sign in with Facebook"
          border
          color={Colors.textColorBlack}
          weight={500}
          size={15}
          disabled
          notShadow
        />
      </Scroll>
    </Container>
  );
};

export default Login;
