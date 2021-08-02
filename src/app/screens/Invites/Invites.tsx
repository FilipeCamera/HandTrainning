import {ButtonInvite, Header, Label, Search, Space, Text} from 'components';
import {useGetUser, useInvites} from 'hooks';
import React, {useState, useEffect} from 'react';
import {View, Image} from 'react-native';
import {useSelector} from 'react-redux';
import {InvitesStyle} from './styles';

const Invites = () => {
  const user = useSelector((state: any) => state.auth.user);
  const {searchUser, getUsersByInvited} = useGetUser();
  const {getInvites} = useInvites();
  const [userSearch, setUserSearch] = useState('');
  const [users, setUsers] = useState([]);
  const [invitedUsers, setInvitedUsers] = useState([]);
  const [invites, setInvites] = useState([]);

  useEffect(() => {
    getInvites(user.uid, {
      onComplete: invites => {
        if (invites) {
          setInvites(invites);
        }
      },
      onFail: error => console.log(error),
    });
  }, []);

  useEffect(() => {
    invites.map(invite => {
      getUsersByInvited(invite.to, {
        onComplete: users => {
          if (users) {
            setInvitedUsers(users);
          }
        },
        onFail: error => console.log(error),
      });
    });
  }, [invites]);

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
      <Search
        user={userSearch}
        onSearch={e => {
          setUserSearch(e),
            searchUser(e, {
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
        }}
      />
      {users.length !== 0 &&
        users.map(userInvite => {
          return (
            <View
              key={userInvite.uid}
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
                    source={{uri: userInvite.avatar}}
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
                    title={userInvite.name}
                    size={16}
                    weight={600}
                    color="#090A0A"
                  />
                  <Text
                    title={
                      userInvite.type === 'common'
                        ? 'Aluno(a)'
                        : userInvite.type === 'trainner'
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
                <ButtonInvite
                  title="Enviar convite"
                  sendTitle="Convite enviado"
                  size={10}
                  weight={600}
                  color="#fff"
                  uid={user.uid}
                  from={userInvite.uid}
                />
              </View>
            </View>
          );
        })}
      <Space marginVertical={5} />
      {users.length === 0 && user.type === 'gym' && (
        <Label title="Treinadores" />
      )}
      {users.length === 0 && user.type !== 'gym' && <Label title="Academias" />}
      <Space marginVertical={4} />
      {users.length === 0 &&
        invitedUsers.length !== 0 &&
        invitedUsers.map(invitedUser => {
          if (invitedUser.type === 'trainner') {
            return (
              <View
                key={invitedUser.uid}
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
                      source={{uri: invitedUser.avatar}}
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
                      title={invitedUser.name}
                      size={16}
                      weight={600}
                      color="#090A0A"
                    />
                    <Text
                      title={
                        invitedUser.type === 'common'
                          ? 'Aluno(a)'
                          : 'Treinador(a)'
                      }
                      size={14}
                      weight={500}
                      color="#090A0A"
                    />
                  </View>
                </View>
                <View style={{height: 30}} />
              </View>
            );
          }
        })}
      <Space marginVertical={20} />
      {users.length === 0 && user.type !== 'common' && <Label title="Alunos" />}
      {users.length === 0 && user.type === 'common' && (
        <Label title="Treinadores" />
      )}
      {users.length === 0 &&
        invitedUsers.length !== 0 &&
        invitedUsers.map(invitedUser => {
          if (invitedUser.type === 'common') {
            return (
              <View
                key={invitedUser.uid}
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
                      source={{uri: invitedUser.avatar}}
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
                      title={invitedUser.name}
                      size={16}
                      weight={600}
                      color="#090A0A"
                    />
                    <Text
                      title={
                        invitedUser.type === 'common'
                          ? 'Aluno(a)'
                          : 'Treinador(a)'
                      }
                      size={14}
                      weight={500}
                      color="#090A0A"
                    />
                  </View>
                </View>
                <View style={{height: 30}} />
              </View>
            );
          }
        })}
    </InvitesStyle>
  );
};

export default Invites;
