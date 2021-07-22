import React from 'react';

import {Background} from './styles';

import {Dimensions} from 'react-native';

import LogoText from '../../../assets/svg/LogoText.svg';
import Runner from '../../../assets/svg/Runner.svg';
import {Button, Scroll} from 'components';
import {View} from 'react-native';

const Initial = () => {
  const {width, height} = Dimensions.get('screen');
  return (
    <Background>
      <Scroll>
        <View
          style={{
            flexDirection: 'row',
            width: '100%',
            marginBottom: 180,
          }}>
          <LogoText width={(width / 100) * 55} height={(height / 100) * 55} />
          <Runner
            width={(width / 100) * 55}
            height={(height / 100) * 65}
            style={{position: 'absolute', right: 0, bottom: -160}}
          />
        </View>
        <Button
          title="Começar"
          weight={500}
          size={16}
          background="#090A0A"
          color="#FFF"
        />
        <Button
          title="Já tenho uma conta"
          weight={500}
          size={16}
          color="#090A0A"
        />
      </Scroll>
    </Background>
  );
};

export default Initial;
