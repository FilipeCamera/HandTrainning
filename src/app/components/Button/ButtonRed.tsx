import React from 'react';
import {Text} from 'components';

import {ButtonStyle, ButtonContainer, styles} from './styles';

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
    <ButtonStyle onPress={onPress}>
      <ButtonContainer background="#FF6859" style={styles.shadowRed}>
        <Text title={title} size={size} weight={weight} color={color} />
      </ButtonContainer>
    </ButtonStyle>
  );
};

export default ButtonRed;
