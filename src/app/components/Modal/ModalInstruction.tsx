import Colors from '@styles';
import {Button, Input, Label, Space, Text} from 'components';
import React, {useState} from 'react';
import {TouchableOpacity, View} from 'react-native';

import {Modal, Portal} from 'react-native-paper';

interface ModalProps {
  visible: boolean;
  setVisible: any;
  title: string;
  instruct: string;
  onFunction: (instruction, desc) => any;
}

const ModalInstruction = ({
  visible,
  setVisible,
  title,
  instruct,
  onFunction,
}: ModalProps) => {
  const [instruction, setInstruction] = useState(instruct);
  const [desc, setDesc] = useState('');
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
        <View style={{alignItems: 'flex-start', width: '100%'}}>
          <Text
            title="Selecione uma instrução:"
            size={14}
            weight={500}
            color={Colors.inputColorText}
          />
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-around',
            width: '100%',
          }}>
          <TouchableOpacity
            style={{
              width: 60,
              height: 40,
              borderRadius: 8,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-around',
              backgroundColor:
                instruction === 'OBS' ? Colors.red : Colors.backgroundLight,
              marginVertical: 8,
            }}
            onPress={() => setInstruction('OBS')}>
            <Text
              title="OBS"
              size={14}
              weight={500}
              color={
                instruction === 'OBS'
                  ? Colors.textColorWhite
                  : Colors.inputColorText
              }
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              width: 60,
              height: 40,
              borderRadius: 8,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-around',
              backgroundColor:
                instruction === 'MIN' ? Colors.red : Colors.backgroundLight,
              marginVertical: 8,
            }}
            onPress={() => setInstruction('MIN')}>
            <Text
              title="MIN"
              size={14}
              weight={500}
              color={
                instruction === 'MIN'
                  ? Colors.textColorWhite
                  : Colors.inputColorText
              }
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              width: 60,
              height: 40,
              borderRadius: 8,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-around',
              backgroundColor:
                instruction === 'ADP' ? Colors.red : Colors.backgroundLight,
              marginVertical: 8,
            }}
            onPress={() => setInstruction('ADP')}>
            <Text
              title="ADP"
              size={14}
              weight={500}
              color={
                instruction === 'ADP'
                  ? Colors.textColorWhite
                  : Colors.inputColorText
              }
            />
          </TouchableOpacity>
        </View>
        <Space marginVertical={4} />
        {instruction === 'OBS' && (
          <Input
            placeholder="Diga a observação que deseja passar"
            value={desc}
            onText={e => setDesc(e)}
            slogan
            multiline={4}
          />
        )}
        <Space marginVertical={4} />
        <Button
          title="Definir instrução"
          size={14}
          weight={500}
          color={Colors.textColorWhite}
          background={Colors.red}
          onPress={() => {
            onFunction(instruction, desc);
            setVisible(false);
          }}
        />
      </Modal>
    </Portal>
  );
};

export default ModalInstruction;
