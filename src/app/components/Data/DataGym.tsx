import {Label, Space, Input, DropdownUF, Avatar} from 'components';
import React, {useState, useEffect} from 'react';
import {View} from 'react-native';
import maskCNPJ from '@mask';

interface DataProps {
  dados: any;
  setDados: any;
  errors: any;
}

const DataGym = ({dados, setDados, errors}: DataProps) => {
  const [name, setName] = useState('');
  const [slogan, setSlogan] = useState('');
  const [cnpj, setCnpj] = useState('');
  const [uf, setUF] = useState(null);
  const [city, setCity] = useState('');

  useEffect(() => {
    setDados({
      ...dados,
      name: name,
      slogan: slogan,
      cnpj: cnpj,
      uf: uf,
      city: city,
    });
  }, [name, slogan, cnpj, uf, city]);

  const setCNPJ = (e: string) => {
    setCnpj(maskCNPJ(e));
  };
  return (
    <>
      <Label title="Perfil" />
      <Space marginVertical={4} />
      <Avatar
        edit={true}
        dados={dados}
        setDados={setDados}
        error={errors.avatar}
      />
      <Input
        placeholder="Nome da academia"
        value={name}
        onText={e => setName(e)}
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

      <Label title="Informações da Academia" />
      <Space marginVertical={4} />
      <Input
        placeholder="CNPJ"
        value={cnpj}
        onText={setCNPJ}
        error={errors.cnpj}
      />
      <View
        style={{
          flexDirection: 'row',
          width: '95%',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
        <Input
          placeholder="Cidade"
          width="65%"
          value={city}
          onText={setCity}
          error={errors.city}
          city
        />
        <Space marginHorizontal={5} />
        <DropdownUF value={uf} onValue={setUF} error={errors.uf} />
      </View>
    </>
  );
};

export default DataGym;
