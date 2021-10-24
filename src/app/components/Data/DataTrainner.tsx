import {Label, Space, Input, DropdownUF, Avatar} from 'components';
import React, {useState, useEffect} from 'react';
import {View} from 'react-native';

interface DataProps {
  dados: any;
  setDados: any;
  errors: any;
}

const DataTrainner = ({dados, setDados, errors}: DataProps) => {
  const [name, setName] = useState(dados.name || '');
  const [slogan, setSlogan] = useState(dados.slogan || '');
  const [uf, setUF] = useState(dados.uf || '');
  const [city, setCity] = useState(dados.city || '');
  const [course, setCourse] = useState(dados.course || '');
  const [university, setUniversity] = useState(dados.university || '');
  const [experience, setExperience] = useState(dados.experience || '');
  const [specs, setSpecs] = useState(dados.specs || '');

  useEffect(() => {
    setDados({
      ...dados,
      name: name,
      slogan: slogan,
      uf: uf,
      city: city,
      course: course,
      university: university,
      experience: experience,
      specs: specs,
    });
  }, [name, slogan, uf, city, course, university, experience, specs]);
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

      <Label title="Informações do Treinador" />
      <Space marginVertical={4} />
      <Input
        placeholder="Formação acadêmica"
        value={course}
        onText={setCourse}
        error={errors.course}
      />
      <Input
        placeholder="Sigla - Faculdade"
        value={university}
        onText={setUniversity}
        error={errors.university}
      />
      <Input
        placeholder="Nível de experiência"
        value={experience}
        onText={setExperience}
      />
      <Input
        slogan
        placeholder="Especialidades"
        value={specs}
        onText={setSpecs}
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
          width="60%"
          value={city}
          city
          onText={setCity}
          error={errors.city}
        />
        <Space marginHorizontal={5} />
        <DropdownUF value={uf} onValue={setUF} error={errors.uf} />
      </View>
    </>
  );
};

export default DataTrainner;
