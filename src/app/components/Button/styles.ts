import {StyleSheet} from 'react-native';
import styled from 'styled-components/native';

interface ButtonProps {
  background: string;
}

export const ButtonStyle = styled.TouchableOpacity``;

export const ButtonContainer = styled.View<ButtonProps>`
  background: ${(props: any) => props.background || '#fff'};
  margin: 8px 0;
  height: 56px;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
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
});
