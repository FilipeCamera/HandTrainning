import {
  BoxUpload,
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
import {fieldValidate} from 'validation';
import {firestore} from 'firebase';
import {showMessage} from 'react-native-flash-message';
import {useSelector} from 'react-redux';
import Colors from '@styles';

const Posts = () => {
  const user = useSelector((state: any) => state.auth.user);
  const [type, setType] = useState('');
  const [image, setImage] = useState('');
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [emphasi, setEmphasi] = useState('');
  const [initial, setInitial] = useState('');
  const [finallized, setFinallized] = useState('');
  const [errors, setErrors] = useState({
    type: '',
    title: '',
    desc: '',
    initial: '',
    finallized: '',
  });

  const verify = () => {
    const titleVerified = fieldValidate(title);
    const descVerified = fieldValidate(desc);
    const finallizedVerified = fieldValidate(finallized);

    setErrors({
      ...errors,
      title: titleVerified.error,
      desc: descVerified.error,
      finallized: finallizedVerified.error,
    });

    if (
      !titleVerified.value &&
      !descVerified.value &&
      !finallizedVerified.value
    ) {
      return true;
    }
    return false;
  };

  const handleCreatePost = () => {
    const verified = verify();

    if (verified) {
      let data: any;
      if (type === 'posts') {
        data = {
          gym: user.uid,
          title: title,
          desc: desc,
          emphasi: emphasi,
          initial: initial,
          finallized: finallized,
          image: image,
          createdAt: firestore.FieldValue.serverTimestamp(),
        };
      }
      if (type === 'warning') {
        data = {
          gym: user.uid,
          title: title,
          desc: desc,
          initial: initial,
          finallized: finallized,
          createdAt: firestore.FieldValue.serverTimestamp(),
        };
      }
      firestore()
        .collection(`${type}`)
        .doc()
        .set(data)
        .then(() => {
          showMessage({
            type: 'success',
            message: 'Sucesso',
            description: 'Postagem criada.',
          });
          setType('');
          setDesc('');
          setTitle('');
          setImage('');
          setInitial('');
          setFinallized('');
          setEmphasi('');
        })
        .catch(error =>
          showMessage({
            type: 'danger',
            message: 'Erro',
            description: 'Problema ao criar a postagem',
          }),
        );
    }
  };
  return (
    <PostsStyle
      contentContainerStyle={{
        flexGrow: 1,
        padding: 16,
        alignItems: 'center',
        width: '100%',
      }}
      showsVerticalScrollIndicator={false}>
      <SimpleHeader
        title="Postagem"
        color={Colors.textColorBlack}
        size={20}
        weight={500}
      />
      <Space marginVertical={20} />
      <DropdownCategoryType
        value={type}
        onValue={e => setType(e)}
        error={errors.type}
      />
      <Space marginVertical={4} />
      {type === 'warning' && (
        <>
          <Input
            placeholder="Título"
            value={title}
            onText={e => setTitle(e)}
            error={errors.title}
          />
          <Input
            placeholder="Descrição"
            value={desc}
            onText={e => setDesc(e)}
            error={errors.desc}
          />
          <Space marginVertical={20} />
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-around',
              width: '95%',
            }}>
            <Line width="100px" />
            <Text
              title="duração"
              size={16}
              weight={500}
              color={Colors.lightGray}
            />
            <Line width="100px" />
          </View>
          <Space marginVertical={8} />
          <DateTime
            setFinallized={setFinallized}
            setInitial={setInitial}
            error={errors.finallized}
          />
          <Space marginVertical={25} />
          <ButtonRed
            title="Postar"
            color={Colors.background}
            size={15}
            weight={500}
            onPress={handleCreatePost}
          />
          <Space marginVertical={10} />
        </>
      )}
      {type === 'posts' && (
        <>
          <Input
            placeholder="Título"
            value={title}
            onText={e => setTitle(e)}
            error={errors.title}
          />
          <Input
            placeholder="Destaque"
            value={emphasi}
            onText={e => setEmphasi(e)}
          />
          <Input
            placeholder="Descrição"
            value={desc}
            onText={e => setDesc(e)}
            error={errors.desc}
          />
          <Space marginVertical={20} />
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-around',
              width: '95%',
            }}>
            <Line width="100px" />
            <Text
              title="duração"
              size={16}
              weight={500}
              color={Colors.lightGray}
            />
            <Line width="100px" />
          </View>
          <Space marginVertical={8} />
          <DateTime
            setFinallized={setFinallized}
            setInitial={setInitial}
            error={errors.finallized}
          />
          <Space marginVertical={20} />
          <BoxUpload setUrl={setImage} url={image} />
          <Space marginVertical={40} />
          <ButtonRed
            title="Postar"
            color={Colors.background}
            size={15}
            weight={500}
            onPress={handleCreatePost}
          />
          <Space marginVertical={10} />
        </>
      )}
    </PostsStyle>
  );
};

export default Posts;
