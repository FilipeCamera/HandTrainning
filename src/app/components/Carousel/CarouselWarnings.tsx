import React, {useRef} from 'react';
import {View, Dimensions, Image} from 'react-native';
import Carousel from 'react-native-snap-carousel';
import {Text, Space} from 'components';
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
        alignItems: 'center',
        justifyContent: 'center',
        padding: 16,
      }}>
      <View
        style={{
          flexDirection: 'column',
          alignItems: 'flex-start',
        }}>
        <Text
          title={item.title}
          size={16}
          weight={600}
          color={Colors.textGrayMedium}
        />
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Text
            title="Aluno:"
            size={13}
            weight={500}
            color={Colors.textGrayMedium}
          />
          <Space marginHorizontal={2} />
          <Text
            title={item.desc}
            size={13}
            weight={400}
            color={Colors.textGrayMedium}
          />
        </View>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Text
            title="Preferência:"
            size={13}
            weight={500}
            color={Colors.textGrayMedium}
          />
          <Space marginHorizontal={2} />
          <Text
            title={item.preference}
            size={13}
            weight={400}
            color={Colors.textGrayMedium}
          />
        </View>
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
            height: 120,
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
