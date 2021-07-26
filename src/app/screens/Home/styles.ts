import {getStatusBarHeight} from 'react-native-status-bar-height';
import styled from 'styled-components/native';

export const HomeStyle = styled.View`
  flex: 1;
  background: #fff;
  margin-top: ${getStatusBarHeight()}px;
  padding: 16px;
  align-items: center;
`;
