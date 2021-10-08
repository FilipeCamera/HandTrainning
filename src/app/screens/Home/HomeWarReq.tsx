import {SimpleHeader, Space, Text} from 'components';
import React, {useEffect} from 'react';
import {BackHandler, ScrollView, View} from 'react-native';

import GranLine from 'assets/svg/LineGran.svg';
import moment from 'moment';
import Colors from '@styles';

interface HomeWarReqProps {
  requests: any[];
  warnings: any[];
  onBack: (e: boolean) => any;
}

const HomeWarReq = ({onBack, warnings, requests}: HomeWarReqProps) => {
  const backChange = () => {
    onBack(false);
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
        onBack={() => onBack(false)}
        size={18}
        weight={600}
        color={Colors.textColorBlack}
      />
      <Space marginVertical={8} />
      {!!requests &&
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
                    title={moment(item.createdAt).format('DD/MM')}
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
                    title={moment(item.initial).format('DD/MM')}
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

export default HomeWarReq;
