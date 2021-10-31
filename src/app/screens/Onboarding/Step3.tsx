import React from 'react';
import {Background} from './styles';

import Runner from 'assets/svg/Runner.svg';
import {Dimensions, View} from 'react-native';
import {
  CardButton,
  CircleButton,
  Scroll,
  SimpleHeader,
  Space,
} from 'components';
import Colors from '@styles';

interface StepProps {
  stateChange: () => any;
  backStateChange: () => any;
  dados: any;
  setDados: any;
}

const Step3 = ({stateChange, backStateChange, dados, setDados}: StepProps) => {
  const {width, height} = Dimensions.get('screen');
  return (
    <Background>
      <Scroll>
        <SimpleHeader
          title="Escolha o seu plano"
          color={Colors.textColorWhite}
          size={18}
          weight={600}
        />
        <Runner
          width={(width / 100) * 55}
          height={(height / 100) * 65}
          style={{
            position: 'absolute',
            right: 0,
            top:
              dados.type === 'gym' ? (height / 100) * 25 : (height / 100) * 10,
          }}
        />
        {dados.type === 'common' && (
          <>
            <CardButton
              title="Básico - Grátis"
              desc="Nesse plano você precisa está vinculado a uma academia para usar o aplicativo. Além disso, você só pode ter vínculo a uma academia."
              onPress={() => {
                setDados({...dados, plan: 'basic', limitGym: 1});
                stateChange();
              }}
            />
          </>
        )}
        {dados.type === 'trainner' && (
          <>
            <CardButton
              title="Básico - Grátis"
              desc="Nesse plano você precisa está vinculado a uma academia para usar o aplicativo e criar o treino dos seus alunos. Pode associar até 2 academia no máximo."
              onPress={() => {
                setDados({...dados, plan: 'basic', limitGym: 2});
                stateChange();
              }}
            />
            <CardButton
              title="Individual - R$ 11,90"
              desc="Nesse plano você precisa está vinculado a uma academia para usar o aplicativo e criar o treino dos seus alunos. Pode associar a várias academias."
              onPress={() => {
                setDados({...dados, plan: 'individual'});
                stateChange();
              }}
            />
          </>
        )}
        {dados.type === 'gym' && (
          <>
            <CardButton
              title="Básico - R$ 19,90"
              desc="Nesse plano você pode associar até 250 alunos e 3 treinadores."
              onPress={() => {
                setDados({
                  ...dados,
                  plan: 'basic',
                  limitTrainner: 3,
                  limitCommon: 250,
                });
                stateChange();
              }}
            />
            <CardButton
              title="Intermediário - R$ 29,90"
              desc="Nesse plano você pode associar até 350 alunos e 5 treinadores."
              onPress={() => {
                setDados({
                  ...dados,
                  plan: 'intermediary',
                  limitTrainner: 5,
                  limitCommon: 350,
                });
                stateChange();
              }}
            />
            <CardButton
              title="Ultimate - R$ 39,90"
              desc="Nesse plano você pode associar até 500 alunos e 8 treinadores."
              onPress={() => {
                setDados({
                  ...dados,
                  plan: 'ultimate',
                  limitTrainner: 8,
                  limitCommon: 500,
                });
                stateChange();
              }}
            />
          </>
        )}
        <Space marginVertical={80} />
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'flex-end',
            position: 'absolute',
            bottom: 25,
            right: 0,
          }}>
          <CircleButton title="1" onPress={backStateChange} />
          <View
            style={{width: 80, height: 2, backgroundColor: Colors.background}}
          />
          <CircleButton title="2" />
          <View
            style={{width: 80, height: 2, backgroundColor: Colors.background}}
          />
        </View>
      </Scroll>
    </Background>
  );
};

export default Step3;
