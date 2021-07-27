import React from 'react';

import RectangleRed from 'assets/svg/Rectangle16.svg';
import RectangleLine from 'assets/svg/Rectangle14.svg';
import RectangleShadow from 'assets/svg/Rectangle15.svg';
import RectangleRed2 from 'assets/svg/Rectangle17.svg';
import RectangleLine2 from 'assets/svg/Rectangle19.svg';
import RectangleShadow2 from 'assets/svg/Rectangle18.svg';
import DownIcon from 'assets/svg/Down.svg';
import {CardStatusStyle, CardBoxTwoStyle, CardBoxStyle} from './styles';
import {View} from 'react-native';

const CardStatus = () => {
  return (
    <CardStatusStyle>
      <CardBoxStyle>
        <View
          style={{
            position: 'absolute',
            bottom: 0,
            right: 0,
          }}>
          <RectangleRed />
        </View>
        <View style={{position: 'absolute', right: 0, top: 0}}>
          <RectangleShadow />
        </View>
        <View style={{position: 'absolute', right: 20, top: 0}}>
          <RectangleLine />
        </View>
      </CardBoxStyle>
      <CardBoxTwoStyle>
        <View
          style={{
            position: 'absolute',
            top: 0,
            right: 0,
          }}>
          <RectangleRed2 />
        </View>
        <View style={{position: 'absolute', right: 0, bottom: 0}}>
          <RectangleShadow2 />
        </View>
        <View style={{position: 'absolute', right: 20, top: 0}}>
          <RectangleLine2 />
        </View>
      </CardBoxTwoStyle>
    </CardStatusStyle>
  );
};

export default CardStatus;
