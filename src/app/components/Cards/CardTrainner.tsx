import React from 'react';

import RectangleRed from 'assets/svg/RectangleRed.svg';
import Star from 'assets/svg/stars.svg';
import TrainnerActivity from 'assets/svg/trainner_activity.svg';
import {CardTrainnerStyle, styles} from './styles';
import {Image, View} from 'react-native';
import {ButtonText, Space, Text} from 'components';

const CardTrainner = () => {
  return (
    <CardTrainnerStyle style={styles.shadow}>
      <RectangleRed width="100%" style={{position: 'absolute', top: -14}} />
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: 16,
          marginBottom: 20,
        }}>
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'flex-start',
            width: 130,
          }}>
          <Text
            title="Seus Alunos"
            size={30}
            weight={700}
            color="#FFF"
            style={{width: 130}}
          />
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Star />
          <Text
            title="9.5"
            size={12}
            weight={700}
            color="#E56000"
            style={{position: 'absolute', bottom: 10}}
          />
        </View>
      </View>
      <View style={{padding: 16}}>
        <Text title="Alunos" size={16} weight={600} color="#090A0A" />
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <View style={{width: 40, height: 40, borderRadius: 20}}>
              <Image
                source={{
                  uri: 'https://images.unsplash.com/photo-1626806810916-f895a624c6f0?ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw0fHx8ZW58MHx8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
                }}
                style={{
                  width: '100%',
                  height: '100%',
                  borderRadius: 9999,
                  borderWidth: 2,
                  borderColor: '#fff',
                }}
              />
            </View>
            <View
              style={{
                width: 40,
                height: 40,
                borderRadius: 20,
                marginLeft: -25,
              }}>
              <Image
                source={{
                  uri: 'https://images.unsplash.com/photo-1626806810916-f895a624c6f0?ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw0fHx8ZW58MHx8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
                }}
                style={{
                  width: '100%',
                  height: '100%',
                  borderRadius: 9999,
                  borderWidth: 2,
                  borderColor: '#fff',
                }}
              />
            </View>
            <View
              style={{
                width: 40,
                height: 40,
                borderRadius: 20,
                marginLeft: -25,
              }}>
              <Image
                source={{
                  uri: 'https://images.unsplash.com/photo-1626806810916-f895a624c6f0?ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw0fHx8ZW58MHx8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
                }}
                style={{
                  width: '100%',
                  height: '100%',
                  borderRadius: 9999,
                  borderWidth: 2,
                  borderColor: '#fff',
                }}
              />
            </View>
            <Space marginHorizontal={2} />
            <Text title="+14" size={12} weight={500} color="#CC5347" />
          </View>
          <View>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Text title="Total:" size={14} weight={600} color="#090A0A" />
              <Space marginHorizontal={2.5} />
              <Text title="18 alunos" size={14} weight={500} color="#090A0A" />
            </View>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Text
                title="Novo treino:"
                size={14}
                weight={600}
                color="#090A0A"
              />
              <Space marginHorizontal={2.5} />
              <Text
                title="5 solicitações"
                size={14}
                weight={500}
                color="#090A0A"
              />
            </View>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Text
                title="Maior frequência: "
                size={14}
                weight={600}
                color="#090A0A"
              />
              <Space marginHorizontal={2.5} />
              <Text title="Diabetes" size={14} weight={500} color="#090A0A" />
            </View>
          </View>
        </View>
      </View>
      <TrainnerActivity
        style={{alignSelf: 'center', marginTop: 10}}
        width="95%"
      />
      <View
        style={{
          position: 'absolute',
          bottom: 0,
          alignSelf: 'center',
          marginVertical: 8,
        }}>
        <ButtonText title="Visualizar" size={12} weight={500} color="#FF6859" />
      </View>
    </CardTrainnerStyle>
  );
};

export default CardTrainner;
