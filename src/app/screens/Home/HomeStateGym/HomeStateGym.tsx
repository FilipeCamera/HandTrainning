import {ButtonText, SimpleHeader, Space, Text} from 'components';
import React, {useEffect} from 'react';
import {BackHandler, Image, View} from 'react-native';
import {CardStyle, HomeStateStyle} from './styles';

import GranLine from 'assets/svg/LineGran.svg';
import moment from 'moment';

interface HomeStateGymProps {
  title: string;
  onBack: () => any;
  data: any[];
}

const HomeStateGym = ({title, onBack, data}: HomeStateGymProps) => {
  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      onBack,
    );
    return () => backHandler.remove();
  }, []);

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
        color="#090a0a"
      />
      <Space marginVertical={8} />
      {!!data &&
        data.map(item => {
          return (
            <CardStyle key={item.uid}>
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
                    color="#090a0a"
                  />
                  <Text
                    title={item.desc}
                    weight={400}
                    size={12}
                    color="#1C2439"
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
                        color="#1C2439"
                      />
                      <View
                        style={{
                          backgroundColor: '#D2D3D7',
                          paddingVertical: 2,
                          paddingHorizontal: 8,
                          borderRadius: 8,
                        }}>
                        <Text
                          title={moment(item.initial).format('DD/MM')}
                          weight={600}
                          size={12}
                          color="#454459"
                        />
                      </View>
                    </View>
                  )}
                </View>
                <View>
                  {!item.emphasi && (
                    <View
                      style={{
                        backgroundColor: '#D2D3D7',
                        paddingVertical: 2,
                        paddingHorizontal: 8,
                        borderRadius: 8,
                      }}>
                      <Text
                        title={moment(item.initial).format('DD/MM')}
                        weight={600}
                        size={12}
                        color="#454459"
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
                  color="#FF6859"
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