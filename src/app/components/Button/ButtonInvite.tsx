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
  inviteSend: any[];
  setInviteSend: any;
}

const ButtonInvite = ({
  title,
  color,
  size,
  weight,
  sendTitle,
  to,
  from,
  inviteSend,
  setInviteSend,
}: ButtonProps) => {
  const [send, setSend] = useState(false);
  const [sends, setSends] = useState(
    inviteSend.length !== 0 ? inviteSend.some(invite => invite === from) : send,
  );
  const {sendInvite} = useInvites();
  const {verifyUserAssociate} = useVerification();
  const handleVerifySendInvite = (user, uid) => {
    verifyUserAssociate({
      uid: uid,
      onComplete: (error: any, value: boolean) => {
        if (value) {
          showMessage({type: 'warning', message: error});
        } else {
          sendInvite({
            to: user.uid,
            from: from,
            onComplete: () => {
              setInviteSend([...inviteSend, from]);
              setSend(true);
            },
            onFail: err => {},
          });
        }
      },
      onFail: error => {},
    });
  };
  return (
    <ButtonInviteStyle
      onPress={() => handleVerifySendInvite(to, from)}
      disabled={
        inviteSend.length !== 0
          ? inviteSend.some(invite => invite === from)
          : send
      }
      background={
        inviteSend.length !== 0
          ? inviteSend.some(invite => invite === from)
          : send
      }>
      <Telegram />
      <Space marginHorizontal={2} />
      <Text
        title={
          inviteSend.length !== 0 && inviteSend.some(invite => invite === from)
            ? sendTitle
            : title
        }
        size={size}
        weight={weight}
        color={color}
      />
    </ButtonInviteStyle>
  );
};

export default ButtonInvite;
