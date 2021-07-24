import styled from 'styled-components/native';

interface InputProps {
  slogan: boolean;
  width: number | string;
  error: boolean;
}

export const InputStyle = styled.View<InputProps>`
  height: ${(props: any) => (props.slogan ? '80px' : '56px')};
  border-radius: 10px;
  margin: 8px 0;
  background: ${(props: any) =>
    props.error ? 'rgba(255, 104, 89, 0.15)' : '#f1f4fa'};
  padding: 0 8px;
  font-size: 15px;
  ${(props: any) => (props.error ? 'border: 1px solid #FF6859' : '')}
  font-family: 'Poppins-Regular';
  flex-direction: row;
  align-items: ${(props: any) => (props.slogan ? 'flex-start' : 'center')};
  color: #1c2439;
  width: ${(props: any) => (props.width ? props.width : '95%')};
`;
