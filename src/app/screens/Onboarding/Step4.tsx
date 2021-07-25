import {
  ButtonRed,
  DataGym,
  DataTrainner,
  DataUser,
  Scroll,
  SimpleHeader,
  Space,
} from 'components';
import {firestore} from 'firebase';
import React, {useState} from 'react';
import {showMessage} from 'react-native-flash-message';
import {cnpjValidate, fieldValidate} from 'validation';
import {ContainerTwo} from './styles';

interface StepProps {
  backStateChange: () => any;
  dados: any;
  setDados: any;
}

const Step4 = ({backStateChange, dados, setDados}: StepProps) => {
  const [errors, setErrors] = useState({
    name: '',
    slogan: '',
    avatar: '',
    cnpj: '',
    city: '',
    uf: '',
    course: '',
    university: '',
    experience: '',
    specs: '',
    weight: '',
    years: '',
    height: '',
  });
  const validate = () => {
    const nameValidated = fieldValidate(dados.name);
    const cnpjValidated = cnpjValidate(dados.cnpj);
    const avatarValidated = fieldValidate(dados.avatar);
    const cityValidated = fieldValidate(dados.city);
    const ufValidated = fieldValidate(dados.uf);
    setErrors({
      ...errors,
      name: nameValidated.error,
      cnpj: cnpjValidated.error,
      avatar: avatarValidated.error,
      city: cityValidated.error,
      uf: ufValidated.error,
    });
    if (
      !nameValidated.value &&
      !cnpjValidated.value &&
      !avatarValidated.value &&
      !cityValidated.value &&
      !ufValidated.value
    ) {
      return true;
    }
    return false;
  };
  const FinallizedSignUp = () => {
    const validated = validate();

    if (validated) {
      firestore()
        .collection('users')
        .doc(dados.uid)
        .update(dados)
        .then(res => {
          showMessage({
            type: 'success',
            message: 'Cadastro feito com sucesso!',
          });
        });
    }
    showMessage({
      type: 'danger',
      message: 'Preencha todos os campos!',
    });
  };
  return (
    <ContainerTwo>
      <Scroll>
        <SimpleHeader
          title="Dados"
          back
          onBack={backStateChange}
          size={18}
          weight={500}
          marginBottom={30}
        />
        {dados.type === 'common' && (
          <DataUser dados={dados} setDados={setDados} errors={errors} />
        )}
        {dados.type === 'trainner' && (
          <DataTrainner dados={dados} setDados={setDados} errors={errors} />
        )}
        {dados.type === 'gym' && (
          <DataGym dados={dados} setDados={setDados} errors={errors} />
        )}
        <Space marginVertical={25} />
        <ButtonRed
          title="Finalizar"
          color="#fff"
          size={15}
          weight={500}
          onPress={() => FinallizedSignUp()}
        />
      </Scroll>
    </ContainerTwo>
  );
};

export default Step4;
