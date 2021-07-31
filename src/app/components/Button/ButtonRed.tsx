import React from 'react';
import {Text} from 'components';

import {ButtonStyle, ButtonContainer, styles, ButtonRedStyle} from './styles';

interface ButtonProps {
  title: string;
  color: string;
  background: string;
  size: number;
  weight: number;
  onPress: () => any;
}

const ButtonRed = ({title, color, size, weight, onPress}: ButtonProps) => {
  return (
    <ButtonRedStyle onPress={onPress} style={styles.shadowRed}>
      <Text title={title} size={size} weight={weight} color={color} />
    </ButtonRedStyle>
  );
};

export default ButtonRed;
