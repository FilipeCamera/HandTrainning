import {
  ButtonRed,
  DataGym,
  DataTrainner,
  DataUser,
  Scroll,
  SimpleHeader,
  Space,
} from 'components';
import React, {useState} from 'react';
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
    problemHealth: '',
    weight: '',
    years: '',
    height: '',
  });
  const validate = () => {
    const nameValidated = fieldValidate(dados.name);
    const cnpjValidated = cnpjValidate(dados.cnpj);

    setErrors({
      ...errors,
      name: nameValidated.error,
      cnpj: nameValidated.error,
    });
    if (!nameValidated.value || !cnpjValidated.value) {
      return false;
    }
    return true;
  };
  const FinallizedSignUp = () => {
    const validated = validate();

    if (validated) {
      console.log('Cadastro feito');
    }
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
        {dados.type === 'common' && <DataUser />}
        {dados.type === 'trainner' && <DataTrainner />}
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
