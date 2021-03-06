import React from 'react';
import {Text} from 'components';

import {ButtonStyle, ButtonIcon, ButtonContainer, styles} from './styles';

import Google from 'assets/svg/google.svg';
import Facebook from 'assets/svg/facebook.svg';
import Apple from 'assets/svg/apple.svg';

interface ButtonProps {
  title: string;
  color: string;
  background: string;
  size: number;
  weight: number;
  onPress: () => any;
  border: boolean;
  google: boolean;
  apple: boolean;
  facebook: boolean;
  disabled?: boolean;
  notShadow: boolean;
}

const Button = ({
  title,
  color,
  background,
  size,
  weight,
  border,
  google,
  apple,
  facebook,
  notShadow,
  disabled,
  onPress,
}: ButtonProps) => {
  return (
    <ButtonStyle
      onPress={onPress}
      disabled={disabled}
      background={background}
      border={border}
      style={notShadow ? '' : styles.shadow}>
      <ButtonContainer>
        {!!google && (
          <ButtonIcon>
            <Google />
          </ButtonIcon>
        )}
        {!!apple && (
          <ButtonIcon>
            <Apple />
          </ButtonIcon>
        )}
        {!!facebook && (
          <ButtonIcon>
            <Facebook />
          </ButtonIcon>
        )}
        <Text title={title} size={size} weight={weight} color={color} />
      </ButtonContainer>
    </ButtonStyle>
  );
};

export default Button;
