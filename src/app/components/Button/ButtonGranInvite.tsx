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
  const {verifyUserAssociate, verifyUserType} = useVerification();
  const handleVerifySendInvite = (user, uid) => {
    verifyUserType({
      uid: uid,
      onComplete: (associate: boolean) => {
        if (associate) {
          verifyUserAssociate({
            uid: uid,
            onComplete: (error: string, value: boolean) => {
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
        }
      },
      onFail: err => {},
    });
  };
  return (
    <ButtonGranInviteStyle
      onPress={() => handleVerifySendInvite(to, from)}
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
