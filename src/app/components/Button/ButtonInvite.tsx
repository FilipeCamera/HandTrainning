import React, {useState} from 'react';
import {Space, Text} from 'components';

import Telegram from 'assets/svg/telegram.svg';

import {ButtonInviteStyle} from './styles';
import {useInvites, useVerification} from 'hooks';
import {showMessage} from 'react-native-flash-message';

interface ButtonProps {
  title: string;
  color: string;
  background: string;
  sendTitle: string;
  size: number;
  weight: number;
  onPress: () => any;
  to: any;
  from: any;
}

const ButtonInvite = ({
  title,
  color,
  size,
  weight,
  sendTitle,
  to,
  from,
}: ButtonProps) => {
  const [send, setSend] = useState(false);
  const {sendInvite} = useInvites();
  const {verifyUserAssociate, verifyUserType} = useVerification();
  const verify = (uid: any) => {
    return verifyUserType({
      uid: uid,
      onComplete: associate => {
        if (associate) {
          return verifyUserAssociate({
            uid: uid,
            onComplete: (error: any, value: boolean) => {
              if (value) {
                showMessage({type: 'warning', message: error});
                return false;
              } else {
                return true;
              }
            },
            onFail: error => {
              console.log('Erro:', error);
            },
          });
        } else {
          return true;
        }
      },
      onFail: err => {},
    });
  };

  const handleInviteSend = async (to, from) => {
    const status = await verify(from);

    if (status) {
      sendInvite(to.uid, from, {
        onComplete: () => {
          setSend(true);
        },
      });
    }
  };
  return (
    <ButtonInviteStyle
      onPress={() => handleInviteSend(to, from)}
      disabled={send}
      background={send}>
      <Telegram />
      <Space marginHorizontal={2} />
      <Text
        title={send ? sendTitle : title}
        size={size}
        weight={weight}
        color={color}
      />
    </ButtonInviteStyle>
  );
};

export default ButtonInvite;
