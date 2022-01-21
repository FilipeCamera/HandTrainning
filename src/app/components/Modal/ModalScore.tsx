import Colors from '@styles';
import {Button, Input, Label, Space, Text} from 'components';
import React from 'react';
import {View} from 'react-native';

import StarIcon from 'assets/svg/stars.svg';

import {Modal, Portal} from 'react-native-paper';

interface ModalProps {
  visible: boolean;
  setVisible: any;
  title: string;
  value: any;
  setValue: any;
  desc: string;
  onFunction: () => any;
}

const ModalScore = ({
  visible,
  setVisible,
  title,
  desc,
  value,
  setValue,
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
        <Label
          title={title}
          size={16}
          weight={500}
          color={Colors.textColorBlack}
          center
        />
        <Space marginVertical={4} />
        <Text
          title={desc}
          size={12}
          weight={400}
          color={Colors.textGrayMedium}
          center
        />
        <Space marginVertical={8} />
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
          }}>
          <View>
            <StarIcon width="32px" height="32px" />
          </View>
          <Space marginHorizontal={6} />
          <View style={{width: 100}}>
            <Input
              numeric
              placeholder="Sua nota"
              value={value}
              onText={(e: number) => {
                if (e > 10) {
                  setValue('');
                } else if (e < 0) {
                  setValue('');
                } else {
                  setValue(e);
                }
              }}
              center
            />
          </View>
        </View>
        <Space marginVertical={8} />
        <View style={{width: '100%', alignItems: 'center'}}>
          <Button
            background={Colors.red}
            color={Colors.textColorWhite}
            title="Enviar"
            size={14}
            weight={500}
            onPress={() => onFunction()}
          />
        </View>
      </Modal>
    </Portal>
  );
};

export default ModalScore;
