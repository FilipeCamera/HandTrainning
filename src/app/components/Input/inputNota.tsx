import React, {useState} from 'react';
import {TextInput} from 'react-native-gesture-handler';
import {Text} from 'components';
import {InputStyle} from './styles';
import {View} from 'react-native';
import normalize from '@normalize';
import Colors from '@styles';

interface InputProps {
  value: string;
  placeholder: string;
  onText: (e: any) => any;
}

const InputNota = ({value, placeholder, onText}: InputProps) => {
  const [valor, setValor] = useState<any>(value);
  return (
    <TextInput
      style={{
        fontFamily: 'Poppins-Medium',
        fontSize: normalize(16),
        width: '100%',
        textAlign: 'center',
      }}
      placeholder={placeholder}
      value={valor}
      onChangeText={e => {
        setValor(e);
        onText(e);
      }}
      maxLength={250}
      autoCapitalize="none"
      placeholderTextColor={Colors.textColorRXC}
      keyboardType="numeric"
    />
  );
};

export default InputNota;
