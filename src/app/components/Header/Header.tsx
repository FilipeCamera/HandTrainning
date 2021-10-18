import React, {useState, useEffect} from 'react';
import {View, Image} from 'react-native';
import {HeaderStyle, ButtonAlert} from './styles';

import Alert from 'assets/svg/bell-outline.svg';
import ArrowExchange from 'assets/svg/arrowExchange.svg';
import {Modal, Space, Text} from 'components';
import {useSelector} from 'react-redux';
import Colors from '@styles';
import {firestore} from 'firebase';
import {setGymId, setNotVisualize} from 'functions';
import moment from 'moment';

interface HeaderProps {
  navigation: any;
}

const Header = ({navigation}: HeaderProps) => {
  const user = useSelector((state: any) => state.auth.user);
  const gym = useSelector((state: any) => state.trainner.gym);
  const visualized = useSelector((state: any) => state.visualized.visualized);
  const [info, setInfo] = useState(false);
  const [visible, setVisible] = useState(false);
  const [gyms, setGyms] = useState<any[]>([]);

  useEffect(() => {
    if (gym === undefined) {
      setVisible(true);
    }
    if (user.type === 'trainner') {
      firestore()
        .collection('users')
        .where('type', '==', 'gym')
        .where('uid', 'in', user.userAssociate)
        .get()
        .then(querySnapshot => {
          const listGyms = querySnapshot.docs.map(doc => doc.data());
          setGyms(listGyms);
        })
        .catch(err => {});
    }
  }, []);
  const dateNow = Date.now();

  useEffect(() => {
    if (user.type === 'trainner') {
      firestore()
        .collection('requests')
        .where('trainnerId', '==', user.uid)
        .get()
        .then(querySnapshot => {
          const request = querySnapshot.docs.map(doc => doc.data());
          if (request.length !== 0) {
            request.map(req => {
              if (
                moment.unix(req.createdAt).format('DD/MM/YYYY') ===
                moment(dateNow).format('DD/MM/YYYY')
              ) {
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
    }
    if (user.type === 'common') {
      if (user.userAssociate !== undefined) {
        firestore()
          .collection('warning')
          .where('gym', '==', user.userAssociate)
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
      }
    }
  }, []);

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
      <Modal
        visible={visible}
        setVisible={setVisible}
        gyms={gyms}
        setGym={setGymId}
        title="Trocar academia"
      />
    </>
  );
};

export default Header;
