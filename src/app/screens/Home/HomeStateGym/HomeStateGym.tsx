import {ButtonText, SimpleHeader, Space, Text} from 'components';
import React, {useEffect, useState} from 'react';
import {BackHandler, Image, View} from 'react-native';
import {CardStyle, HomeStateStyle} from './styles';

import GranLine from 'assets/svg/LineGran.svg';
import moment from 'moment';
import {firestore} from 'firebase';
import Colors from '@styles';

interface HomeStateGymProps {
  title: string;
  onBack: any;
  data: any[];
  type: string;
  setData: any;
}

const HomeStateGym = ({
  title,
  onBack,
  data,
  type,
  setData,
}: HomeStateGymProps) => {
  const backChange = () => {
    onBack('');
    return true;
  };
  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backChange,
    );
    return () => backHandler.remove();
  }, []);

  const handleDelete = (type: any, title: any, index: number) => {
    firestore()
      .collection(`${type}`)
      .where('title', '==', title)
      .get()
      .then(querySnapshot => {
        const doc = querySnapshot.docs.map(doc => doc.id);
        firestore().collection(`${type}`).doc(doc[0]).delete();
        data.splice(index, 1);
      })
      .catch(error => {});
  };
  return (
    <HomeStateStyle
      contentContainerStyle={{
        flexGrow: 1,
        padding: 16,
        alignItems: 'center',
        width: '100%',
      }}
      showsVerticalScrollIndicator={false}>
      <SimpleHeader
        title={title}
        back
        onBack={onBack}
        size={18}
        weight={600}
        color={Colors.textColorBlack}
      />
      <Space marginVertical={8} />
      {!!data &&
        data.map((item, index) => {
          return (
            <CardStyle key={item.title}>
              <Space marginVertical={8} />
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}>
                {!!item.image && (
                  <View style={{width: 50, height: 50, borderRadius: 20}}>
                    <Image
                      source={{uri: item.image}}
                      style={{width: '100%', height: '100%', borderRadius: 20}}
                    />
                  </View>
                )}
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
                  {!!item.emphasi && (
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                      }}>
                      <Text
                        title={item.emphasi}
                        weight={500}
                        size={12}
                        color={Colors.inputColorText}
                      />
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
                  )}
                </View>
                <View>
                  {!item.emphasi && (
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
                  )}
                </View>
              </View>
              <Space marginVertical={4} />
              <View style={{position: 'absolute', top: 0, right: 0}}>
                <ButtonText
                  title="apagar"
                  size={12}
                  weight={500}
                  color={Colors.red}
                  onPress={() => handleDelete(type, item.title, index)}
                />
              </View>
              <GranLine width="100%" />
            </CardStyle>
          );
        })}
    </HomeStateStyle>
  );
};

export default HomeStateGym;
