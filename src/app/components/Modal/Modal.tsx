import React from 'react';

import ModalCommon from './ModalCommon';

interface ModalProps {
  user: any;
  visible: boolean;
  setVisible: any;
  loading: boolean;
  send: boolean;
  title: string;
  trainner: any;
  onFunction: (e: string | any) => any;
}

const Modals = ({
  visible,
  setVisible,
  loading,
  send,
  onFunction,
  trainner,
}: ModalProps) => {
  console.log(trainner);
  return (
    <ModalCommon
      send={send}
      setVisible={setVisible}
      trainner={trainner}
      onFunction={(e: string) => onFunction(e)}
      visible={visible}
      loading={loading}
    />
  );
};

export default Modals;
