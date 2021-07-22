import {Input, Label, Scroll, SimpleHeader, Space} from 'components';
import React from 'react';
import {ContainerTwo} from './styles';

interface StepProps {
  backStateChange: () => any;
}

const Step4 = ({backStateChange}: StepProps) => {
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
        <Label title="Perfil" />
        <Space marginVertical={4} />
        <Input placeholder="Nome" />
        <Input slogan placeholder="Slogan" multiline={2} />
        <Space marginVertical={20} />
        <Label title="Informação do Aluno" />
      </Scroll>
    </ContainerTwo>
  );
};

export default Step4;
