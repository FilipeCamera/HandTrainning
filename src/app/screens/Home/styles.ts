import {getStatusBarHeight} from 'react-native-status-bar-height';
import styled from 'styled-components/native';

export const HomeStyle = styled.ScrollView`
  flex: 1;
  background: #fff;
  padding-top: ${getStatusBarHeight()}px;
`;
