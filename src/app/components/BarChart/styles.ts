import LinearGradient from 'react-native-linear-gradient';
import styled from 'styled-components/native';

interface BarLineProps {
  height: number;
  total: number;
}

export const BarChartStyle = styled.ScrollView`
  margin: 50px 0 0;
`;

export const BarLineRed = styled(LinearGradient).attrs({
  colors: ['#FE6759', '#D05449'],
  start: {x: 0, y: 0},
  end: {x: 0, y: 1},
})`
  width: 14px;
  border-radius: 4px;
  ${(props: BarLineProps) =>
    props.height ? `height: ${(props.height / props.total) * 100}px` : ''};
`;

export const BarLineRedLight = styled(LinearGradient).attrs({
  colors: ['#FFE0E0', '#FFC7C2'],
  start: {x: 0, y: 0},
  end: {x: 0, y: 1},
})`
  width: 14px;
  border-radius: 4px;
  ${(props: BarLineProps) =>
    props.height ? `height: ${(props.height / props.total) * 100}px` : ''};
`;

export const LinerCircle = styled(LinearGradient).attrs({
  colors: ['#FE6759', '#D05449'],
  start: {x: 0, y: 0},
  end: {x: 0, y: 1},
})`
  width: 10px;
  height: 10px;
  border-radius: 5px;
  margin-top: 5px;
`;
