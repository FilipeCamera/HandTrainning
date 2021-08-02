import React, {useState} from 'react';
import {Space, Text} from 'components';

import Telegram from 'assets/svg/telegram.svg';

import {ButtonInviteStyle} from './styles';
import {useInvites} from 'hooks';

interface ButtonProps {
  title: string;
  color: string;
  background: string;
  sendTitle: string;
  size: number;
  weight: number;
  onPress: () => any;
  uid: any;
  from: any;
}

const ButtonInvite = ({
  title,
  color,
  size,
  weight,
  sendTitle,
  uid,
  from,
}: ButtonProps) => {
  const [send, setSend] = useState(false);
  const {sendInvite} = useInvites();

  const handleInviteSend = (uid: any, from: any) => {
    sendInvite(uid, from, {
      onComplete: (res: any) => {
        setSend(true);
      },
    });
  };
  return (
    <ButtonInviteStyle
      onPress={() => handleInviteSend(uid, from)}
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
