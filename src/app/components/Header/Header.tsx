import React from 'react';
import {View, Image} from 'react-native';
import {HeaderStyle, ButtonAlert} from './styles';

import Alert from 'assets/svg/bell-outline.svg';
import {Text} from 'components';
import {useSelector} from 'react-redux';
import Colors from '@styles';

const Header = () => {
  const user = useSelector((state: any) => state.auth.user);

  return (
    <HeaderStyle>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <View style={{width: 50, height: 50, borderRadius: 25}}>
          <Image
            source={{uri: user.avatar}}
            style={{width: '100%', height: '100%', borderRadius: 9999}}
          />
        </View>
        <View style={{flexDirection: 'column', marginLeft: 8}}>
          <Text
            title={user.name}
            size={16}
            weight={600}
            color={Colors.textColorBlack}
          />
          <Text
            title={user.type === 'gym' ? user.cnpj : user.slogan}
            size={12}
            weight={600}
            color={Colors.grayMediumLight}
          />
        </View>
      </View>
      <View>
        <ButtonAlert>
          <Alert />
        </ButtonAlert>
      </View>
    </HeaderStyle>
  );
};

export default Header;
