import React from 'react';
import {TextInput} from 'react-native-gesture-handler';
import {Text} from 'components';
import {InputStyle} from './styles';
import {View} from 'react-native';

interface InputProps {
  value: string;
  placeholder: string;
  onText: (e: any) => any;
  password: boolean;
  multiline: number;
  slogan: boolean;
  width: number | string;
  error: string;
  city: boolean;
}

const Input = ({
  value,
  placeholder,
  onText,
  slogan,
  multiline,
  password,
  width,
  error,
  city,
}: InputProps) => {
  return (
    <>
      <InputStyle slogan={slogan} width={width} error={!error ? false : true}>
        <TextInput
          style={{fontFamily: 'Poppins-Regular', fontSize: 15, width: '100%'}}
          multiline={multiline ? true : false}
          placeholder={placeholder}
          value={value}
          onChangeText={e => onText(e)}
          maxLength={250}
          secureTextEntry={password}
          placeholderTextColor={!error ? '#1C2439' : '#FF6859'}
        />
      </InputStyle>
      {!!error && !city && (
        <View
          style={{
            width: '90%',
            marginBottom: 10,
          }}>
          <Text title={error} size={12} weight={500} color="#FF6859" />
        </View>
      )}
    </>
  );
};

export default Input;
