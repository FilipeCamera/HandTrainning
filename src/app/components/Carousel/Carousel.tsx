import React, {useState, useRef} from 'react';
import {View, Dimensions, Image} from 'react-native';
import Carousel from 'react-native-snap-carousel';
import {Text} from 'components';
import {styles} from './styles';

const CarouselComponent = () => {
  const carouselRef = useRef(null);
  const {width} = Dimensions.get('screen');
  const data = [
    {
      title: 'Viagem para Morro do São Paulo',
      desc: 'Viagem de ida e volta, com tudo incluso',
      featured: 'R$ 100,00',
      image:
        'https://vemvoar.voeazul.com.br/wp-content/uploads/2020/12/Morro-de-Sao-Paulo8-1536x864.jpg',
    },
    {
      title: 'Viagem para Morro do São Paulo',
      desc: 'Viagem de ida e volta, com tudo incluso',
      featured: 'R$ 100,00',
    },
    {
      title: 'Viagem para Morro do São Paulo',
      desc: 'Viagem de ida e volta, com tudo incluso',
      featured: 'R$ 100,00',
    },
    {
      title: 'Viagem para Morro do São Paulo',
      desc: 'Viagem de ida e volta, com tudo incluso',
      featured: 'R$ 100,00',
    },
    {
      title: 'Viagem para Morro do São Paulo',
      desc: 'Viagem de ida e volta, com tudo incluso',
      featured: 'R$ 100,00',
    },
  ];

  const _renderItem = ({item}: any) => (
    <View
      style={[
        {
          width: '100%',
          height: 180,
          backgroundColor: '#342345',
          borderRadius: 20,
          marginTop: 20,
        },
        styles.shadow,
      ]}>
      {!!item.image && (
        <Image
          source={{uri: item.image}}
          style={{width: '100%', height: '100%', borderRadius: 20}}
        />
      )}
      <View
        style={{
          position: 'absolute',
          top: 16,
          right: 16,
          backgroundColor: '#34A853',
          borderRadius: 8,
          paddingHorizontal: 8,
          paddingVertical: 2,
        }}>
        <Text title={item.featured} size={15} weight={600} color="#FFF" />
      </View>
      <View
        style={{
          flexDirection: 'column',
          alignItems: 'flex-start',
          position: 'absolute',
          bottom: 16,
          left: 16,
          width: '90%',
        }}>
        <Text title={item.title} size={14} weight={500} color="#FFF" />
        <Text title={item.desc} size={12} weight={400} color="#FFF" />
      </View>
    </View>
  );
  return (
    <>
      <Carousel
        slideStyle={{backgroundColor: '#fff', paddingVertical: 16}}
        autoplay={true}
        horizontal={true}
        autoplayDelay={1000}
        autoplayInterval={5000}
        loop={true}
        layout="default"
        data={data}
        ref={carouselRef}
        renderItem={_renderItem}
        sliderWidth={width}
        itemWidth={width - 60}
        lockScrollWhileSnapping={true}
        enableMomentum={false}
        enableSnap={false}
      />
    </>
  );
};

export default CarouselComponent;
