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
  const {verifyUserAssociate, verifyUserIsType} = useVerification();
  const verify = async ({user, uid}: any) => {
    return await verifyUserIsType(user, uid, {
      onComplete: async (error: any) => {
        if (error) {
          showMessage({type: 'warning', message: error});
          return false;
        } else {
          return await verifyUserAssociate(uid, {
            onComplete: (error: any) => {
              if (error) {
                showMessage({type: 'warning', message: error});
                return false;
              } else {
                return true;
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
    const status = await verify({user: to, uid: from});
    console.log(status);
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
