import {ButtonText, Search, SimpleHeader, Space, Text} from 'components';
import {firestore} from 'firebase';
import React, {useEffect, useState} from 'react';
import {BackHandler, Image, View} from 'react-native';
import {Container} from './styles';

const ProfileGymStateScreen = ({onBack, user, title, type}: any) => {
  const [users, setUsers] = useState<[]>([]);
  const handleCreate = () => {
    onBack('');
    return true;
  };
  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      handleCreate,
    );
    return () => backHandler.remove();
  }, []);

  useEffect(() => {
    async function loadUsers() {
      if (type === 'common') {
        await firestore()
          .collection('users')
          .where('type', '==', 'common')
          .where('userAssociate', '==', user.uid)
          .get()
          .then(querySnapshot => {
            const commons = querySnapshot.docs.map(doc => doc.data());
            setUsers(commons);
          });
      }
      if (type === 'trainner') {
        await firestore()
          .collection('users')
          .where('type', '==', 'trainner')
          .where('userAssociate', 'array-contains', user.uid)
          .get()
          .then(querySnapshot => {
            const trainners = querySnapshot.docs.map(doc => doc.data());
            setUsers(trainners);
          });
      }
    }
    loadUsers();
  }, []);
  return (
    <Container
      contentContainerStyle={{
        flexGrow: 1,
        alignItems: 'center',
        width: '100%',
        padding: 16,
      }}
      showsVerticalScrollIndicator={false}>
      <SimpleHeader
        back
        title={title}
        size={18}
        weight={500}
        color="#090A0A"
        onBack={() => onBack('')}
      />
      {type === 'common' && <Search />}
      {type !== 'common' && <Space marginVertical={10} />}
      {users.length !== 0 &&
        users.map(userData => (
          <View
            key={userData.uid}
            style={{
              width: '100%',
              backgroundColor: '#fff',
              padding: 16,
              borderRadius: 10,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginVertical: 8,
              shadowColor: '#1C2439',
              shadowOffset: {
                width: 0,
                height: 2,
              },
              shadowOpacity: 0.25,
              shadowRadius: 3.84,

              elevation: 5,
            }}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <View style={{width: 60, height: 60, borderRadius: 30}}>
                <Image
                  source={{uri: userData.avatar}}
                  style={{
                    width: '100%',
                    height: '100%',
                    borderRadius: 999,
                  }}
                />
              </View>
              <View
                style={{
                  flexDirection: 'column',
                  alignItems: 'flex-start',
                  marginLeft: 8,
                }}>
                <Text
                  title={userData.name}
                  size={16}
                  weight={600}
                  color="#090A0A"
                />
                <Text
                  title={
                    userData.type === 'common' ? 'Aluno(a)' : 'Treinador(a)'
                  }
                  size={14}
                  weight={500}
                  color="#090A0A"
                />
              </View>
            </View>
            <View
              style={{
                width: 70,
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <ButtonText
                title="Remover"
                weight={400}
                size={12}
                color="#FF6859"
                onPress={() => {}}
              />
            </View>
          </View>
        ))}
    </Container>
  );
};

export default ProfileGymStateScreen;
