import React, {useState} from 'react';
import {Space, Text} from 'components';

import Telegram from 'assets/svg/telegram.svg';

import {ButtonGranInviteStyle} from './styles';
import {useInvites, useVerification} from 'hooks';
import {showMessage} from 'react-native-flash-message';
import {View} from 'react-native';

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

const ButtonGranInvite = ({
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
    <ButtonGranInviteStyle
      onPress={() => handleInviteSend(to, from)}
      disabled={send}
      background={send}>
      <View style={{position: 'absolute', left: 25, width: 25, height: 25}}>
        <Telegram width="100%" height="100%" />
      </View>
      <Text
        title={send ? sendTitle : title}
        size={size}
        weight={weight}
        color={color}
      />
    </ButtonGranInviteStyle>
  );
};

export default ButtonGranInvite;
