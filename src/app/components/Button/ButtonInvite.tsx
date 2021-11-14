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
  const handleVerifySendInvite = (user, uid) => {
    verifyUserType({
      uid: uid,
      onComplete: (associate: boolean) => {
        if (associate) {
          verifyUserAssociate({
            uid: uid,
            onComplete: (error: any, value: boolean) => {
              console.log(value);
              if (value) {
                showMessage({type: 'warning', message: error});
              } else {
                sendInvite({
                  to: user.uid,
                  from: from,
                  onComplete: () => {
                    setSend(true);
                  },
                  onFail: err => {},
                });
              }
            },
            onFail: error => {
              console.log('Erro:', error);
            },
          });
        } else {
          sendInvite({
            to: user.uid,
            from: from,
            onComplete: () => {
              setSend(true);
            },
            onFail: err => {},
          });
        }
      },
      onFail: err => {},
    });
  };

  return (
    <ButtonInviteStyle
      onPress={() => handleVerifySendInvite(to, from)}
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
