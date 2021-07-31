import {ButtonMiniRed, Header, Search, Text} from 'components';
import {useGetUser} from 'hooks';
import React, {useState, useEffect} from 'react';
import {View, Image} from 'react-native';
import {InvitesStyle} from './styles';

const Invites = () => {
  const {searchUser} = useGetUser();
  const [user, setUser] = useState('');
  const [users, setUsers] = useState([]);
  useEffect(() => {
    if (user !== '') {
      searchUser(user, {
        onComplete: (users: any) => {
          if (users) {
            setUsers(users);
          }
          return;
        },
        onFail: (error: any) => {
          console.log(error);
        },
      });
    }
    if (user.length === 0) {
      setUsers([]);
    }
  }, [user]);
  return (
    <InvitesStyle
      contentContainerStyle={{
        flexGrow: 1,
        padding: 16,
        alignItems: 'center',
        width: '100%',
      }}
      showsVerticalScrollIndicator={false}>
      <Header />
      <Search user={user} onSearch={e => setUser(e)} />
      {users.length !== 0 &&
        users.map(user => (
          <View
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
                  source={{uri: user.avatar}}
                  style={{width: '100%', height: '100%', borderRadius: 999}}
                />
              </View>
              <View
                style={{
                  flexDirection: 'column',
                  alignItems: 'flex-start',
                  marginLeft: 8,
                }}>
                <Text
                  title={user.name}
                  size={16}
                  weight={600}
                  color="#090A0A"
                />
                <Text
                  title={
                    user.type === 'common'
                      ? 'Aluno(a)'
                      : user.type === 'trainner'
                      ? 'Treinador(a)'
                      : 'Academia'
                  }
                  size={14}
                  weight={500}
                  color="#090A0A"
                />
              </View>
            </View>
            <View style={{height: 30}}>
              <ButtonMiniRed
                title="Enviar convite"
                size={10}
                weight={600}
                color="#fff"
              />
            </View>
          </View>
        ))}
    </InvitesStyle>
  );
};

export default Invites;
