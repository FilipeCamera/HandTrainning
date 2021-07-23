import LinearGradient from 'react-native-linear-gradient';
import styled from 'styled-components/native';
import {Dimensions} from 'react-native';
import {getStatusBarHeight} from 'react-native-status-bar-height';
const {width, height} = Dimensions.get('screen');

interface AbsoluteProps {
  top: number;
  left: number;
  right: number;
  bottom: number;
}

export const Background = styled(LinearGradient).attrs({
  colors: ['#FF6859', '#B2483E'],
  start: {x: 0, y: 0},
  end: {x: 0, y: 1},
})`
  flex: 1;
  height: 100%;
  padding-top: ${getStatusBarHeight()}px;
`;

export const Absolute = styled.View<AbsoluteProps>`
  position: absolute;
  ${(props: AbsoluteProps) =>
    props.top ? `top: ${(height / 100) * props.top}px` : ''};
  ${(props: AbsoluteProps) =>
    props.left ? `left: ${(width / 100) * props.left}px` : ''};
  ${(props: AbsoluteProps) =>
    props.right ? `right: ${(width / 100) * props.right}px` : ''};
  ${(props: AbsoluteProps) =>
    props.bottom ? `bottom: ${(height / 100) * props.bottom}px` : ''};
`;
