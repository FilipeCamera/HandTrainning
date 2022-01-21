import {Text} from 'components';
import React from 'react';

import CheckBox from '@react-native-community/checkbox';
import {CheckBoxStyle} from './styles';

interface CheckBoxProps {
  title: string;
  setValue: any;
  value: boolean;
  size?: number;
}

const Check = ({title, setValue, value, size}: CheckBoxProps) => {
  return (
    <CheckBoxStyle>
      <CheckBox
        style={{marginRight: 5}}
        tintColors={{true: '#4CAF50', false: '#D3D3D3'}}
        value={value}
        onValueChange={newValue => setValue(newValue)}
      />
      <Text
        title={title}
        weight={500}
        size={size ? size : 16}
        color="#090A0A"
      />
    </CheckBoxStyle>
  );
};

export default Check;
