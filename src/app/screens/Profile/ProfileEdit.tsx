import Colors from '@styles';
import {
  ButtonRed,
  DataCommon,
  DataTrainner,
  Scroll,
  SimpleHeader,
  Space,
} from 'components';
import {firestore} from 'firebase';
import {userPersist} from 'functions';
import {useGetUser} from 'hooks';
import React, {useEffect, useState} from 'react';
import {ActivityIndicator, View} from 'react-native';
import {showMessage} from 'react-native-flash-message';
import {fieldValidate} from 'validation';

interface StepProps {
  user: any;
  setState: any;
}

const ProfileEdit = ({setState, user}: StepProps) => {
  const {getUser} = useGetUser();
  const [loading, setLoading] = useState(true);
  const [dados, setDados] = useState<any>();
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
  const handleUpdateProfile = () => {
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
          setDados(users);
          setLoading(false);
        }
      },
      onFail: err => {},
    });
  }, []);
  return (
    <View style={{backgroundColor: Colors.background, flex: 1}}>
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
            {dados.type === 'gym' && (
              <DataGym dados={dados} setDados={setDados} errors={errors} />
            )}
            <Space marginVertical={25} />
            <ButtonRed
              title="Salvar"
              color={Colors.textColorWhite}
              size={15}
              weight={500}
              onPress={() => handleUpdateProfile()}
            />
            <Space marginVertical={6} />
          </>
        )}
      </Scroll>
    </View>
  );
};

export default ProfileEdit;
