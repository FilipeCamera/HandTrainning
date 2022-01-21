import Colors from '@styles';
import {Button, Label, Space, Text, Input} from 'components';
import React, {useState} from 'react';
import {ActivityIndicator, Image, View} from 'react-native';

import {Modal, Portal} from 'react-native-paper';

import AcademicIcon from 'assets/svg/academicIcon.svg';
import SkillIcon from 'assets/svg/skillLevelIcon.svg';
import SpecsIcon from 'assets/svg/specsIcon.svg';
import Notify from 'assets/svg/Notify.svg';
import SucessIcon from 'assets/svg/sucessIcon.svg';

interface ModalProps {
  visible: boolean;
  setVisible: any;
  loading: boolean;
  send: boolean;
  trainner: any;
  onFunction: (desc: string) => any;
}

const ModalCommon = ({
  visible,
  setVisible,
  loading,
  send,
  onFunction,
  trainner,
}: ModalProps) => {
  const [description, setDescription] = useState('');

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
            {!trainner && (
              <View
                style={{
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <View style={{width: 100, height: 100}}>
                  <Notify width="100%" height="100%" />
                </View>
                <Text
                  title="Você ainda não tem um treinador"
                  size={14}
                  weight={500}
                  color={Colors.textGrayMedium}
                  center
                />
              </View>
            )}
            {!!trainner && (
              <>
                <Space marginVertical={8} />
                <Label
                  title="Solicitar novo treino"
                  color={Colors.textColorBlack}
                  size={15}
                  center
                />
                <Space marginVertical={8} />
                <View
                  style={{
                    width: '100%',
                    borderWidth: 1,
                    borderStyle: 'dashed',
                    borderColor: Colors.grayLight,
                    borderRadius: 20,
                    padding: 8,
                  }}>
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <View style={{width: 50, height: 50, borderRadius: 25}}>
                      <Image
                        source={{uri: trainner.avatar}}
                        style={{
                          width: '100%',
                          height: '100%',
                          borderRadius: 9999,
                        }}
                      />
                    </View>
                    <Space marginHorizontal={4} />
                    <View>
                      <Text title={trainner.name} size={13} weight={500} />
                      <Text title="Treinador(a)" size={10} weight={400} />
                    </View>
                  </View>
                  <Space marginVertical={4} />
                  <View>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                      <View
                        style={{
                          backgroundColor: Colors.red,
                          alignItems: 'center',
                          justifyContent: 'center',
                          width: 20,
                          height: 20,
                          borderRadius: 10,
                        }}>
                        <AcademicIcon width="14px" height="14px" />
                      </View>
                      <Space marginHorizontal={3} />
                      <Text title={trainner.course} size={12} weight={500} />
                    </View>
                    <Space marginVertical={4} />
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                      <View
                        style={{
                          backgroundColor: Colors.red,
                          alignItems: 'center',
                          justifyContent: 'center',
                          width: 20,
                          height: 20,
                          borderRadius: 10,
                        }}>
                        <SkillIcon width="12px" height="12px" />
                      </View>
                      <Space marginHorizontal={3} />
                      <Text
                        title={trainner.experience}
                        size={12}
                        weight={500}
                      />
                    </View>
                    <Space marginVertical={4} />
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                      <View
                        style={{
                          backgroundColor: Colors.red,
                          alignItems: 'center',
                          justifyContent: 'center',
                          width: 20,
                          height: 20,
                          borderRadius: 10,
                        }}>
                        <SpecsIcon width="12px" height="12px" />
                      </View>
                      <Space marginHorizontal={3} />
                      <Text title={trainner.specs} size={12} weight={500} />
                    </View>
                  </View>
                </View>
                <Space marginVertical={8} />
                <Input
                  value={description}
                  placeholder="Preferência de treino"
                  onText={e => setDescription(e)}
                />
                <Space marginVertical={8} />
              </>
            )}
            {!!trainner && (
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
                  onPress={() => onFunction(description)}
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
              size={15}
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
