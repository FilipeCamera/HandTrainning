import React, {useRef} from 'react';
import {View, Dimensions, Image} from 'react-native';
import Carousel from 'react-native-snap-carousel';
import {Text} from 'components';
import Colors from '@styles';

interface CarouselWarningsProps {
  data: any[];
}

const CarouselWarnings = ({data}: CarouselWarningsProps) => {
  const carouselRef = useRef(null);
  const {width} = Dimensions.get('window');

  const _renderItem = ({item}: any) => (
    <View
      style={{
        flex: 1,
      }}>
      {!!item.image && (
        <View style={{width: 50, height: 50, borderRadius: 25}}>
          <Image
            source={{uri: item.image}}
            style={{width: '100%', height: '100%', borderRadius: 9999}}
          />
        </View>
      )}
      <View
        style={{
          flexDirection: 'column',
          alignItems: 'flex-start',
          position: 'absolute',
          bottom: 16,
          left: 16,
          width: '90%',
        }}>
        <Text
          title="Solicitação de novo treino"
          size={14}
          weight={600}
          color={Colors.textGrayMedium}
        />
        <Text
          title={item.desc}
          size={12}
          weight={400}
          color={Colors.textGrayMedium}
        />
      </View>
    </View>
  );
  return (
    <>
      {data.length !== 0 ? (
        <Carousel
          slideStyle={{
            backgroundColor: Colors.background,
            borderWidth: 1,
            borderStyle: 'dashed',
            borderColor: Colors.grayLight,
            borderRadius: 20,
          }}
          autoplay={true}
          horizontal={true}
          autoplayDelay={500}
          autoplayInterval={1500}
          loop={true}
          layout="default"
          data={data}
          ref={carouselRef}
          renderItem={_renderItem}
          sliderWidth={width}
          itemWidth={width - 100}
          lockScrollWhileSnapping={true}
          enableMomentum={false}
          enableSnap={false}
        />
      ) : null}
    </>
  );
};

export default CarouselWarnings;
