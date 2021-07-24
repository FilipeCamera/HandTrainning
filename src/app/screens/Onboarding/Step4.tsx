import {
  ButtonRed,
  DataGym,
  DataTrainner,
  DataUser,
  Scroll,
  SimpleHeader,
  Space,
} from 'components';
import React from 'react';
import {ContainerTwo} from './styles';

interface StepProps {
  backStateChange: () => any;
  dados: any;
  setDados: any;
}

const Step4 = ({backStateChange, dados, setDados}: StepProps) => {
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
        {dados.type === 'gym' && <DataGym />}
        <Space marginVertical={25} />
        <ButtonRed title="Finalizar" color="#fff" size={15} weight={500} />
      </Scroll>
    </ContainerTwo>
  );
};

export default Step4;
