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
import {useSelector} from 'react-redux';

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
  const academia = useSelector((state: any) => state.trainner.gym);
  if (gyms.length === 0 || !gyms) {
    return (
      <Portal>
        <Modal
          visible={visible}
          onDismiss={() => setVisible(false)}
          contentContainerStyle={{
            backgroundColor: Colors.background,
            paddingHorizontal: 16,
            paddingVertical: 32,
            margin: 24,
            borderRadius: 20,
            alignItems: 'center',
            flexDirection: 'column',
            justifyContent: 'flex-start',
          }}>
          <Text
            title="Você não é associado a nenhuma academia"
            size={14}
            weight={500}
            color={Colors.grayMediumLight}
            center
          />
        </Modal>
      </Portal>
    );
  }
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
              gym={academia ? academia.gym : ''}
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
