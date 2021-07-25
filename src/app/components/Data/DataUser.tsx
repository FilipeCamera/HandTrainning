import {Label, Space, Input, Check, DropDownUF, Avatar} from 'components';
import React, {useState, useEffect} from 'react';
import {View} from 'react-native';

interface DataProps {
  dados: any;
  setDados: any;
  errors: any;
}

const DataUser = ({dados, setDados, errors}: DataProps) => {
  const [name, setName] = useState('');
  const [slogan, setSlogan] = useState('');
  const [uf, setUF] = useState('');
  const [city, setCity] = useState('');
  const [weight, setWeight] = useState('');
  const [age, setAge] = useState('');
  const [height, setHeight] = useState('');
  const [lesion, setLesion] = useState(false);
  const [breath, setBreath] = useState(false);
  const [diabete, setDiabete] = useState(false);
  const [obesity, setObesity] = useState(false);
  const [hypertension, setHypertension] = useState(false);
  const [arthritis, setArthritis] = useState(false);
  const [arthrosis, setArthrosis] = useState(false);
  const [cholesterol, setCholesterol] = useState(false);
  const [cancer, setCancer] = useState(false);
  useEffect(() => {
    setDados({
      ...dados,
      name: name,
      slogan: slogan,
      city: city,
      uf: uf,
      age: age,
      height: height,
      weight: weight,
    });
  }, [name, slogan, city, uf, age, height, weight]);
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
          width="65%"
          value={city}
          onText={setCity}
          error={errors.city}
        />
        <Space marginHorizontal={5} />
        <DropDownUF value={uf} onValue={setUF} error={errors.uf} />
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
        />
        <Input
          city
          placeholder="Peso"
          width="30%"
          value={weight}
          onText={setWeight}
          error={errors.weight}
        />
        <Input
          city
          placeholder="Altura"
          width="30%"
          value={height}
          onText={setHeight}
          error={errors.height}
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
            <Input slogan placeholder="Qual ou quais?" multiline={2} />
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
            <Input slogan placeholder="Quais?" multiline={2} />
          </View>
        )}
      </View>
    </>
  );
};

export default DataUser;
