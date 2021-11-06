import {SimpleHeader, Space, Text} from 'components';
import React, {useEffect, useState} from 'react';
import {BackHandler, ScrollView, View} from 'react-native';

import GranLine from 'assets/svg/LineGran.svg';
import moment from 'moment';
import Colors from '@styles';
import {firestore} from 'firebase';
import {useSelector} from 'react-redux';
import {setVisualize} from 'functions';
import {useGetRequests, useGetWarnings} from 'hooks';

const Warnings = ({navigation}: any) => {
  const user = useSelector((state: any) => state.auth.user);

  const {getRequests} = useGetRequests();
  const {getWarningsTrainner, getWarnings} = useGetWarnings();
  const [requests, setRequests] = useState<any[]>([]);
  const [warnings, setWarnings] = useState<any[]>([]);

  const dateNow = Date.now();

  useEffect(() => {
    setVisualize();
  }, []);

  useEffect(() => {
    getRequests({
      uid: user.uid,
      onComplete: request => {
        const listRequest: any[] = [];
        if (request) {
          if (request.length !== 0) {
            request.map(req => {
              if (
                moment.unix(req.createdAt).format('DD/MM/YYYY') ===
                moment(dateNow).format('DD/MM/YYYY')
              ) {
                listRequest.push(req);
              }
            });
            console.log(listRequest);
            setRequests(listRequest);
          }
        }
      },
      onFail: err => {},
    });
    if (user.type === 'trainner') {
      if (!!user.userAssociate && user.userAssociate.length !== 0) {
        getWarningsTrainner({
          uid: user.userAssociate,
          onComplete: warnings => {
            const listWarnings: any[] = [];
            if (warnings) {
              warnings.map(wg => {
                if (wg.finallized !== dateNow && wg.finallized > dateNow) {
                  listWarnings.push(wg);
                }
              });
              setWarnings(listWarnings);
            }
          },
          onFail: err => [],
        });
      }
    }
    if (user.type === 'common') {
      if (user.userAssociate !== undefined) {
        getWarnings({
          uid: user.userAssociate,
          onComplete: warnings => {
            const listWarnings: any[] = [];
            if (warnings) {
              warnings.map(wg => {
                if (wg.finallized !== dateNow && wg.finallized > dateNow) {
                  listWarnings.push(wg);
                }
              });
              setWarnings(listWarnings);
            }
          },
          onFail: err => {},
        });
      }
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
