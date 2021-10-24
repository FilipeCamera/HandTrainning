import React from 'react';

import {useSelector} from 'react-redux';
import ModalCommon from './ModalCommon';
import ModalTrainner from './ModalTrainner';

interface ModalProps {
  user: any;
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
  user,
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
  return (
    <>
      {!!user && user.type === 'common' && (
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
      {!!user && user.type === 'trainner' && (
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
