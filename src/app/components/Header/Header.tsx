import React, {useState, useEffect} from 'react';
import {View, Image} from 'react-native';
import {HeaderStyle, ButtonAlert} from './styles';

import Alert from 'assets/svg/bell-outline.svg';
import {Text} from 'components';
import {useSelector} from 'react-redux';
import Colors from '@styles';
import {firestore} from 'firebase';
import moment from 'moment';

interface HeaderProps {
  navigation: any;
}

const Header = ({navigation}: HeaderProps) => {
  const user = useSelector((state: any) => state.auth.user);
  const [visualized, setVisualized] = useState(false);
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
            if (
              req.createdAt !== dateNow &&
              moment(dateNow).format('DD') -
                moment.unix(req.createdAt).format('DD') <=
                7
            ) {
              setInfo(true);
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
      <View>
        <ButtonAlert
          onPress={() => navigation.navigate('Warnings', {setVisualized})}>
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
