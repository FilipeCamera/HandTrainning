import Colors from '@styles';
import {Label, Space} from 'components';
import React from 'react';
import {Image, View} from 'react-native';

import {Modal, Portal} from 'react-native-paper';

interface ModalProps {
  visible: boolean;
  setVisible: any;
  title: string;
  image: any;
  imageTwo: any;
}

const ModalVisualTrainning = ({
  visible,
  setVisible,
  title,
  image,
  imageTwo,
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

        {!!image && (
          <View
            style={{
              width: '100%',
              height: !imageTwo ? 320 : 100,
              borderRadius: 20,
            }}>
            <Image
              source={{uri: image}}
              style={{width: '100%', height: '100%', borderRadius: 20}}
            />
          </View>
        )}
        <Space marginVertical={8} />
        {!!imageTwo && (
          <View
            style={{
              width: '100%',
              height: !image ? 320 : 100,
              borderRadius: 20,
            }}>
            <Image
              source={{uri: imageTwo}}
              style={{width: '100%', height: '100%', borderRadius: 20}}
            />
          </View>
        )}
      </Modal>
    </Portal>
  );
};

export default ModalVisualTrainning;
