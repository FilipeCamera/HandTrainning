import {Label, Space, Input, DropDown, Avatar} from 'components';
import React, {useState} from 'react';
import {View} from 'react-native';

const DataTrainner = () => {
  return (
    <>
      <Label title="Perfil" />
      <Space marginVertical={4} />
      <Avatar />
      <Input placeholder="Nome" />
      <Input slogan placeholder="Slogan" multiline={2} />
      <Space marginVertical={20} />

      <Label title="Informações do Treinador" />
      <Space marginVertical={4} />
      <Input placeholder="Formação acadêmica" />
      <Input placeholder="Faculdade" />
      <Input placeholder="Nível de experiência" />
      <Input slogan placeholder="Especialidades" />
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
    </>
  );
};

export default DataTrainner;
