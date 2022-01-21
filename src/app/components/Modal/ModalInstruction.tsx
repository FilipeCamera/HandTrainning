import Colors from '@styles';
import {Button, Check, Input, Label, Space, Text} from 'components';
import React, {useState} from 'react';
import {TouchableOpacity, View} from 'react-native';

import {Modal, Portal} from 'react-native-paper';

interface ModalProps {
  visible: boolean;
  setVisible: any;
  title: string;
  instruct: string;
  exerciseSelected: string;
  exercises?: any[];
  onFunction: (instruction, desc, selectedExercise) => any;
}

const ModalInstruction = ({
  visible,
  setVisible,
  title,
  instruct,
  exercises,
  exerciseSelected,
  onFunction,
}: ModalProps) => {
  const [instruction, setInstruction] = useState(instruct);
  const [selectedExercise, setSelectedExercise] = useState(exerciseSelected);
  const [desc, setDesc] = useState('');
  return (
    <Portal>
      <Modal
        visible={visible}
        onDismiss={() => {
          setInstruction('');
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
            flexWrap: 'wrap',
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
                instruction === 'BST' ? Colors.red : Colors.backgroundLight,
              marginVertical: 8,
            }}
            onPress={() => setInstruction('BST')}>
            <Text
              title="BST"
              size={14}
              weight={500}
              color={
                instruction === 'BST'
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
                instruction === 'OBS' ? Colors.red : Colors.backgroundLight,
              marginVertical: 8,
            }}
            onPress={() => {
              setInstruction('OBS');
              setSelectedExercise('');
            }}>
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
            onPress={() => {
              setInstruction('MIN');
              setSelectedExercise('');
            }}>
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
            onPress={() => {
              setInstruction('ADP');
              setSelectedExercise('');
            }}>
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
          <TouchableOpacity
            style={{
              width: 60,
              height: 40,
              borderRadius: 8,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-around',
              backgroundColor:
                instruction === 'PIR' ? Colors.red : Colors.backgroundLight,
              marginVertical: 8,
            }}
            onPress={() => {
              setInstruction('PIR');
              setSelectedExercise('');
            }}>
            <Text
              title="PIR"
              size={14}
              weight={500}
              color={
                instruction === 'PIR'
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
                instruction === 'DRP' ? Colors.red : Colors.backgroundLight,
              marginVertical: 8,
            }}
            onPress={() => {
              setInstruction('DRP');
              setSelectedExercise('');
            }}>
            <Text
              title="DRP"
              size={14}
              weight={500}
              color={
                instruction === 'DRP'
                  ? Colors.textColorWhite
                  : Colors.inputColorText
              }
            />
          </TouchableOpacity>
        </View>
        <Space marginVertical={4} />
        {instruction === 'BST' && (
          <>
            <View style={{width: '100%', alignItems: 'flex-start'}}>
              <Text
                title="Selecione um exercício:"
                size={12}
                weight={500}
                color={Colors.textColorRX}
              />
              <Space marginVertical={4} />
              {exercises?.map((exercise, index) => (
                <Check
                  key={exercise.name}
                  value={exercise.name === selectedExercise ? true : false}
                  title={exercise.name}
                  size={14}
                  setValue={e => {
                    if (e === true) {
                      setSelectedExercise(exercise.name);
                    }
                  }}
                />
              ))}
            </View>
          </>
        )}
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
            onFunction(instruction, desc, selectedExercise);
            setVisible(false);
          }}
        />
      </Modal>
    </Portal>
  );
};

export default ModalInstruction;
