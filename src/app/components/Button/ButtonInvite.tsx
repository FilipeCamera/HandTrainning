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
  const verify = ({user, uid}: any) => {
    let status;
    verifyUserIsGym(user, uid, {
      onComplete: (error: any) => {
        if (error) {
          status = true;
          showMessage({type: 'warning', message: error});
        } else {
          verifyUserAssociate(uid, {
            onComplete: (error: any) => {
              if (error) {
                status = true;
                showMessage({type: 'warning', message: error});
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
    return status;
  };

  const handleInviteSend = (to: any, from: any) => {
    const verified = verify({user: to, uid: from});

    if (verified) {
      return sendInvite(to.uid, from, {
        onComplete: (res: any) => {
          setSend(true);
        },
      });
    } else {
      return;
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
