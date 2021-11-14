import Colors from '@styles';
import {getStatusBarHeight} from 'react-native-status-bar-height';
import styled from 'styled-components/native';

export const HomeStyle = styled.ScrollView`
  flex: 1;
  background: ${Colors.background};
  padding-top: ${getStatusBarHeight()}px;
`;

export const NotifyStyle = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;
