import Colors from '@styles';
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
    props.error ? Colors.redOpacity : Colors.inputBack};
  padding: 0 8px;
  font-size: 15px;
  ${(props: any) => (props.error ? `border: 1px solid ${Colors.red}` : '')}
  font-family: 'Poppins-Regular';
  flex-direction: row;
  align-items: ${(props: any) => (props.slogan ? 'flex-start' : 'center')};
  color: ${Colors.inputColorText};
  width: ${(props: any) => (props.width ? props.width : '95%')};
`;
