import Colors from '@styles';
import {Button, Label, Space, Text, SelectProfileCheck} from 'components';
import React from 'react';
import {ActivityIndicator, View} from 'react-native';

import {Modal, Portal} from 'react-native-paper';

import SucessIcon from 'assets/svg/sucessIcon.svg';

interface ModalProps {
  visible: boolean;
  setVisible: any;
  setTrainner: any;
  loading: boolean;
  send: boolean;
  title: string;
  trainners: any[];
  onFunction: () => any;
}

const ModalCommon = ({
  visible,
  setVisible,
  title,
  loading,
  send,
  setTrainner,
  onFunction,
  trainners,
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
        {!loading && !send && (
          <>
            <Space marginVertical={8} />
            <Label
              title={title}
              color={Colors.textColorBlack}
              size={15}
              center
            />
            <Space marginVertical={16} />
            {!!trainners &&
              trainners.length !== 0 &&
              trainners.map(trainner => (
                <SelectProfileCheck
                  key={trainner.uid}
                  profile={trainner}
                  onFunction={() => setTrainner(trainner.uid)}
                />
              ))}
            <Space marginVertical={16} />
            {!!trainners && trainners.length !== 0 && (
              <View
                style={{
                  width: '100%',
                  alignItems: 'center',
                }}>
                <Button
                  title="Enviar solicitação"
                  weight={500}
                  size={14}
                  color={Colors.textColorWhite}
                  background={Colors.red}
                  onPress={onFunction}
                  notShadow
                />
              </View>
            )}
          </>
        )}
        {!!loading && !send && (
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <ActivityIndicator size="large" color={Colors.red} />
          </View>
        )}
        {!!send && (
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <SucessIcon />
            <Space marginVertical={4} />
            <Text
              title="Solicitação enviada com sucesso!"
              weight={500}
              size={16}
              color={Colors.green}
              center
            />
          </View>
        )}
      </Modal>
    </Portal>
  );
};

export default ModalCommon;
