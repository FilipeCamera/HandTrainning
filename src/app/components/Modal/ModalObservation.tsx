import Colors from '@styles';
import {Label, Space, Text} from 'components';
import React from 'react';
import {View} from 'react-native';

import {Modal, Portal} from 'react-native-paper';

interface ModalProps {
  visible: boolean;
  setVisible: any;
  title: string;
  observation: string;
}

const ModalObservation = ({
  visible,
  setVisible,
  title,
  observation,
}: ModalProps) => {
  return (
    <Portal>
      <Modal
        visible={visible}
        onDismiss={() => setVisible(false)}
        contentContainerStyle={{
          backgroundColor: Colors.background,
          padding: 16,
          margin: 24,
          borderRadius: 20,
          alignItems: 'center',
          flexDirection: 'column',
          justifyContent: 'flex-start',
        }}>
        <Label title={title} size={15} color={Colors.textColorBlack} center />
        <Space marginVertical={8} />
        <View style={{alignItems: 'center', width: '100%'}}>
          <Text
            title={observation}
            size={14}
            weight={500}
            color={Colors.inputColorText}
          />
        </View>
      </Modal>
    </Portal>
  );
};

export default ModalObservation;
