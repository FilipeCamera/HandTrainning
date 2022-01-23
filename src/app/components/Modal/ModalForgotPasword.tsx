import Colors from '@styles';
import {Button, Label, Space, Text, Input, Check} from 'components';
import {auth} from 'firebase';
import React, {useState} from 'react';
import {ActivityIndicator, Image, View} from 'react-native';
import {showMessage} from 'react-native-flash-message';

import {Modal, Portal} from 'react-native-paper';
import {emailValidate} from 'validation';

interface ModalProps {
  visible: boolean;

  setVisible: any;
}

const ModalForgotPassword = ({visible, setVisible}: ModalProps) => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState({email: ''});
  const validate = () => {
    const emailValidated = emailValidate(email);
    setError({
      email: emailValidated.error,
    });
    if (!emailValidated.value) {
      return false;
    }
    return true;
  };

  const handleSubmit = async () => {
    const validated = validate();
    if (validated) {
      return auth()
        .sendPasswordResetEmail(email)
        .then(res => {
          setVisible(false);
          showMessage({
            type: 'success',
            message: 'Enviado',
            description: 'Por favor, verifique o seu e-mail',
          });
        })
        .catch(error => {
          switch (error.code) {
            case 'auth/user-not-found':
              return showMessage({
                type: 'danger',
                message: 'Aviso',
                description: 'Usuário não encontrado',
              });
          }
        });
    }

    return showMessage({
      type: 'warning',
      message: 'Aviso',
      description: 'Digite um e-mail válido',
    });
  };
  return (
    <Portal>
      <Modal
        visible={visible}
        onDismiss={() => setVisible(false)}
        contentContainerStyle={{
          backgroundColor: Colors.background,
          padding: 16,
          margin: 24,
          borderRadius: 20,
          alignItems: 'center',
          flexDirection: 'column',
          justifyContent: 'flex-start',
        }}>
        <View
          style={{
            width: '100%',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Label title="Esqueceu sua senha?" center size={15} />
          <Space marginVertical={4} />
          <Input
            value={email}
            onText={e => setEmail(e)}
            error={error.email}
            placeholder="Digite seu e-mail"
          />
          <Button
            title="Enviar"
            size={14}
            weight={500}
            background={Colors.red}
            color={Colors.background}
            onPress={() => handleSubmit()}
          />
        </View>
      </Modal>
    </Portal>
  );
};

export default ModalForgotPassword;
