import {
  ButtonRed,
  DateTime,
  DropdownCategoryType,
  Input,
  SimpleHeader,
  Space,
  Text,
} from 'components';
import React, {useState} from 'react';
import {View} from 'react-native';

import Line from 'assets/svg/Line.svg';

import {PostsStyle} from './styles';

const Posts = () => {
  const [type, setType] = useState('');
  const [errors, setErrors] = useState({type: ''});
  return (
    <PostsStyle
      contentContainerStyle={{
        flexGrow: 1,
        padding: 16,
        alignItems: 'center',
        width: '100%',
      }}
      showsVerticalScrollIndicator={false}>
      <SimpleHeader title="Postagem" color="#090A0A" size={20} weight={500} />
      <Space marginVertical={20} />
      <DropdownCategoryType
        value={type}
        onValue={e => setType(e)}
        error={errors.type}
      />
      <Space marginVertical={4} />
      {type === 'warning' && (
        <>
          <Input placeholder="Título" />
          <Input placeholder="Descrição" />
          <Space marginVertical={20} />
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-around',
              width: '95%',
            }}>
            <Line width="100px" />
            <Text title="duração" size={16} weight={500} color="#D3D3D3" />
            <Line width="100px" />
          </View>
          <Space marginVertical={8} />
          <DateTime />
          <Space marginVertical={30} />
          <ButtonRed title="Postar" color="#fff" size={15} weight={500} />
        </>
      )}
      {type === 'posts' && (
        <>
          <Input placeholder="Título" />
          <Input placeholder="Destaque" />
          <Input placeholder="Descrição" />
          <Space marginVertical={20} />
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-around',
              width: '95%',
            }}>
            <Line width="100px" />
            <Text title="duração" size={16} weight={500} color="#D3D3D3" />
            <Line width="100px" />
          </View>
          <Space marginVertical={8} />
          <DateTime />
          <Space marginVertical={30} />
          <ButtonRed title="Postar" color="#fff" size={15} weight={500} />
        </>
      )}
    </PostsStyle>
  );
};

export default Posts;
