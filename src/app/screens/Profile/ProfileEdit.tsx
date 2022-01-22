import Colors from '@styles';
import {
  ButtonRed,
  ButtonText,
  DataCommon,
  DataTrainner,
  Input,
  Label,
  ModalPlan,
  Scroll,
  SimpleHeader,
  Space,
  Text,
} from 'components';
import {firestore} from 'firebase';
import {userPersist} from 'functions';
import {useGetUser} from 'hooks';
import React, {useEffect, useState} from 'react';
import {ActivityIndicator, TouchableOpacity, View} from 'react-native';
import {showMessage} from 'react-native-flash-message';
import {fieldValidate} from 'validation';
import RefreshIcon from 'assets/svg/refresh.svg';
import {requestSubscription, updateSubscription} from 'payments';

interface StepProps {
  user: any;
  setState: any;
}

const ProfileEdit = ({setState, user}: StepProps) => {
  const {getUser} = useGetUser();
  const [loading, setLoading] = useState(true);
  const [planVisible, setPlanVisible] = useState(false);
  const [dados, setDados] = useState<any>();
  const [selected, setSelected] = useState<any>();
  const [errors, setErrors] = useState({
    name: '',
    slogan: '',
    avatar: '',
    course: '',
    university: '',
    weight: '',
    age: '',
    height: '',
    lesion: '',
    breath: '',
    sex: '',
  });

  const validate = () => {
    const nameValidated = fieldValidate(dados.name);
    const avatarValidated = fieldValidate(dados.avatar);

    if (dados.type === 'common') {
      const ageValidated = fieldValidate(dados.age);
      const weightValidated = fieldValidate(dados.weight);
      const heightValidated = fieldValidate(dados.height);
      const sexValidated = fieldValidate(dados.sex);
      const lesionValidated =
        dados.problemHealth.lesion.value === true
          ? fieldValidate(dados.problemHealth.lesion.desc)
          : {value: false, error: ''};
      const breathValidated =
        dados.problemHealth.breath.value === true
          ? fieldValidate(dados.problemHealth.breath.desc)
          : {value: false, error: ''};
      setErrors({
        ...errors,
        name: nameValidated.error,
        avatar: avatarValidated.error,
        age: ageValidated.error,
        weight: weightValidated.error,
        height: heightValidated.error,
        lesion: lesionValidated.error,
        breath: breathValidated.error,
        sex: sexValidated.error,
      });
      if (
        !nameValidated.value &&
        !ageValidated.value &&
        !avatarValidated.value &&
        !weightValidated.value &&
        !heightValidated.value &&
        !lesionValidated.value &&
        !breathValidated.value &&
        !sexValidated.value
      ) {
        return true;
      }
      return false;
    }
    if (dados.type === 'trainner') {
      const courseValidated = fieldValidate(dados.course);
      const universityValidated = fieldValidate(dados.university);
      setErrors({
        ...errors,
        name: nameValidated.error,
        avatar: avatarValidated.error,

        course: courseValidated.error,
        university: universityValidated.error,
      });
      if (
        !nameValidated.value &&
        !avatarValidated.value &&
        !courseValidated.value &&
        !universityValidated.value
      ) {
        return true;
      }
      return false;
    }
  };

  const updatePlan = e => {
    setSelected(e);
  };
  const handleUpdateProfile = async () => {
    if (dados.plan !== selected) {
      dados.plan = selected;
      const planId =
        selected === 'individual'
          ? 'android.test.purchased'
          : 'android.test.canceled';
      await requestSubscription(planId);
    }
    const validated = validate();
    if (validated) {
      return firestore()
        .collection('users')
        .doc(dados.uid)
        .update(dados)
        .then(res => {
          userPersist(dados);
          showMessage({
            type: 'success',
            message: 'Atualizado com sucesso!',
          });
          setState('');
        });
    }
    return showMessage({
      type: 'danger',
      message: 'Preencha todos os campos!',
    });
  };

  useEffect(() => {
    getUser({
      uid: user.uid,
      onComplete: users => {
        if (users) {
          setSelected(users.plan);
          setDados(users);
          setLoading(false);
        }
      },
      onFail: err => {},
    });
  }, []);
  return (
    <View style={{backgroundColor: Colors.background, flex: 1}}>
      <ModalPlan
        visible={planVisible}
        setVisible={setPlanVisible}
        onFunction={e => updatePlan(e)}
        selected={selected}
        setSelected={setSelected}
      />
      <Scroll>
        <SimpleHeader
          title="Editar Perfil"
          back
          onBack={() => setState('')}
          size={18}
          weight={500}
          marginBottom={30}
        />
        {!!loading && (
          <View
            style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            <ActivityIndicator size="large" color={Colors.red} />
          </View>
        )}
        {!loading && (
          <>
            {dados.type === 'common' && (
              <DataCommon dados={dados} setDados={setDados} errors={errors} />
            )}
            {dados.type === 'trainner' && (
              <DataTrainner dados={dados} setDados={setDados} errors={errors} />
            )}
            <Space marginVertical={20} />
            <Label title="Plano" />
            <Space marginVertical={8} />
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                width: '100%',
              }}>
              <View
                style={{
                  height: 56,
                  backgroundColor: Colors.inputBack,
                  flex: 1,
                  flexDirection: 'row',
                  alignItems: 'center',
                  paddingLeft: 8,
                  borderRadius: 10,
                }}>
                <Text
                  title={selected === 'individual' ? 'Individual' : 'Básico'}
                  size={15}
                  weight={500}
                  color={Colors.textColorRXC}
                />
              </View>
              <Space marginHorizontal={4} />
              <TouchableOpacity
                style={{
                  height: 56,
                  width: 56,
                  backgroundColor: Colors.inputBack,
                  borderRadius: 10,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
                onPress={() => setPlanVisible(true)}>
                <RefreshIcon
                  width="24px"
                  height="24px"
                  color={Colors.textColorRXC}
                />
              </TouchableOpacity>
            </View>
            <Space marginVertical={25} />
            <ButtonRed
              title="Salvar"
              color={Colors.textColorWhite}
              size={15}
              weight={500}
              onPress={() => handleUpdateProfile()}
            />
            <Space marginVertical={12} />
            <ButtonText
              title="Cancelar conta"
              color={Colors.red}
              size={15}
              weight={500}
              onPress={() => {}}
            />
            <Space marginVertical={6} />
          </>
        )}
      </Scroll>
    </View>
  );
};

export default ProfileEdit;
