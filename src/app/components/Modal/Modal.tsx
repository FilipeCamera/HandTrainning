import Colors from '@styles';
import {Button, Label, Space, Text} from 'components';
import React from 'react';
import {Image, View, TouchableOpacity} from 'react-native';

import {Checkbox, Modal, Portal} from 'react-native-paper';

interface ModalProps {
  visible: boolean;
  setVisible: any;
  title: string;
  trainners: any[];
  onFunction: () => any;
}

const Modals = ({
  visible,
  setVisible,
  title,
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
          marginHorizontal: 24,
          borderRadius: 20,
          alignItems: 'center',
        }}>
        <Label title={title} color={Colors.textColorBlack} size={15} center />
        <Space marginVertical={20} />
        {!!trainners &&
          trainners.length !== 0 &&
          trainners.map(trainner => (
            <TouchableOpacity
              key={trainner.uid}
              style={{
                elevation: 5,
                backgroundColor: Colors.background,
                padding: 8,
                borderRadius: 8,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                width: '95%',
              }}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <View style={{width: 50, height: 50, borderRadius: 25}}>
                  <Image
                    source={{uri: trainner.avatar}}
                    style={{width: '100%', height: '100%', borderRadius: 9999}}
                  />
                </View>
                <Space marginHorizontal={4} />
                <View>
                  <Text
                    title={trainner.name}
                    size={14}
                    weight={500}
                    color={Colors.textColorBlack}
                  />
                  <Text
                    title="Treinador"
                    size={12}
                    weight={400}
                    color={Colors.textColorBlack}
                  />
                </View>
              </View>
              <Checkbox status="checked" color={Colors.green} />
            </TouchableOpacity>
          ))}
        {!!trainners && trainners.length !== 0 && (
          <>
            <Space marginVertical={20} />
            <Button
              title="Enviar solicitação"
              weight={500}
              size={14}
              color={Colors.textColorWhite}
              background={Colors.red}
            />
          </>
        )}
      </Modal>
    </Portal>
  );
};

export default Modals;
