import React from 'react';
import {InputStyle} from './styles';

interface InputProps {
  value: string;
  placeholder: string;
  onText: () => any;
}

const Input = ({value, placeholder, onText}: InputProps) => {
  return (
    <InputStyle
      value={value}
      placeholder={placeholder}
      onChangeText={onText}
      placeholderTextColor="#1C2439"
    />
  );
};

export default Input;
