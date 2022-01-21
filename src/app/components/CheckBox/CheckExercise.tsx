import {Space, Text} from 'components';
import React, {useState} from 'react';

import CheckBox from '@react-native-community/checkbox';
import {View} from 'react-native';
import Colors from '@styles';

interface CheckBoxProps {
  title: string;
  valor: boolean;
  onFunction: (e: any) => any;
}

const CheckExercise = ({valor, title, onFunction}: CheckBoxProps) => {
  const [value, setValue] = useState(valor);
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        marginBottom: 5,
      }}>
      <CheckBox
        value={value}
        onChange={e => {
          setValue(e.nativeEvent.value);
          onFunction(e.nativeEvent.value);
        }}
      />
      <Space marginHorizontal={4} />
      <View style={{flex: 1}}>
        <Text
          title={title}
          size={15}
          weight={500}
          color={Colors.inputColorText}
        />
      </View>
    </View>
  );
};

export default CheckExercise;
