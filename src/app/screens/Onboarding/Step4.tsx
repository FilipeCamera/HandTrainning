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

  const FinallizedSignUp = () => {
    console.log(dados);
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
