import React, {useState, useEffect} from 'react';
import {View, Image} from 'react-native';
import {HeaderStyle, ButtonAlert} from './styles';

import Alert from 'assets/svg/bell-outline.svg';
import ArrowExchange from 'assets/svg/arrowExchange.svg';
import {Space, Text} from 'components';
import {useSelector} from 'react-redux';
import Colors from '@styles';

interface HeaderProps {
  navigation: any;
  refresh?: boolean;
}

const Header = ({navigation, refresh}: HeaderProps) => {
  const user = useSelector((state: any) => state.auth.user);
  const visualized = useSelector((state: any) => state.visualized.visualized);

  const [info, setInfo] = useState(false);

  return (
    <>
      <HeaderStyle>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <View style={{width: 50, height: 50, borderRadius: 25}}>
            <Image
              source={{uri: user.avatar}}
              style={{width: '100%', height: '100%', borderRadius: 9999}}
            />
          </View>
          <View style={{flexDirection: 'column', marginLeft: 8}}>
            <View style={{width: 140}}>
              <Text
                title={user.name}
                size={14}
                weight={600}
                color={Colors.textColorBlack}
              />
            </View>
          </View>
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <Space marginHorizontal={8} />
          <ButtonAlert onPress={() => navigation.navigate('Warnings')}>
            {!visualized && !!info && (
              <View
                style={{
                  backgroundColor: Colors.red,
                  borderRadius: 7,
                  width: 14,
                  height: 14,
                  alignItems: 'center',
                  justifyContent: 'center',
                  position: 'absolute',
                  top: 2,
                  right: 2,
                  elevation: 1,
                }}
              />
            )}
            <Alert />
          </ButtonAlert>
        </View>
      </HeaderStyle>
    </>
  );
};

export default Header;
