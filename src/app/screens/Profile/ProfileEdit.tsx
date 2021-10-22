import Colors from '@styles';
import {
  ButtonRed,
  DataCommon,
  DataGym,
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
import {cnpjValidate, fieldValidate} from 'validation';

interface StepProps {
  user: any;
  setState: any;
}

const ProfileEdit = ({setState, user}: StepProps) => {
  const {getUser} = useGetUser();
  const [loading, setLoading] = useState(true);
  const [dados, setDados] = useState(user);
  const [errors, setErrors] = useState({
    name: '',
    slogan: '',
    avatar: '',
    cnpj: '',
    city: '',
    uf: '',
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
    const cityValidated = fieldValidate(dados.city);
    const ufValidated = fieldValidate(dados.uf);
    if (dados.type === 'gym') {
      const cnpjValidated = cnpjValidate(dados.cnpj);
      setErrors({
        ...errors,
        name: nameValidated.error,
        cnpj: cnpjValidated.error,
        avatar: avatarValidated.error,
        city: cityValidated.error,
        uf: ufValidated.error,
      });
      if (
        !nameValidated.value &&
        !cnpjValidated.value &&
        !avatarValidated.value &&
        !cityValidated.value &&
        !ufValidated.value
      ) {
        return true;
      }
      return false;
    }
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
        city: cityValidated.error,
        uf: ufValidated.error,
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
        !cityValidated.value &&
        !ufValidated.value &&
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
        city: cityValidated.error,
        uf: ufValidated.error,
        course: courseValidated.error,
        university: universityValidated.error,
      });
      if (
        !nameValidated.value &&
        !avatarValidated.value &&
        !cityValidated.value &&
        !ufValidated.value &&
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
      message:
        errors.cnpj !== '' ? 'CNPJ inválido' : 'Preencha todos os campos!',
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
          </>
        )}
      </Scroll>
    </View>
  );
};

export default ProfileEdit;
