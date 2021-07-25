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
import React, {useState} from 'react';
import {showMessage} from 'react-native-flash-message';
import {cnpjValidate, fieldValidate} from 'validation';
import {ContainerTwo} from './styles';

interface StepProps {
  backStateChange: () => any;
  dados: any;
  setDados: any;
  navigation: any;
}

const Step4 = ({backStateChange, dados, setDados, navigation}: StepProps) => {
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
      const lesionValidated =
        dados.problemHealth.lesion.value === true
          ? fieldValidate(dados.problemHealth.lesion.lesion)
          : {value: false, error: ''};
      const breathValidated =
        dados.problemHealth.breath.value === true
          ? fieldValidate(dados.problemHealth.breath.breath)
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
        !breathValidated.value
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
  const FinallizedSignUp = () => {
    const validated = validate();
    setDados({...dados, completeRegister: true});
    if (validated) {
      return firestore()
        .collection('users')
        .doc(dados.uid)
        .update(dados)
        .then(res => {
          userPersist(dados);
          showMessage({
            type: 'success',
            message: 'Cadastro completo!',
          });
          navigation.navigate('Home');
        });
    }
    return showMessage({
      type: 'danger',
      message:
        errors.cnpj !== '' ? 'CNPJ inválido' : 'Preencha todos os campos!',
    });
  };
  return (
    <ContainerTwo>
      <Scroll>
        <SimpleHeader
          title="Dados"
          back
          onBack={backStateChange}
          size={18}
          weight={500}
          marginBottom={30}
        />
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
          title="Finalizar"
          color="#fff"
          size={15}
          weight={500}
          onPress={() => FinallizedSignUp()}
        />
      </Scroll>
    </ContainerTwo>
  );
};

export default Step4;
