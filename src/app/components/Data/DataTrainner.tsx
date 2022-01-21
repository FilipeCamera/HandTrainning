import {Label, Space, Input, Avatar} from 'components';
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

  const [course, setCourse] = useState(dados.course || '');
  const [university, setUniversity] = useState(dados.university || '');
  const [experience, setExperience] = useState(dados.experience || '');
  const [specs, setSpecs] = useState(dados.specs || '');

  useEffect(() => {
    setDados({
      ...dados,
      name: name,
      slogan: slogan,
      course: course,
      university: university,
      experience: experience,
      specs: specs,
    });
  }, [name, slogan, course, university, experience, specs]);
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
        }}
      />
    </>
  );
};

export default DataTrainner;
