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
import {View} from 'react-native';

import {Modal, Portal} from 'react-native-paper';

interface ModalProps {
  visible: boolean;
  setVisible: any;
  title: string;
  gyms: any[];
  setGym: any;
}

const ModalTrainner = ({
  visible,
  setVisible,
  title,
  setGym,
  gyms,
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
        <Space marginVertical={8} />
        <Label title={title} color={Colors.textColorBlack} size={15} center />
        <Space marginVertical={16} />
        {!!gyms &&
          gyms.length !== 0 &&
          gyms.map(gym => (
            <SelectProfileCheck
              key={gym.uid}
              profile={gym}
              onFunction={() => setGym(gym.uid)}
            />
          ))}
        {!!gyms && <Space marginVertical={20} />}
        {!!gyms && (
          <View>
            <ButtonText
              title="Adicionar nova academia"
              weight={500}
              size={14}
              color={Colors.red}
            />
          </View>
        )}
      </Modal>
    </Portal>
  );
};

export default ModalTrainner;
