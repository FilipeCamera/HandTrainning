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
}

const Step4 = ({backStateChange}: StepProps) => {
  const [type, setType] = useState('gym');
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
        {type === 'user' && <DataUser />}
        {type === 'trainner' && <DataTrainner />}
        {type === 'gym' && <DataGym />}
        <Space marginVertical={25} />
        <ButtonRed title="Finalizar" color="#fff" size={15} weight={500} />
      </Scroll>
    </ContainerTwo>
  );
};

export default Step4;
