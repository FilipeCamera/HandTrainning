import {Text} from 'components';
import React from 'react';
import {LabelStyle} from './styles';

import LineGran from 'assets/svg/LineGran.svg';
import {View} from 'react-native';
import Colors from '@styles';

const Label = ({title, color}: any) => {
  return (
    <LabelStyle>
      <View style={{marginLeft: 5}}>
        <Text
          title={title}
          weight={500}
          size={18}
          color={color ? color : Colors.textColorBlack}
        />
      </View>
      <LineGran width="100%" />
    </LabelStyle>
  );
};

export default Label;
