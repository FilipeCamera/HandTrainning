import React from 'react';
import {Space, Text} from 'components';

import Telegram from 'assets/svg/telegram.svg';

import {ButtonMiniRedStyle} from './styles';

interface ButtonProps {
  title: string;
  color: string;
  size: number;
  weight: number;
  onPress: () => any;
}

const ButtonMiniRed = ({title, color, size, weight, onPress}: ButtonProps) => {
  return (
    <ButtonMiniRedStyle onPress={onPress}>
      <Text title={title} size={size} weight={weight} color={color} />
    </ButtonMiniRedStyle>
  );
};

export default ButtonMiniRed;
