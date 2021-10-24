import {Dimensions, PixelRatio, Platform} from 'react-native';

const {width} = Dimensions.get('window');

const scale = width / 320;

const normalize = (size: number) => {
  const newSize = size * scale;
  if (Platform.OS === 'ios') {
    return Math.round(PixelRatio.roundToNearestPixel(newSize)) + 1;
  } else {
    return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 5;
  }
};

export default normalize;
