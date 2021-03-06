import Colors from '@styles';
import {Dimensions, StyleSheet} from 'react-native';
import styled from 'styled-components/native';

const {width, height} = Dimensions.get('screen');

export const CardStatusStyle = styled.View``;

export const CardBoxStyle = styled.View`
  background: #ff6859;
  width: ${width / 2}px;
  height: 100px;
  border-radius: 20px;
  margin-bottom: 8px;
  align-items: flex-start;
  padding: 10px 16px;
`;

export const CardBoxTwoStyle = styled.View`
  background: #ffb9b9;
  width: ${width / 2}px;
  height: 100px;
  border-radius: 20px;
  margin-top: 8px;
  align-items: flex-start;
  padding: 10px 16px;
`;

export const CardTrainnerStatusStyle = styled.View`
  padding: 8px 0;
  background: ${Colors.background};
  border-radius: 20px;
  flex: 1;
  margin-right: 16px;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  border: 1px solid ${Colors.grayMediumLight};
  border-style: dashed;
`;

export const CardCommonStyle = styled.View`
  background: #fff;
  width: 100%;
  margin: 40px 0;
  border-radius: 25px;
  height: 510px;
`;

export const CardTrainnerStyle = styled.View`
  background: ${Colors.background};
  width: 100%;
  margin: 40px 0;
  border-radius: 25px;
  height: 510px;
`;

export const CardMiniStyle = styled.View`
  flex-direction: row;
  align-items: center;
  padding: 8px 16px;
  border-radius: 20px;
  background: #fff;
  elevation: 4;
`;

export const styles = StyleSheet.create({
  shadow: {
    shadowColor: '#1C2439',
    shadowOffset: {
      width: 0,
      height: 7,
    },
    shadowOpacity: 0.41,
    shadowRadius: 9.11,

    elevation: 6,
  },
});
