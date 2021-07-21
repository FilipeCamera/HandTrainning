import React from 'react';
import {Text} from 'components';

import {ButtonStyle, ButtonContainer} from './styles';

interface ButtonProps {
  title: string;
  color: string;
  background: string;
  size: number;
  weight: number;
}

const Button = ({title, color, background, size, weight}: ButtonProps) => {
  return (
    <ButtonStyle>
      <ButtonContainer>
        <Text title={title} size={size} weight={weight} color={color} />
      </ButtonContainer>
    </ButtonStyle>
  );
};

export default Button;
