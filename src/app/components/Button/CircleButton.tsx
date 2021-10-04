import Colors from '@styles';
import {Text} from 'components';
import React from 'react';
import {CircleButtonStyle} from './styles';

interface CircleButtonProps {
  title: string;
  onPress: () => any;
}

const CircleButton = ({title, onPress}: CircleButtonProps) => {
  return (
    <CircleButtonStyle onPress={onPress}>
      <Text title={title} size={20} weight={600} color={Colors.redDark} />
    </CircleButtonStyle>
  );
};

export default CircleButton;
