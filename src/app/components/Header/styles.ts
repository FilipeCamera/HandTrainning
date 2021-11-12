import styled from 'styled-components/native';
import {getStatusBarHeight} from 'react-native-status-bar-height';
interface HeaderProps {
  marginBottom: number;
}

export const Container = styled.View<HeaderProps>`
  width: 100%;
  margin-top: ${getStatusBarHeight()}px;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: 0px 16px 0px 16px;
  ${props =>
    props.marginBottom ? `margin-bottom: ${props.marginBottom}px` : ''}
`;

export const HeaderStyle = styled.View`
  flex-direction: row;
  width: 100%;
  align-items: center;
  justify-content: space-between;
`;

export const IconLeft = styled.TouchableOpacity`
  position: absolute;
  left: 10px;
`;

export const IconRight = styled.TouchableOpacity`
  position: absolute;
  right: 10px;
`;

export const ButtonAlert = styled.TouchableOpacity``;
