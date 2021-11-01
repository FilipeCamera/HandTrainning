import {
  Label,
  Space,
  Input,
  Check,
  DropdownUF,
  Avatar,
  DropdownGender,
} from 'components';
import React, {useState, useEffect} from 'react';
import {View} from 'react-native';

interface DataProps {
  dados: any;
  setDados: any;
  errors: any;
}

const DataCommon = ({dados, setDados, errors}: DataProps) => {
  const [name, setName] = useState(dados.name || '');
  const [slogan, setSlogan] = useState(dados.slogan || '');
  const [uf, setUF] = useState(dados.uf || '');
  const [sex, setSex] = useState(dados.sex || '');
  const [city, setCity] = useState(dados.city || '');
  const [weight, setWeight] = useState(dados.weight || '');
  const [age, setAge] = useState(dados.age || '');
  const [height, setHeight] = useState(dados.height || '');
  const [lesionText, setLesionText] = useState(
    dados.problemHealth ? dados.problemHealth.lesion.desc : '',
  );
  const [breathText, setBreathText] = useState(
    dados.problemHealth ? dados.problemHealth.breath.desc : '',
  );
  const [lesion, setLesion] = useState(
    dados.problemHealth ? dados.problemHealth.lesion.value : false,
  );
  const [breath, setBreath] = useState(
    dados.problemHealth ? dados.problemHealth.breath.value : false,
  );
  const [diabete, setDiabete] = useState(
    dados.problemHealth ? dados.problemHealth.diabete.value : false,
  );
  const [obesity, setObesity] = useState(
    dados.problemHealth ? dados.problemHealth.obesity.value : false,
  );
  const [hypertension, setHypertension] = useState(
    dados.problemHealth ? dados.problemHealth.hypertension.value : false,
  );
  const [arthritis, setArthritis] = useState(
    dados.problemHealth ? dados.problemHealth.arthritis.value : false,
  );
  const [arthrosis, setArthrosis] = useState(
    dados.problemHealth ? dados.problemHealth.arthrosis.value : false,
  );
  const [cholesterol, setCholesterol] = useState(
    dados.problemHealth ? dados.problemHealth.cholesterol.value : false,
  );
  const [cancer, setCancer] = useState(
    dados.problemHealth ? dados.problemHealth.cancer.value : false,
  );
  useEffect(() => {
    console.log(breathText);
    if (lesion === false) {
      setLesionText('');
    }
    if (breath === false) {
      setBreathText('');
    }
    setDados({
      ...dados,
      name: name,
      slogan: slogan,
      city: city,
      uf: uf,
      age: age,
      sex: sex,
      height: height,
      weight: weight,
      problemHealth: {
        diabete: {title: 'Diabete', value: diabete},
        lesion: {title: 'Lesão', value: lesion, desc: lesionText},
        obesity: {title: 'Obesidade', value: obesity},
        hypertension: {title: 'Hipertensão', value: hypertension},
        arthritis: {title: 'Artrite', value: arthritis},
        arthrosis: {title: 'Artrose', value: arthritis},
        cholesterol: {title: 'Colesterol', value: cholesterol},
        cancer: {title: 'Câncer', value: cancer},
        breath: {
          title: 'Problemas respiratórios',
          value: breath,
          desc: breathText,
        },
      },
    });
  }, [
    name,
    slogan,
    city,
    uf,
    age,
    sex,
    height,
    weight,
    diabete,
    lesion,
    lesionText,
    obesity,
    hypertension,
    arthritis,
    cholesterol,
    cancer,
    breath,
    breathText,
  ]);
  return (
    <>
      <Label title="Perfil" />
      <Space marginVertical={4} />
      <Avatar edit dados={dados} setDados={setDados} error={errors.avatar} />
      <Input
        placeholder="Nome"
        value={name}
        onText={setName}
        error={errors.name}
      />
      <Input
        slogan
        placeholder="Slogan"
        multiline={2}
        value={slogan}
        onText={setSlogan}
      />
      <Space marginVertical={20} />

      <Label title="Informações do Aluno" />
      <Space marginVertical={4} />
      <View
        style={{
          flexDirection: 'row',
          width: '95%',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
        <Input
          city
          placeholder="Cidade"
          width="60%"
          value={city}
          onText={setCity}
          error={errors.city}
        />
        <Space marginHorizontal={5} />
        <DropdownUF value={uf} onValue={setUF} error={errors.uf} />
      </View>
      <View style={{width: '95%', marginVertical: 8}}>
        <DropdownGender value={sex} onValue={setSex} error={errors.sex} />
      </View>
      <View
        style={{
          flexDirection: 'row',
          width: '95%',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
        <Input
          city
          placeholder="Idade"
          width="30%"
          value={age}
          onText={setAge}
          error={errors.age}
          numeric
        />
        <Input
          city
          placeholder="Peso"
          width="30%"
          value={weight}
          onText={setWeight}
          error={errors.weight}
          numeric
        />
        <Input
          city
          placeholder="Altura"
          width="30%"
          value={height}
          onText={setHeight}
          error={errors.height}
          numeric
        />
      </View>
      <Space marginVertical={20} />
      <Label title="Problemas de saúde" />
      <Space marginVertical={4} />
      <View
        style={{
          flexDirection: 'column',
          alignItems: 'flex-start',
          width: '95%',
        }}>
        <Check title="Diabete" value={diabete} setValue={setDiabete} />
        <Check title="Lesão" value={lesion} setValue={setLesion} />
        {!!lesion && (
          <View style={{marginLeft: 30}}>
            <Input
              slogan
              placeholder="Quais?"
              multiline={4}
              value={lesionText}
              onText={e => {
                setLesionText(e);
              }}
              error={errors.lesion}
            />
          </View>
        )}
        <Check title="Obesidade" value={obesity} setValue={setObesity} />
        <Check
          title="Hipertensão"
          value={hypertension}
          setValue={setHypertension}
        />
        <Check title="Artrite" value={arthritis} setValue={setArthritis} />
        <Check title="Artrose" value={arthrosis} setValue={setArthrosis} />
        <Check
          title="Colesterol alto"
          value={cholesterol}
          setValue={setCholesterol}
        />
        <Check title="Câncer" value={cancer} setValue={setCancer} />
        <Check
          title="Doenças respiratórias"
          value={breath}
          setValue={setBreath}
        />
        {!!breath && (
          <View style={{marginLeft: 30}}>
            <Input
              slogan
              placeholder="Quais?"
              multiline={2}
              value={breathText}
              onText={e => setBreathText(e)}
              error={errors.breath}
            />
          </View>
        )}
      </View>
    </>
  );
};

export default DataCommon;
