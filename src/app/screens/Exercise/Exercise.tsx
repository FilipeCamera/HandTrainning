import {SimpleHeader, Space, Text} from 'components';
import React, {useState, useEffect, useCallback} from 'react';
import {
  View,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Image,
  RefreshControl,
} from 'react-native';
import {ExerciseStyle} from './styles';

import Notify from 'assets/svg/Notify.svg';
import LineIcon from 'assets/svg/LineGran.svg';
import CreateExercise from './CreateExercise';
import {useSelector} from 'react-redux';
import Colors from '@styles';
import {useGetCategories, useGetExercise} from 'hooks';
import {showMessage} from 'react-native-flash-message';

const Exercise = () => {
  const user = useSelector((state: any) => state.auth.user);
  const getCategories = useGetCategories();
  const {getExerciseByGym, removeExercise} = useGetExercise();
  const [create, setCreate] = useState(false);
  const [exercises, setExercises] = useState<any>([]);
  const [categories, setCategories] = useState<any>([]);
  const [categoExer, setCatego] = useState('');
  const [loading, setLoading] = useState(true);
  const [refresh, setRefresh] = useState(false);

  const wait = timeout => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  };

  const onRefresh = useCallback(() => {
    setRefresh(true);
    setLoading(true);
    wait(100).then(() => setRefresh(false));
  }, []);

  const handleSelect = index => {
    categories.map((item, catIndex) => {
      if (catIndex === index) {
        return (item.selected = true);
      }
      return (item.selected = false);
    });
  };

  const handleRemoveExercise = exercise => {
    removeExercise({
      exercise: exercise,
      onComplete: res => {
        if (res) {
          showMessage({
            type: 'success',
            message: 'Exercício removido',
            description: 'O exercício foi apagado com sucesso',
          });
          setExercises(exercises.filter(exer => exer.name !== exercise.name));
        }
      },
      onFail: err => {},
    });
  };
  useEffect(() => {
    if (loading) {
      getExerciseByGym({
        uid: user.uid,
        onComplete: exerciseList => {
          if (exerciseList) {
            setExercises(exerciseList);
          }
        },
        onFail: err => {},
      });
    }
  }, [loading, refresh]);
  useEffect(() => {
    if (loading) {
      getCategories({
        onComplete: categoryList => {
          const array: any = [];
          if (categoryList) {
            categoryList.map(category => {
              array.push({
                name: category.label,
                value: category.value,
                selected: false,
              });
            });
            array[0].selected = true;
            setCategories(array);
            setCatego(array[0].value);
            setLoading(false);
          }
        },
        onFail: err => {},
      });
    }
  }, [loading, refresh]);

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
      refreshControl={
        <RefreshControl
          progressViewOffset={50}
          refreshing={refresh}
          onRefresh={onRefresh}
          colors={[Colors.red]}
          progressBackgroundColor={Colors.background}
        />
      }
      showsVerticalScrollIndicator={false}>
      <SimpleHeader
        add
        title="Exercícios"
        color={Colors.textColorBlack}
        size={20}
        weight={500}
        onAdd={() => setCreate(true)}
      />
      {!!loading && (
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <ActivityIndicator size="large" color={Colors.red} />
        </View>
      )}
      {!loading && exercises.length !== 0 && categories.length !== 0 && (
        <>
          <Space marginVertical={8} />
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
                        ? Colors.redMedium
                        : Colors.grayLight,
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
                      size={14}
                      weight={500}
                      color={
                        categories[index].selected
                          ? Colors.textColorWhite
                          : Colors.textColorRX
                      }
                    />
                  </TouchableOpacity>
                );
              })}
            </ScrollView>
          </View>
        </>
      )}
      <Space marginVertical={20} />
      {!loading &&
        exercises.length !== 0 &&
        exercises.map(exercise => {
          if (exercise.category === categoExer) {
            return (
              <>
                <View key={exercise.name} style={{width: '100%'}}>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      paddingHorizontal: 8,
                    }}>
                    <View style={{flexDirection: 'column'}}>
                      <View style={{width: 50, height: 50}}>
                        <Image
                          source={{uri: exercise.url}}
                          style={{width: '100%', height: '100%'}}
                        />
                      </View>
                      {exercise.urlTwo !== '' && <Space marginVertical={4} />}
                      {exercise.urlTwo !== '' && (
                        <View style={{width: 50, height: 50}}>
                          <Image
                            source={{uri: exercise.urlTwo}}
                            style={{width: '100%', height: '100%'}}
                          />
                        </View>
                      )}
                    </View>
                    <Space marginHorizontal={4} />
                    <View style={{flex: 1}}>
                      <Text
                        title={exercise.name}
                        size={15}
                        weight={600}
                        color={Colors.textColorBlack}
                      />
                    </View>
                    <TouchableOpacity
                      style={{
                        backgroundColor: Colors.lightRed2,
                        paddingHorizontal: 12,
                        paddingVertical: 5,
                        borderRadius: 8,
                      }}
                      onPress={() => handleRemoveExercise(exercise)}>
                      <Text
                        title="Excluir"
                        size={13}
                        weight={500}
                        color={Colors.redMedium}
                      />
                    </TouchableOpacity>
                  </View>
                  <Space marginVertical={4} />
                  <LineIcon width="100%" />
                </View>
                <Space marginVertical={8} />
              </>
            );
          } else {
            return (
              <View
                style={{
                  flex: 1,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Text
                  title="Exercício não encontrado"
                  size={14}
                  weight={500}
                  color={Colors.grayMediumLight}
                />
              </View>
            );
          }
        })}
      {!loading && exercises.length === 0 && (
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
            color={Colors.grayMediumLight}
          />
        </View>
      )}
    </ExerciseStyle>
  );
};

export default Exercise;
