import React from 'react';
import {TextInput} from 'react-native-gesture-handler';
import {InputStyle} from './styles';

interface InputProps {
  value: string;
  placeholder: string;
  onText: () => any;
  password: boolean;
  multiline: number;
  slogan: boolean;
}

const Input = ({
  value,
  placeholder,
  onText,
  slogan,
  multiline,
  password,
}: InputProps) => {
  return (
    <InputStyle slogan={slogan}>
      <TextInput
        style={{fontFamily: 'Poppins-Regular', fontSize: 15, width: '100%'}}
        multiline={multiline ? true : false}
        placeholder={placeholder}
        value={value}
        onChangeText={onText}
        maxLength={250}
        secureTextEntry={password}
        placeholderTextColor="#1C2439"
      />
    </InputStyle>
  );
};

export default Input;
