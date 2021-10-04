import Colors from '@styles';
import {Dimensions, StyleSheet} from 'react-native';
import styled from 'styled-components/native';

const {height} = Dimensions.get('screen');

interface ButtonProps {
  background: string;
  border: boolean;
}

interface ButtonInviteProps {
  background: boolean;
}

export const ButtonStyle = styled.TouchableOpacity`
  width: 95%;
  margin: 8px 0;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  background: ${(props: any) => props.background || Colors.background};
  ${(props: any) =>
    props.border ? `border: 1px solid ${Colors.lightGray}` : ''}
`;

export const ButtonRedStyle = styled.TouchableOpacity`
  width: 95%;
  align-items: center;
  justify-content: center;
  height: 56px;
  border-radius: 8px;
  background: ${Colors.red};
`;

export const ButtonInviteStyle = styled.TouchableOpacity<ButtonInviteProps>`
  align-items: center;
  justify-content: center;
  background: ${(props: any) => (props.background ? Colors.gray : Colors.red)};
  flex-direction: row;
  align-items: center;
  flex: 1;
  border-radius: 5px;
  padding: 2px 8px;
  justify-content: space-evenly;
`;

export const CardButtonStyle = styled.TouchableOpacity`
  width: 90%;
  margin: 8px 0;
`;

export const CircleButtonStyle = styled.TouchableOpacity`
  background: ${Colors.background};
  width: 50px;
  height: 50px;
  border-radius: 25px;
  align-items: center;
  justify-content: center;
`;

export const CardButtonContainer = styled.View`
  width: 100%;
  height: ${(height / 100) * 20}px;
  background: rgba(0, 0, 0, 0.25);
  border-radius: 20px;
  align-items: center;
  justify-content: center;
`;

export const ButtonStyleText = styled.TouchableOpacity`
  align-items: center;
  justify-content: center;
`;

export const ButtonContainer = styled.View<ButtonProps>`
  height: 56px;
  align-items: center;
  justify-content: center;
  width: 100%;
`;

export const ButtonIcon = styled.View`
  position: absolute;
  left: 25px;
`;

export const ButtonMiniRedStyle = styled.TouchableOpacity`
  background: ${Colors.red};
  border-radius: 5px;
  padding: 4px 8px;
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

    elevation: 8,
  },
  shadowRed: {
    shadowColor: '#3A296A',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,

    elevation: 4,
  },
});
