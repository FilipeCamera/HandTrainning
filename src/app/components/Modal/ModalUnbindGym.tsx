import Colors from '@styles';
import {ButtonText, Space, Text} from 'components';
import React from 'react';
import {View} from 'react-native';

import {Modal, Portal} from 'react-native-paper';

interface ModalProps {
  visible: boolean;
  setVisible: any;
  title: string;
  desc: string;
  onFunction: () => any;
}

const ModalUnbindGym = ({
  visible,
  setVisible,
  title,
  desc,
  onFunction,
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
        <Text
          title={title}
          size={16}
          weight={500}
          color={Colors.textColorBlack}
          center
        />
        <Space marginVertical={4} />
        <Text title={desc} size={13} color={Colors.textColorBlack} center />
        <Space marginVertical={12} />
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-around',
            width: '100%',
          }}>
          <ButtonText
            title="Cancelar"
            size={14}
            weight={500}
            color={Colors.textGrayMedium}
            onPress={() => setVisible(false)}
          />
          <ButtonText
            color={Colors.red}
            title="Desvincular"
            size={14}
            weight={600}
            onPress={() => onFunction()}
          />
        </View>
      </Modal>
    </Portal>
  );
};

export default ModalUnbindGym;
