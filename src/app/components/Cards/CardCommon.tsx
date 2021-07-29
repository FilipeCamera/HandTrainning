import React from 'react';
import {Image, TouchableOpacity, View} from 'react-native';
import {CardCommonStyle} from './styles';

import Refresh from 'assets/svg/refresh.svg';
import RectangleRed from 'assets/svg/RectangleRed.svg';
import RunnerRed from 'assets/svg/RunnerRed.svg';

import {styles} from '../Board/styles';
import {useSelector} from 'react-redux';
import {ButtonText, Space, Text} from 'components';

const CardCommon = () => {
  const user = useSelector((state: any) => state.auth.user);
  return (
    <CardCommonStyle style={styles.shadow}>
      <RectangleRed width="100%" style={{position: 'absolute', top: -14}} />
      <RunnerRed
        width="220px"
        height="290px"
        style={{position: 'absolute', right: 0, bottom: 60}}
      />
      <View
        style={{
          padding: 16,
          width: 130,
          alignItems: 'center',
          justifyContent: 'flex-start',
          marginVertical: 10,
        }}>
        <Text title="Seu Treino" size={30} weight={700} color="#FFF" />
      </View>
      <View>
        <View style={{padding: 16}}>
          <Text title="Treinador" size={16} weight={600} color="#090A0A" />
          <View
            style={{flexDirection: 'row', alignItems: 'center', marginTop: 5}}>
            <View style={{width: 60, height: 60, borderRadius: 30}}>
              <Image
                source={{
                  uri: 'https://images.unsplash.com/photo-1626806810916-f895a624c6f0?ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw0fHx8ZW58MHx8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
                }}
                style={{width: '100%', height: '100%', borderRadius: 9999}}
              />
            </View>
            <TouchableOpacity
              style={{
                marginLeft: 10,
                backgroundColor: '#F1F4FA',
                padding: 8,
                borderRadius: 9999,
              }}>
              <Refresh width="18px" height="18px" />
            </TouchableOpacity>
          </View>
          <View style={{marginTop: 16}}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Text title="Nome:" size={14} weight={600} color="#090A0A" />
              <Space marginHorizontal={2.5} />
              <Text title={user.name} size={14} weight={600} color="#090A0A" />
            </View>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Text title="Formação:" size={14} weight={600} color="#090A0A" />
              <Space marginHorizontal={2.5} />
              <Text title={user.name} size={14} weight={600} color="#090A0A" />
            </View>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Text
                title="Experiência:"
                size={14}
                weight={600}
                color="#090A0A"
              />
              <Space marginHorizontal={2.5} />
              <Text title={user.name} size={14} weight={600} color="#090A0A" />
            </View>
          </View>
        </View>
      </View>
      <View
        style={{
          position: 'absolute',
          bottom: 0,
          alignSelf: 'center',
          marginVertical: 8,
        }}>
        <ButtonText
          title="Visualizar treino"
          size={12}
          weight={500}
          color="#FF6859"
        />
      </View>
    </CardCommonStyle>
  );
};

export default CardCommon;
