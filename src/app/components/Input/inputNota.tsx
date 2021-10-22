import React, {useState} from 'react';
import {TextInput} from 'react-native-gesture-handler';

import normalize from '@normalize';
import Colors from '@styles';

interface InputProps {
  value: string | null | undefined;
  placeholder: string;
  background: string;
  onText: (e: any) => any;
}

const InputNota = ({value, placeholder, background, onText}: InputProps) => {
  const [valor, setValor] = useState<any>(value || '');
  return (
    <TextInput
      style={{
        fontFamily: 'Poppins-Medium',
        fontSize: normalize(16),
        width: '100%',
        textAlign: 'center',
        borderRadius: 8,
        backgroundColor: valor === '' ? Colors.lightRed2 : background,
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
