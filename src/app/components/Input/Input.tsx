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
  width: number | string;
}

const Input = ({
  value,
  placeholder,
  onText,
  slogan,
  multiline,
  password,
  width,
}: InputProps) => {
  return (
    <InputStyle slogan={slogan} width={width}>
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
