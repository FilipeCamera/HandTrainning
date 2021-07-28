import {Dimensions, StyleSheet} from 'react-native';
import styled from 'styled-components/native';

const {width} = Dimensions.get('screen');

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

export const CardTrainnerStyle = styled.View`
  padding: 8px 0;
  background: #fff;
  border-radius: 20px;
  flex: 1;
  margin-right: 16px;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
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

    elevation: 14,
  },
});
