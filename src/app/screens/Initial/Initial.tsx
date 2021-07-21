import React from 'react';

import {Container, Absolute} from './styles';

import {Dimensions} from 'react-native';

import LogoText from '../../../assets/svg/LogoText.svg';
import Runner from '../../../assets/svg/Runner.svg';
import {Button} from 'components';

const Initial = () => {
  const {width, height} = Dimensions.get('screen');
  return (
    <Container>
      <Absolute top={6} left={4}>
        <LogoText width={(width / 100) * 55} height={(height / 100) * 55} />
      </Absolute>
      <Absolute right={0} top={20}>
        <Runner width={(width / 100) * 55} height={(height / 100) * 65} />
      </Absolute>
      <Button title="Começar" weight={500} size={16} />
    </Container>
  );
};

export default Initial;
