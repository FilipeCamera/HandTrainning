import Colors from '@styles';
import {Card, CarouselWarnings, Header, Space, Text} from 'components';
import {firestore} from 'firebase';
import React, {useEffect, useState} from 'react';
import {ActivityIndicator, Image, TouchableOpacity, View} from 'react-native';
import {useSelector} from 'react-redux';
import CreateTrainning from './CreateTrainning';
import {StudentStyle} from './styles';

const Students = ({navigation}: any) => {
  const user = useSelector((state: any) => state.auth.user);
  const gym = useSelector((state: any) => state.trainner.gym);
  const [state, setState] = useState('');
  const [loading, setLoading] = useState(true);
  const [profileGym, setProfileGym] = useState<any>();
  const [buttonTitle, setButtonTitle] = useState('Criar treino');
  const [request, setRequest] = useState<any[]>([]);
  const items = [
    {title: 'Criar treino'},
    {title: 'Excluir'},
    {title: 'Editar'},
  ];

  useEffect(() => {
    firestore()
      .collection('users')
      .doc(gym.gym)
      .get()
      .then(querySnapshot => {
        setProfileGym(querySnapshot.data());
        setLoading(false);
      })
      .catch(err => {});
  }, []);

  useEffect(() => {
    firestore()
      .collection('requests')
      .where('trainnerId', '==', user.uid)
      .get()
      .then(querySnapshot => {
        const requests = querySnapshot.docs.map(doc => doc.data());
        setRequest(requests);
      })
      .catch(err => {});
  }, []);

  if (state === 'Criar treino') {
    return <CreateTrainning setState={setState} />;
  }
  return (
    <StudentStyle
      contentContainerStyle={{
        flexGrow: 1,
        padding: 16,
        alignItems: 'center',
        width: '100%',
      }}
      showsVerticalScrollIndicator={false}>
      <Header navigation={navigation} />
      <Space marginVertical={20} />
      {!!request && request.length !== 0 && <CarouselWarnings data={request} />}
      <Card>
        {!!loading && (
          <View
            style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            <ActivityIndicator size="large" color={Colors.red} />
          </View>
        )}
        {!loading && (
          <>
            <View style={{alignItems: 'flex-end'}}>
              <Text
                title="Total: 0 alunos"
                weight={500}
                size={12}
                color={Colors.grayMediumLight}
              />
            </View>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <View
                style={{
                  width: 28,
                  height: 28,
                  borderRadius: 14,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Image
                  source={{uri: profileGym.avatar}}
                  style={{width: '100%', height: '100%', borderRadius: 9999}}
                />
              </View>
              <Space marginHorizontal={4} />
              <View>
                <Text
                  title={profileGym.name}
                  size={14}
                  weight={500}
                  color={Colors.inputColorText}
                />
              </View>
            </View>
            <Space marginVertical={5} />
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              {items.map((item, index) => (
                <TouchableOpacity
                  onPress={() => {
                    setButtonTitle(item.title);
                    if (item.title === 'Criar treino') {
                      setState(item.title);
                    }
                  }}
                  key={item.title}
                  style={{
                    backgroundColor:
                      item.title === buttonTitle
                        ? Colors.redOpacity
                        : Colors.background,
                    marginRight: 8,
                    paddingHorizontal: 8,
                    paddingVertical: 3,
                    borderRadius: 8,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <Text
                    title={item.title}
                    size={12}
                    weight={500}
                    color={
                      item.title === buttonTitle ? Colors.red : Colors.gray
                    }
                  />
                </TouchableOpacity>
              ))}
            </View>
          </>
        )}
      </Card>
      <Space marginVertical={20} />
      <Card>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-around',
          }}>
          <View
            style={{
              backgroundColor: Colors.lightGreen,
              width: 45,
              height: 25,
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 8,
            }}>
            <Text title="NTR" weight={600} color={Colors.green} size={14} />
          </View>
          <View style={{width: '80%'}}>
            <Text
              title="Solicitação de novo treino"
              weight={500}
              color={Colors.inputColorText}
              size={14}
            />
          </View>
        </View>
        <Space marginVertical={8} />
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-around',
          }}>
          <View
            style={{
              width: 45,
              height: 25,
              borderRadius: 8,
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: Colors.lightOrange,
            }}>
            <Text title="DES" weight={600} color={Colors.orange} size={14} />
          </View>
          <View style={{width: '80%'}}>
            <Text
              title="O aluno não está mais vinculado a essa academia"
              weight={500}
              color={Colors.inputColorText}
              size={14}
            />
          </View>
        </View>
      </Card>
    </StudentStyle>
  );
};

export default Students;
