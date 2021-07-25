import styled from 'styled-components/native';

interface AvatarProps {
  error: boolean;
}

export const AvatarStyle = styled.TouchableOpacity<AvatarProps>`
  width: 140px;
  height: 140px;
  border-radius: 70px;
  ${(props: any) =>
    props.error ? 'border: 1px solid #FF6859' : 'border: 1px solid #fff'}
  align-items: center;
  justify-content: center;
  margin: 8px 0;
`;

export const ProfilePicBox = styled.View<AvatarProps>`
  width: 45px;
  height: 45px;
  border-radius: 23px;
  background: #fff;
  ${(props: any) =>
    props.error ? 'border: 1px solid #FF6859' : 'border: 1px solid #fff'}
  position: absolute;
  align-items: center;
  justify-content: center;
  top: 0;
  right: 0;
  elevation: 1;
`;
