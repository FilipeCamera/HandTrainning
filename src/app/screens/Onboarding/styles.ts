import LinearGradient from 'react-native-linear-gradient';
import {getStatusBarHeight} from 'react-native-status-bar-height';
import styled from 'styled-components/native';

export const Background = styled(LinearGradient).attrs({
  colors: ['#FF6859', '#B2483E'],
  start: {x: 0, y: 0},
  end: {x: 0, y: 1},
})`
  flex: 1;
  height: 100%;
  padding-top: ${getStatusBarHeight()}px;
`;

export const Container = styled.View`
  flex: 1;
  background: #fff;
  align-items: center;
  justify-content: center;
`;

export const ContainerTwo = styled.View`
  flex: 1;
  background: #fff;
`;
