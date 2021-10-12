import React, {useState, useEffect} from 'react';
import {View, Image} from 'react-native';
import {HeaderStyle, ButtonAlert} from './styles';

import Alert from 'assets/svg/bell-outline.svg';
import ArrowExchange from 'assets/svg/arrowExchange.svg';
import {Space, Text} from 'components';
import {useSelector} from 'react-redux';
import Colors from '@styles';
import {firestore} from 'firebase';
import {setNotVisualize} from 'functions';

interface HeaderProps {
  navigation: any;
  setVisible?: any;
}

const Header = ({navigation, setVisible}: HeaderProps) => {
  const user = useSelector((state: any) => state.auth.user);
  const visualized = useSelector((state: any) => state.visualized.visualized);

  const [info, setInfo] = useState(false);

  const dateNow = Date.now();

  useEffect(() => {
    firestore()
      .collection('requests')
      .where('trainnerId', '==', user.uid)
      .get()
      .then(querySnapshot => {
        const request = querySnapshot.docs.map(doc => doc.data());
        if (request.length !== 0) {
          request.map(req => {
            if (req.createdAt === dateNow) {
              setInfo(true);
              setNotVisualize();
            }
          });
        }
      })
      .catch(err => {});
    firestore()
      .collection('warning')
      .where('gym', 'in', user.userAssociate)
      .get()
      .then(querySnapshot => {
        const warnings = querySnapshot.docs.map(doc => doc.data());

        if (warnings.length !== 0) {
          warnings.map(wg => {
            if (wg.finallized !== dateNow && wg.finallized > dateNow) {
              setInfo(true);
              setNotVisualize();
            }
          });
        }
      });
  }, []);

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
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
        {user.type === 'trainner' && (
          <ButtonAlert onPress={() => setVisible(true)}>
            <ArrowExchange />
          </ButtonAlert>
        )}
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
  );
};

export default Header;
