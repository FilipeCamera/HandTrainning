import Colors from '@styles';
import {
  Button,
  Label,
  Space,
  Text,
  SelectProfileCheck,
  ButtonText,
} from 'components';
import React from 'react';
import {ActivityIndicator, View} from 'react-native';

import {Modal, Portal} from 'react-native-paper';

import SucessIcon from 'assets/svg/sucessIcon.svg';
import {useSelector} from 'react-redux';
import ModalCommon from './ModalCommon';
import ModalTrainner from './ModalTrainner';

interface ModalProps {
  visible: boolean;
  setVisible: any;
  setTrainner: any;
  loading: boolean;
  send: boolean;
  title: string;
  trainners: any[];
  gyms: any[];
  setGym: any;
  onFunction: () => any;
}

const Modals = ({
  visible,
  setVisible,
  title,
  loading,
  send,
  setTrainner,
  setGym,
  onFunction,
  trainners,
  gyms,
}: ModalProps) => {
  const user = useSelector((state: any) => state.auth.user);
  return (
    <>
      {user.type === 'common' && (
        <ModalCommon
          title={title}
          send={send}
          setTrainner={setTrainner}
          setVisible={setVisible}
          trainners={trainners}
          onFunction={onFunction}
          visible={visible}
          loading={loading}
        />
      )}
      {user.type === 'trainner' && (
        <ModalTrainner
          title={title}
          setVisible={setVisible}
          visible={visible}
          setGym={setGym}
          gyms={gyms}
        />
      )}
    </>
  );
};

export default Modals;
