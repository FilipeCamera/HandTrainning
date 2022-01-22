import Colors from '@styles';
import {Button, Label, Space, Text, Input, Check} from 'components';
import React, {useState} from 'react';
import {ActivityIndicator, Image, View} from 'react-native';

import {Modal, Portal} from 'react-native-paper';

interface ModalProps {
  visible: boolean;
  setVisible: any;
  selected: any;
  setSelected: any;
  onFunction: (value: string) => any;
}

const ModalPlan = ({visible, setVisible, selected, onFunction}: ModalProps) => {
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
        <View style={{width: '100%'}}>
          <Label title="Escolha seu plano" center />
          <Check
            value={selected === 'basic' ? true : false}
            setValue={() => onFunction('basic')}
            title="Plano Básico - Grátis"
            size={14}
          />

          <Check
            value={selected === 'individual' ? true : false}
            setValue={() => onFunction('individual')}
            title="Plano Individual - R$5,99 / mês"
            size={14}
          />
        </View>
      </Modal>
    </Portal>
  );
};

export default ModalPlan;
