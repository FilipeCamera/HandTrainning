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
import React, {useState, useEffect} from 'react';
import {showMessage} from 'react-native-flash-message';
import {fieldValidate} from 'validation';
import {ContainerTwo} from './styles';

interface StepProps {
  backStateChange: () => any;
  dados: any;
  setDados: any;
  navigation: any;
  user: any;
}

const Step4 = ({
  backStateChange,
  dados,
  setDados,
  navigation,
  user,
}: StepProps) => {
  const [complete, setComplete] = useState(false);
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

  useEffect(() => {
    setDados({...dados, completeRegister: true});
    if (dados.completeRegister) {
      setComplete(true);
    }
  }, []);
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
  const FinallizedSignUp = () => {
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
            message: 'Cadastro completo!',
          });
          navigation.navigate('Dashboard');
        });
    }
    return showMessage({
      type: 'danger',
      message: 'Preencha todos os campos!',
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

        <Space marginVertical={25} />
        <ButtonRed
          title="Finalizar"
          color={Colors.textColorWhite}
          size={15}
          weight={500}
          onPress={() => FinallizedSignUp()}
        />
      </Scroll>
    </ContainerTwo>
  );
};

export default Step4;
