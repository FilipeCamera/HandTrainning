import {SimpleHeader, Space, Text} from 'components';
import React, {useEffect, useState} from 'react';
import {BackHandler, ScrollView, View} from 'react-native';

import GranLine from 'assets/svg/LineGran.svg';
import moment from 'moment';
import Colors from '@styles';
import {firestore} from 'firebase';
import {useSelector} from 'react-redux';
import {setVisualize} from 'functions';

const Warnings = ({navigation}: any) => {
  const user = useSelector((state: any) => state.auth.user);
  const [requests, setRequests] = useState<any[]>([]);
  const [warnings, setWarnings] = useState<any[]>([]);

  const dateNow = Date.now();

  useEffect(() => {
    setVisualize();
  }, []);

  useEffect(() => {
    firestore()
      .collection('requests')
      .where('trainnerId', '==', user.uid)
      .get()
      .then(querySnapshot => {
        const listRequest: any[] = [];
        const request = querySnapshot.docs.map(doc => doc.data());
        request.map(req => {
          if (
            moment.unix(req.createdAt.seconds).format('DD/MM/YYYY') ===
            moment(dateNow).format('DD/MM/YYYY')
          ) {
            listRequest.push(req);
          }
        });
        console.log(listRequest);
        setRequests(listRequest);
      })
      .catch(err => {});
    if (user.type === 'trainner') {
      firestore()
        .collection('warning')
        .where('gym', 'in', user.userAssociate)
        .get()
        .then(querySnapshot => {
          const listWarnings: any[] = [];
          const warning = querySnapshot.docs.map(doc => doc.data());
          warning.map(wg => {
            if (wg.finallized !== dateNow && wg.finallized > dateNow) {
              listWarnings.push(wg);
            }
          });
          setWarnings(listWarnings);
        });
    }
    if (user.type === 'common') {
      firestore()
        .collection('warning')
        .where('gym', '==', user.userAssociate)
        .get()
        .then(querySnapshot => {
          const listWarnings: any[] = [];
          const warning = querySnapshot.docs.map(doc => doc.data());
          warning.map(wg => {
            if (wg.finallized !== dateNow && wg.finallized > dateNow) {
              listWarnings.push(wg);
            }
          });
          setWarnings(listWarnings);
        });
    }
  }, []);

  const backChange = () => {
    navigation.goBack();
    return true;
  };
  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backChange,
    );
    return () => backHandler.remove();
  }, []);

  return (
    <ScrollView
      style={{backgroundColor: Colors.background}}
      contentContainerStyle={{
        flexGrow: 1,
        padding: 16,
        alignItems: 'center',
        width: '100%',
      }}
      showsVerticalScrollIndicator={false}>
      <SimpleHeader
        title="Avisos"
        back
        onBack={() => backChange()}
        size={18}
        weight={600}
        color={Colors.textColorBlack}
      />
      <Space marginVertical={8} />
      {!!requests &&
        requests.length !== 0 &&
        requests.map((item, index) => {
          return (
            <View style={{width: '100%', marginVertical: 8}} key={index}>
              <Space marginVertical={8} />
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}>
                <View style={{width: 250}}>
                  <Text
                    title={item.title}
                    weight={600}
                    size={15}
                    color={Colors.textColorBlack}
                  />
                  <Text
                    title={item.desc}
                    weight={400}
                    size={12}
                    color={Colors.inputColorText}
                  />
                </View>
                <View
                  style={{
                    backgroundColor: Colors.grayLight,
                    paddingVertical: 2,
                    paddingHorizontal: 8,
                    borderRadius: 8,
                  }}>
                  <Text
                    title={moment.unix(item.createdAt).format('DD/MM')}
                    weight={600}
                    size={12}
                    color={Colors.textColorRX}
                  />
                </View>
              </View>
              <Space marginVertical={4} />
              <GranLine width="100%" />
            </View>
          );
        })}
      {!!warnings &&
        warnings.length !== 0 &&
        warnings.map((item, index) => {
          return (
            <View style={{width: '100%', marginVertical: 8}} key={index}>
              <Space marginVertical={8} />
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}>
                <View style={{width: 250}}>
                  <Text
                    title={item.title}
                    weight={600}
                    size={15}
                    color={Colors.textColorBlack}
                  />
                  <Text
                    title={item.desc}
                    weight={400}
                    size={12}
                    color={Colors.inputColorText}
                  />
                </View>
                <View
                  style={{
                    backgroundColor: Colors.grayLight,
                    paddingVertical: 2,
                    paddingHorizontal: 8,
                    borderRadius: 8,
                  }}>
                  <Text
                    title={moment.unix(item.initial).format('DD/MM')}
                    weight={600}
                    size={12}
                    color={Colors.textColorRX}
                  />
                </View>
              </View>
              <Space marginVertical={4} />
              <GranLine width="100%" />
            </View>
          );
        })}
    </ScrollView>
  );
};

export default Warnings;
