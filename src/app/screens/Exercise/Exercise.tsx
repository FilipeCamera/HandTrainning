import {Button, SimpleHeader, Space, Text} from 'components';
import React, {useState, useEffect} from 'react';
import {View, ScrollView, TouchableOpacity} from 'react-native';
import {ExerciseStyle} from './styles';

import Notify from 'assets/svg/Notify.svg';
import LineIcon from 'assets/svg/LineGran.svg';
import CreateExercise from './CreateExercise';
import {firestore} from 'firebase';
import {useSelector} from 'react-redux';

const Exercise = () => {
  const user = useSelector((state: any) => state.auth.user);
  const [create, setCreate] = useState(false);
  const [exercises, setExercises] = useState<any>([]);
  const [categories, setCategories] = useState<any>([]);
  const [categoExer, setCatego] = useState('');

  const handleSelect = index => {
    categories.map((item, catIndex) => {
      if (catIndex === index) {
        return (item.selected = true);
      }
      return (item.selected = false);
    });
  };
  useEffect(() => {
    firestore()
      .collection('exercises')
      .where('gym', '==', user.uid)
      .get()
      .then(querySnapshot => {
        const list = querySnapshot.docs.map(doc => doc.data());
        setExercises(list);
      });
  }, [exercises]);
  useEffect(() => {
    firestore()
      .collection('categories')
      .get()
      .then(querySnapshot => {
        const list = querySnapshot.docs.map(doc => doc.data());
        const array: any = [];

        list.map(item => {
          array.push({
            name: item.label,
            value: item.value,
            selected: false,
          });
        });
        array[0].selected = true;
        setCategories(array);
        setCatego(array[0].value);
      });
  }, []);

  if (create) {
    return <CreateExercise goBack={setCreate} user={user} />;
  }
  return (
    <ExerciseStyle
      contentContainerStyle={{
        flexGrow: 1,
        padding: 16,
        alignItems: 'center',
        width: '100%',
      }}
      showsVerticalScrollIndicator={false}>
      <SimpleHeader
        add
        title="Exercícios"
        color="#090A0A"
        size={20}
        weight={500}
        onAdd={() => setCreate(true)}
      />

      {exercises.length !== 0 && categories.length !== 0 && (
        <View style={{height: 50}}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{
              alignItems: 'center',
              flexGrow: 1,
            }}>
            {categories.map((category: any, index: any) => {
              return (
                <TouchableOpacity
                  key={category.name}
                  style={{
                    backgroundColor: categories[index].selected
                      ? '#DCFFB2'
                      : '#E0E1E5',
                    paddingVertical: 8,
                    paddingHorizontal: 12,
                    borderRadius: 8,
                    marginHorizontal: 8,
                  }}
                  onPress={() => {
                    setCatego(category.value);
                    handleSelect(index);
                  }}>
                  <Text
                    title={category.name}
                    size={12}
                    weight={500}
                    color={categories[index].selected ? '#34A853' : '#454459'}
                  />
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>
      )}
      <Space marginVertical={20} />
      {exercises.length !== 0 &&
        exercises.map(exercise => {
          if (exercise.category === categoExer) {
            return (
              <View key={exercise.name} style={{width: '100%'}}>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    paddingHorizontal: 8,
                  }}>
                  <Text
                    title={exercise.name}
                    size={15}
                    weight={600}
                    color="#090a0a"
                  />
                  <TouchableOpacity
                    style={{
                      backgroundColor: '#FFE1DE',
                      paddingHorizontal: 12,
                      paddingVertical: 5,
                      borderRadius: 8,
                    }}>
                    <Text
                      title="Excluir"
                      size={12}
                      weight={500}
                      color="#CC5347"
                    />
                  </TouchableOpacity>
                </View>
                <Space marginVertical={2} />
                <LineIcon width="100%" />
              </View>
            );
          }
        })}
      {exercises.length === 0 && (
        <View
          style={{
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            flex: 1,
          }}>
          <Notify />
          <Space marginVertical={10} />
          <Text
            title="Nenhum exercício criado"
            size={16}
            weight={500}
            color="#D0D0D0"
          />
        </View>
      )}
    </ExerciseStyle>
  );
};

export default Exercise;
