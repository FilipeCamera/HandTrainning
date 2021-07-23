import {Label, Space, Input, Check, DropDown, Avatar} from 'components';
import React, {useState} from 'react';
import {View} from 'react-native';

const DataUser = () => {
  const [lesion, setLesion] = useState(false);
  const [breath, setBreath] = useState(false);
  const [diabete, setDiabete] = useState(false);
  const [obesity, setObesity] = useState(false);
  const [hypertension, setHypertension] = useState(false);
  const [arthritis, setArthritis] = useState(false);
  const [arthrosis, setArthrosis] = useState(false);
  const [cholesterol, setCholesterol] = useState(false);
  const [cancer, setCancer] = useState(false);

  return (
    <>
      <Label title="Perfil" />
      <Space marginVertical={4} />
      <Avatar />
      <Input placeholder="Nome" />
      <Input slogan placeholder="Slogan" multiline={2} />
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
        <Input placeholder="Cidade" width="65%" />
        <Space marginHorizontal={5} />
        <DropDown />
      </View>
      <View
        style={{
          flexDirection: 'row',
          width: '95%',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
        <Input placeholder="Idade" width="30%" />
        <Input placeholder="Peso" width="30%" />
        <Input placeholder="Altura" width="30%" />
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
