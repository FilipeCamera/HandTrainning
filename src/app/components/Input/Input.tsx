import React from 'react';
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
  password: boolean;
  multiline: number;
  slogan: boolean;
  width: number | string;
  error: string;
  city: boolean;
  numeric: boolean;
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
  numeric,
}: InputProps) => {
  return (
    <>
      <InputStyle slogan={slogan} width={width} error={!error ? false : true}>
        <TextInput
          style={{
            fontFamily: 'Poppins-Regular',
            fontSize: normalize(15),
            width: '100%',
            height: slogan ? 80 : 56,
          }}
          multiline={multiline ? true : false}
          placeholder={placeholder}
          value={value}
          onChangeText={e => onText(e)}
          maxLength={250}
          autoCapitalize="none"
          secureTextEntry={password}
          placeholderTextColor={!error ? Colors.textColorRX : Colors.red}
          keyboardType={numeric ? 'numeric' : 'default'}
        />
      </InputStyle>
      {!!error && !city && (
        <View
          style={{
            width: '90%',
            marginBottom: 10,
          }}>
          <Text title={error} size={12} weight={500} color={Colors.red} />
        </View>
      )}
    </>
  );
};

export default Input;
