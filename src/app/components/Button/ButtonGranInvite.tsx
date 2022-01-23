import React, {useState} from 'react';
import {Space, Text} from 'components';

import Telegram from 'assets/svg/telegram.svg';

import {ButtonGranInviteStyle} from './styles';
import {useInvites, useVerification} from 'hooks';
import {showMessage} from 'react-native-flash-message';
import {View} from 'react-native';
import {firestore} from 'firebase';

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
  name: string;
  sendInviteId: any[];
  setSendInvite: any;
}

const ButtonGranInvite = ({
  title,
  color,
  size,
  weight,
  sendTitle,
  to,
  from,
  name,
  sendInviteId,
  setSendInvite,
}: ButtonProps) => {
  const [send, setSend] = useState(false);
  const {sendInvite} = useInvites();
  const {verifyUserAssociate} = useVerification();
  const handleVerifySendInvite = (user, uid, name) => {
    verifyUserAssociate({
      uid: uid,
      onComplete: (error: string, value: boolean) => {
        console.log(error);
        console.log(value);
        if (value) {
          showMessage({type: 'warning', message: error});
        } else {
          sendInvite({
            to: user.uid,
            from: from,
            onComplete: () => {
              setSendInvite([...sendInviteId, from]);
              firestore()
                .collection('warnings')
                .doc()
                .set({
                  title: 'Você recebeu um convite',
                  desc: `${name} enviou um convite`,
                  from: uid,
                  createdAt: firestore.FieldValue.serverTimestamp(),
                });
              setSend(true);
            },
            onFail: err => {},
          });
        }
      },
      onFail: error => console.log(error),
    });
  };
  return (
    <ButtonGranInviteStyle
      onPress={() => handleVerifySendInvite(to, from, name)}
      disabled={
        sendInviteId.length !== 0
          ? sendInviteId.some(invite => invite === from)
          : send
      }
      background={
        sendInviteId.length !== 0
          ? sendInviteId.some(invite => invite === from)
          : send
      }>
      <View style={{position: 'absolute', left: 20, width: 25, height: 25}}>
        <Telegram width="100%" height="100%" />
      </View>
      <Text
        title={
          sendInviteId.length !== 0 &&
          sendInviteId.some(invite => invite === from)
            ? sendTitle
            : title
        }
        size={size}
        weight={weight}
        color={color}
      />
    </ButtonGranInviteStyle>
  );
};

export default ButtonGranInvite;
