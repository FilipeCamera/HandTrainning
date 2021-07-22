import React from 'react';
import {Text} from 'components';

import {ButtonStyleText} from './styles';

interface ButtonProps {
  title: string;
  color: string;
  background: string;
  size: number;
  weight: number;
  onPress: () => any;
}

const ButtonText = ({title, color, size, weight, onPress}: ButtonProps) => {
  return (
    <ButtonStyleText onPress={onPress}>
      <Text title={title} size={size} weight={weight} color={color} />
    </ButtonStyleText>
  );
};

export default ButtonText;
