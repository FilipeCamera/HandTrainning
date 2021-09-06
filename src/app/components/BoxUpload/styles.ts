import styled from 'styled-components/native';

export const BoxStyle = styled.View`
  width: 95%;
`;

export const BoxContainer = styled.TouchableOpacity`
  width: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 16px;
  border-radius: 15px;
  background: #f1f4fa;
  border-style: dashed;
  border-width: 1px;
  border-color: ${(props: any) => (props.error ? '#FF6859' : '#d2d3d7')};
`;

export const ButtonUpload = styled.TouchableOpacity`
  width: 100%;
  padding: 16px;
  border-radius: 15px;
  background: #f1f4fa;
  border-style: dashed;
  border-width: 1px;
  border-color: #d2d3d7;
`;

export const BoxFooter = styled.View`
  flex-direction: row;
  width: 100%;
  align-items: baseline;
  justify-content: flex-start;
`;
