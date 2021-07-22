import styled from 'styled-components/native';

interface HeaderProps {
  marginBottom: number;
}

export const Container = styled.View<HeaderProps>`
  width: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: 16px;
  ${props =>
    props.marginBottom ? `margin-bottom: ${props.marginBottom}px` : ''}
`;

export const IconLeft = styled.TouchableOpacity`
  position: absolute;
  left: 10px;
`;

export const IconRight = styled.TouchableOpacity`
  position: absolute;
  right: 10px;
`;
