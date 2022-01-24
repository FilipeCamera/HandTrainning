import {SimpleHeader, Space, Text} from 'components';
import React, {useEffect, useState} from 'react';
import {BackHandler, ScrollView, View} from 'react-native';

import GranLine from 'assets/svg/LineGran.svg';
import moment from 'moment';
import Colors from '@styles';
import {useSelector} from 'react-redux';
import {setVisualize} from 'functions';
import {useGetWarnings} from 'hooks';
import {firestore} from 'firebase';

const Warnings = ({navigation}: any) => {
  const user = useSelector((state: any) => state.auth.user);

  const {getWarnings} = useGetWarnings();
  const [warnings, setWarnings] = useState<any[]>([]);

  useEffect(() => {
    setVisualize();
  }, []);

  useEffect(() => {
    getWarnings({
      uid: user.uid,
      onComplete: (warnings: any[]) => {
        if (warnings && warnings.length !== 0) {
          warnings.forEach(warning => {
            firestore()
              .collection('warnings')
              .doc(warning.id)
              .update({visualized: true});
          });
          setWarnings(warnings);
        }
      },
      onFail: (err: any) => {},
    });
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
    </ScrollView>
  );
};

export default Warnings;
