import React from 'react';

import RectangleRed from 'assets/svg/Rectangle16.svg';
import RectangleLine from 'assets/svg/Rectangle14.svg';
import RectangleShadow from 'assets/svg/Rectangle15.svg';
import RectangleRed2 from 'assets/svg/Rectangle17.svg';
import RectangleLine2 from 'assets/svg/Rectangle19.svg';
import RectangleShadow2 from 'assets/svg/Rectangle18.svg';
import DownIcon from 'assets/svg/Down.svg';
import UpIcon from 'assets/svg/Up.svg';
import {CardStatusStyle, CardBoxTwoStyle, CardBoxStyle} from './styles';
import {View} from 'react-native';
import {Text} from 'components';

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
        <View>
          <View>
            <Text
              title="Ganhos de usuários"
              size={14}
              weight={600}
              color="#fff"
            />
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'flex-start',
            }}>
            <Text title="16" size={22} weight={500} color="#FFF" />
            <UpIcon />
          </View>
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
        <View>
          <View>
            <Text
              title="Usuários desvinculados"
              size={14}
              weight={600}
              color="#662924"
            />
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'flex-start',
            }}>
            <Text title="12" size={22} weight={500} color="#662924" />
            <DownIcon />
          </View>
        </View>
      </CardBoxTwoStyle>
    </CardStatusStyle>
  );
};

export default CardStatus;
