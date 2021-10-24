import CheckBox from '@react-native-community/checkbox';
import Colors from '@styles';
import {ButtonText, Space, Text} from 'components';
import React, {useState} from 'react';
import {Image, TouchableOpacity, View} from 'react-native';

import {Modal, Portal} from 'react-native-paper';

interface ModalProps {
  visible: boolean;
  setVisible: any;
  title: string;
  desc: string;
  gyms: any[];
  onFunction: (e) => any;
}

const ModalUnbindGymTrainner = ({
  visible,
  setVisible,
  title,
  desc,
  gyms,
  onFunction,
}: ModalProps) => {
  const [selectGym, setSelectGym] = useState<any>('');
  return (
    <Portal>
      <Modal
        visible={visible}
        onDismiss={() => {
          setSelectGym('');
          setVisible(false);
        }}
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
            width: '100%',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
          }}>
          {!!gyms &&
            gyms.length !== 0 &&
            gyms.map(gym => (
              <TouchableOpacity
                key={gym.name}
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-around',
                  padding: 8,
                  borderRadius: 8,
                  borderWidth: 1,
                  borderColor: Colors.lightGray,
                }}
                onPress={() => setSelectGym(selectGym !== '' ? '' : gym.uid)}>
                <View style={{width: 26, height: 26, borderRadius: 13}}>
                  <Image
                    source={{uri: gym.avatar}}
                    style={{width: '100%', height: '100%', borderRadius: 9999}}
                  />
                </View>
                <Space marginHorizontal={4} />
                <Text
                  title={gym.name}
                  size={12}
                  weight={500}
                  color={Colors.textColorBlack}
                />
                <Space marginHorizontal={6} />
                <View
                  style={{
                    width: 16,
                    height: 16,
                    borderRadius: 8,
                    borderWidth: 1,
                    borderColor:
                      selectGym === gym.uid
                        ? Colors.greenMediumLight
                        : Colors.lightGray,
                    backgroundColor:
                      selectGym === gym.uid
                        ? Colors.greenMediumLight
                        : Colors.background,
                  }}
                />
              </TouchableOpacity>
            ))}
        </View>
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
            onPress={() => {
              setSelectGym('');
              setVisible(false);
            }}
          />
          <ButtonText
            color={Colors.red}
            title="Desvincular"
            size={14}
            weight={600}
            onPress={() => onFunction(selectGym)}
          />
        </View>
      </Modal>
    </Portal>
  );
};

export default ModalUnbindGymTrainner;
