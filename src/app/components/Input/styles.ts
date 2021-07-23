import styled from 'styled-components/native';

interface InputProps {
  slogan: boolean;
  width: number | string;
}

export const InputStyle = styled.View<InputProps>`
  height: ${(props: any) => (props.slogan ? '80px' : '56px')};
  border-radius: 10px;
  margin: 8px 0;
  background: #f1f4fa;
  padding: 0 8px;
  font-size: 15px;
  font-family: 'Poppins-Regular';
  flex-direction: row;
  align-items: ${(props: any) => (props.slogan ? 'flex-start' : 'center')};
  color: #1c2439;
  width: ${(props: any) => (props.width ? props.width : '95%')};
`;
