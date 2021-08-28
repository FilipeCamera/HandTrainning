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
import {Platform, View} from 'react-native';

import Line from 'assets/svg/Line.svg';

import {Container} from './styles';

import {firestore, auth} from 'firebase';
import {userPersist} from 'functions';
import {emailValidate, fieldPass, equalsPassword} from 'validation';
import {showMessage} from 'react-native-flash-message';

const Register = ({navigation}: any) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState({
    email: '',
    password: '',
    confirmPassword: '',
  });

  const validate = () => {
    const emailValidated = emailValidate(email);
    const passwordValidated = fieldPass(password, 6);
    const confirmPassValidated = fieldPass(confirmPassword, 6);
    const equals = equalsPassword(password, confirmPassword);
    setErrors({
      ...errors,
      email: emailValidated.error,
      password: passwordValidated.error,
      confirmPassword: confirmPassValidated.error,
    });
    if (
      !emailValidated.value ||
      !passwordValidated.value ||
      !confirmPassValidated.value
    ) {
      return false;
    }

    if (!equals.value) {
      setErrors({
        ...errors,
        password: equals.error,
        confirmPassword: equals.error,
      });
      return false;
    }
    return true;
  };
  const signUp = (email: string, password: string) => {
    auth()
      .createUserWithEmailAndPassword(email, password)
      .then(async (user: any) => {
        const {uid} = await user.user;
        saveUser(uid);
        showMessage({type: 'success', message: 'Cadastro feito com sucesso!'});
        navigation.navigate('Private');
      })
      .catch((error: any) => {
        switch (error.code) {
          case 'auth/email-already-in-use':
            return showMessage({
              type: 'danger',
              message: 'Usuário já cadastrado!',
            });
        }
      });
  };

  const saveUser = (uid: string) => {
    const user = {
      uid: uid,
      email: email,
      completeRegister: false,
      createdAt: firestore.FieldValue.serverTimestamp(),
    };
    firestore()
      .collection('users')
      .doc(uid)
      .set(user)
      .then(() => {
        userPersist(user);
      })
      .catch((error: any) => {});
  };
  return (
    <Container>
      <Scroll>
        <SimpleHeader
          back
          title="Cadastrar"
          size={18}
          weight={500}
          onBack={() => navigation.goBack()}
          marginBottom={16}
        />
        <Input
          value={email}
          onText={setEmail}
          placeholder="E-mail"
          error={errors.email}
        />
        <Input
          value={password}
          onText={setPassword}
          placeholder="Senha"
          error={errors.password}
          password
        />
        <Input
          value={confirmPassword}
          onText={setConfirmPassword}
          placeholder="Confirmar senha"
          error={errors.confirmPassword}
          password
        />
        <Space marginVertical={20} />
        <ButtonRed
          title="Cadastrar"
          background="#FF6859"
          size={15}
          color="#fff"
          weight={500}
          onPress={() => {
            const validated = validate();
            if (validated) {
              signUp(email, password);
            } else {
              showMessage({
                type: 'danger',
                message: 'Preencha todos os campos corretamente!',
              });
            }
          }}
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
            onPress={() => navigation.navigate('Login')}
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
        {Platform.OS === 'ios' && (
          <Button
            apple
            title="sign up with Apple"
            border
            color="#090A0A"
            weight={500}
            size={15}
            notShadow
          />
        )}
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
