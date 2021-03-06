import React from 'react';
import {Text} from 'components';
import {CardMiniStyle} from './styles';
import {Image, View} from 'react-native';
import Colors from '@styles';

const CardMini = ({avatar, name}: any) => {
  return (
    <CardMiniStyle>
      <View style={{width: 40, height: 40, borderRadius: 20, marginRight: 12}}>
        <Image
          source={{uri: avatar}}
          style={{width: '100%', height: '100%', borderRadius: 9999}}
        />
      </View>
      <View style={{width: 75}}>
        <Text
          title={name}
          size={15}
          weight={600}
          color={Colors.textColorBlack}
        />
      </View>
    </CardMiniStyle>
  );
};

export default CardMini;
