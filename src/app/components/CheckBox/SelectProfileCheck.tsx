import {Space, Text} from 'components';
import React, {useState} from 'react';

import CheckBox from '@react-native-community/checkbox';
import {Image, TouchableOpacity, View} from 'react-native';
import Colors from '@styles';

interface CheckBoxProps {
  profile: any;
  onFunction: () => any;
}

const SelectProfileCheck = ({profile, onFunction}: CheckBoxProps) => {
  const [value, setValue] = useState(false);
  return (
    <TouchableOpacity
      style={{
        elevation: 5,
        backgroundColor: Colors.background,
        padding: 8,
        borderRadius: 8,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 16,
        width: '95%',
      }}
      onPress={() => {
        setValue(!value);
        onFunction();
      }}>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <View style={{width: 50, height: 50, borderRadius: 25}}>
          <Image
            source={{uri: profile.avatar}}
            style={{width: '100%', height: '100%', borderRadius: 9999}}
          />
        </View>
        <Space marginHorizontal={4} />
        <View>
          <Text
            title={profile.name}
            size={14}
            weight={500}
            color={Colors.textColorBlack}
          />
          <Text
            title={
              profile.type === 'gym'
                ? 'Academia'
                : profile.type === 'trainner'
                ? 'Treinador'
                : 'Aluno'
            }
            size={12}
            weight={400}
            color={Colors.textColorBlack}
          />
        </View>
      </View>
      <CheckBox value={value} />
    </TouchableOpacity>
  );
};

export default SelectProfileCheck;
