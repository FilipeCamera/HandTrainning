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

interface StepProps {
  stateChange: () => any;
  backStateChange: () => any;
  dados: any;
  setDados: any;
}

const Step2 = ({stateChange, setDados, dados}: StepProps) => {
  const {width, height} = Dimensions.get('screen');
  return (
    <Background>
      <Scroll>
        <SimpleHeader
          title="Escolha o seu perfil"
          color="#fff"
          size={18}
          weight={600}
        />
        <Runner
          width={(width / 100) * 55}
          height={(height / 100) * 65}
          style={{position: 'absolute', right: 0, top: (height / 100) * 25}}
        />
        <CardButton
          title="Aluno"
          onPress={() => {
            setDados({...dados, type: 'common'});
            stateChange();
          }}
        />
        <CardButton
          title="Treinador"
          onPress={() => {
            setDados({...dados, type: 'trainner'});
            stateChange();
          }}
        />
        <CardButton
          title="Academia"
          onPress={() => {
            setDados({...dados, type: 'gym'});
            stateChange();
          }}
        />
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
          <CircleButton title="1" />
          <View style={{width: 100, height: 2, backgroundColor: '#fff'}} />
        </View>
      </Scroll>
    </Background>
  );
};

export default Step2;
