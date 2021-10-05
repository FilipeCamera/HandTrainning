import Colors from '@styles';
import {getStatusBarHeight} from 'react-native-status-bar-height';
import styled from 'styled-components/native';

export const TrainningStyle = styled.ScrollView`
  flex: 1;
  background: ${Colors.background};
  padding-top: ${getStatusBarHeight()}px;
`;
