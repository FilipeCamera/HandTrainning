import {StyleSheet} from 'react-native';
import styled from 'styled-components/native';

interface ButtonProps {
  background: string;
  border: boolean;
}

export const ButtonStyle = styled.TouchableOpacity`
  width: 95%;
  align-items: center;
  justify-content: center;
`;

export const ButtonStyleText = styled.TouchableOpacity`
  align-items: center;
  justify-content: center;
`;

export const ButtonContainer = styled.View<ButtonProps>`
  background: ${(props: any) => props.background || '#fff'};
  margin: 8px 0;
  height: 56px;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  width: 100%;
  ${(props: any) => (props.border ? 'border: 1px solid #dedede' : '')}
`;

export const ButtonIcon = styled.View`
  position: absolute;
  left: 25px;
`;

export const styles = StyleSheet.create({
  shadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.58,
    shadowRadius: 16.0,

    elevation: 24,
  },
  shadowRed: {
    shadowColor: '#3A296A',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,

    elevation: 8,
  },
});
