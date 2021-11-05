import Colors from '@styles';
import {Button, Label, Space, Text} from 'components';
import moment from 'moment';
import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Platform,
  TouchableOpacity,
  View,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

import DateIcon from 'assets/svg/calendarIconWhite.svg';
import {Modal, Portal} from 'react-native-paper';
import {fieldValidate} from 'validation';
import {showMessage} from 'react-native-flash-message';
import {firestore} from 'firebase';

import SucessIcon from 'assets/svg/sucessIcon.svg';
import {useSelector} from 'react-redux';
import {useGetRequests, useGetTrainning} from 'hooks';

interface ModalProps {
  visible: boolean;
  setVisible: any;
  title: string;
  exercisesSelected: any[];
  categoriesSelected: any[];
  commonId: string;
  trainnerId: string;
  setSend: any;
}

const ModalCreateTrainning = ({
  visible,
  setVisible,
  title,
  exercisesSelected,
  categoriesSelected,
  setSend,
  commonId,
  trainnerId,
}: ModalProps) => {
  const gym = useSelector((state: any) => state.trainner.gym);
  const {removeRequestByCommonId} = useGetRequests();
  const {getTrainningId} = useGetTrainning();
  const [expire, setExpire] = useState('');
  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [created, setCreated] = useState(false);

  useEffect(() => {
    if (created === true) {
      setSend(created);
    }
  }, [created]);

  const data = {
    trainnerId: trainnerId,
    commonId: commonId,
    gymId: gym.gym,
    trainning: exercisesSelected,
    categories: categoriesSelected,
    expiredTrainning: expire,
    createdAt: firestore.FieldValue.serverTimestamp(),
  };
  const updatedData = {
    trainnerId: trainnerId,
    commonId: commonId,
    categories: categoriesSelected,
    trainning: exercisesSelected,
    expiredTrainning: expire,
    updatedAt: firestore.FieldValue.serverTimestamp(),
  };
  const verify = () => {
    const expireVerified = fieldValidate(expire);
    if (expireVerified.value) {
      return false;
    }
    return true;
  };
  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || expire;
    setShow(Platform.OS === 'ios');
    setExpire(currentDate);
    setDate(currentDate);
  };

  const createTr = () => {
    getTrainningId({
      uid: commonId,
      onComplete: trainning => {
        if (trainning) {
          firestore()
            .collection('trainnings')
            .doc(trainning)
            .update(updatedData)
            .then(res => {
              removeRequestByCommonId({
                uid: commonId,
                onComplete: res => {
                  if (res) {
                    setLoading(false);
                    setCreated(true);
                  }
                },
                onFail: err => {},
              });
              setLoading(false);
              showMessage({
                type: 'success',
                message: 'Treino criado com sucesso!',
              });
              setCreated(true);
            })
            .catch(err => {});
        } else {
          firestore()
            .collection('trainnings')
            .doc()
            .set(data)
            .then(res => {
              removeRequestByCommonId({
                uid: commonId,
                onComplete: res => {
                  if (res) {
                    setLoading(false);

                    setCreated(true);
                  }
                },
                onFail: err => {},
              });
              setLoading(false);
              showMessage({
                type: 'success',
                message: 'Treino criado com sucesso!',
              });
              setCreated(true);
            })
            .catch(err => {});
        }
      },
      onFail: err => {},
    });
  };
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
        {show && (
          <DateTimePicker
            testID="dateTimePicker"
            value={date}
            mode="date"
            is24Hour={true}
            display="default"
            onChange={onChange}
          />
        )}
        {!!loading && !created && (
          <View style={{alignItems: 'center', justifyContent: 'center'}}>
            <ActivityIndicator size="large" color={Colors.red} />
          </View>
        )}
        {!loading && !created && (
          <>
            <Label
              title={title}
              size={15}
              color={Colors.textColorBlack}
              center
            />
            <Space marginVertical={8} />
            <View style={{alignItems: 'center', width: '100%'}}>
              <Text
                title="Defina o tempo de duração do treino:"
                size={14}
                weight={500}
                color={Colors.inputColorText}
                center
              />
            </View>
            <Space marginVertical={8} />
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                width: '100%',
              }}>
              <View
                style={{
                  backgroundColor: Colors.inputBack,
                  width: 120,
                  height: 42,
                  borderRadius: 8,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Text
                  title={
                    expire !== '' ? moment(expire).format('DD/MM/YYYY') : expire
                  }
                  size={14}
                  weight={500}
                  color={Colors.inputColorText}
                />
              </View>
              <Space marginHorizontal={4} />
              <TouchableOpacity
                style={{
                  backgroundColor: Colors.red,
                  height: 36,
                  width: 36,
                  borderRadius: 18,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
                onPress={() => setShow(true)}>
                <DateIcon />
              </TouchableOpacity>
            </View>
            <Space marginVertical={8} />
            <Button
              title="Finalizar"
              size={14}
              weight={500}
              color={Colors.textColorWhite}
              background={Colors.red}
              onPress={() => {
                const verified = verify();
                if (verified) {
                  setLoading(true);
                  createTr();
                } else {
                  showMessage({
                    type: 'danger',
                    message: 'Erro ao finalizar!',
                    description: 'Não foi definido uma data.',
                  });
                }
              }}
            />
          </>
        )}
        {!!created && !loading && (
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <SucessIcon />
            <Space marginVertical={4} />
            <Text
              title="Treino criado com sucesso"
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

export default ModalCreateTrainning;
