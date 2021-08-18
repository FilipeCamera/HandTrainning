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
  const {verifyUserAssociate, verifyUserIsGym} = useVerification();
  const [status, setStatus] = useState(false);
  const verify = async ({user, uid}: any) => {
    await verifyUserIsGym(user, uid, {
      onComplete: async (error: any) => {
        if (error) {
          showMessage({type: 'warning', message: error});
          setStatus(false);
        } else {
          await verifyUserAssociate(uid, {
            onComplete: (error: any) => {
              if (error) {
                showMessage({type: 'warning', message: error});
                setStatus(false);
              } else {
                setStatus(true);
              }
            },
            onFail: error => {
              console.log(error);
            },
          });
        }
      },
      onFail: error => console.log(error),
    });
  };

  const handleInviteSend = async (to, from) => {
    await verify({user: to, uid: from});
    console.log('status:', status);
    if (status) {
      sendInvite(to.uid, from, {
        onComplete: () => {
          setSend(true);
        },
      });
    }
    console.log('send:', send);
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
