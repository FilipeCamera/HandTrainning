import {
  ButtonInvite,
  ButtonMiniRed,
  ButtonText,
  Header,
  Label,
  Search,
  Space,
  Text,
} from 'components';
import {firestore} from 'firebase';
import {useGetUser, useInvites, useVerification} from 'hooks';
import React, {useState, useEffect} from 'react';
import {View, Image} from 'react-native';
import {showMessage} from 'react-native-flash-message';
import {useSelector} from 'react-redux';
import {InvitesStyle} from './styles';

const Invites = () => {
  const user = useSelector((state: any) => state.auth.user);
  const {searchUser, getUsers} = useGetUser();
  const {verifyUserAssociate, verifyUserIsGym} = useVerification();
  const {getInvites, acceptedInvite} = useInvites();
  const [userSearch, setUserSearch] = useState('');
  const [users, setUsers] = useState<any>([]);
  const [usersSearch, setUsersSearch] = useState([]);
  const [invites, setInvites] = useState<any>([]);
  const [verified, setVerified] = useState(false);

  useEffect(() => {
    getInvites(user.uid, {
      onComplete: invites => {
        if (invites) {
          setInvites(invites);
        }
      },
      onFail: error => console.log(error),
    });
    getUsers({
      onComplete: users => {
        setUsers(users);
      },
      onFail: error => console.log(error),
    });
  }, []);

  const verify = async ({user, uid}: any) => {
    await verifyUserIsGym(user, uid, {
      onComplete: (error: any) => {
        if (error) {
          showMessage({type: 'warning', message: error});
          return setVerified(false);
        } else {
          return setVerified(true);
        }
      },
      onFail: error => console.log(error),
    });
    await verifyUserAssociate(uid, {
      onComplete: (error: any) => {
        if (error) {
          showMessage({type: 'warning', message: error});
          return setVerified(false);
        } else {
          return setVerified(true);
        }
      },
      onFail: error => {
        console.log(error);
      },
    });
  };
  const handleAcceptOrRecused = async ({state, uid}: any) => {
    await verify({user, uid});
    const invite = await firestore()
      .collection('invites')
      .where('to', '==', uid)
      .get()
      .then(res => {
        return res.docs.map(doc => {
          return {id: doc.id};
        });
      });
    if (!state) {
      return await acceptedInvite(invite, state, {
        onComplete: async (status: boolean) => {
          if (!status) {
            setUsers(users.filter(user => user.uid !== uid));
          }
        },
        onFail: error => {
          console.log(error);
        },
      });
    }
    if (verified) {
      return await acceptedInvite(invite, state, {
        onComplete: async (status: boolean) => {
          if (status) {
            const users: any = await firestore()
              .collection('relations')
              .doc(user.uid)
              .get()
              .then(querySnapshot => {
                return querySnapshot.data();
              });
            const data = {
              createdAt: firestore.FieldValue.serverTimestamp(),
              type: user.type,
              users: [...users, uid],
            };
            await firestore()
              .collection('relations')
              .doc(user.uid)
              .set(data)
              .then(() => {
                firestore()
                  .collection('users')
                  .where('uid', '==', uid)
                  .where('type', '==', 'trainner')
                  .get()
                  .then(querySnapshot => {
                    const trainner = querySnapshot.docs.map(doc => doc.data());
                    firestore()
                      .collection('users')
                      .doc(trainner[0].uid)
                      .update({userAssociate: [user.uid]});
                  });
                firestore()
                  .collection('users')
                  .doc(uid)
                  .update({userAssociate: user.uid});
              })
              .catch(error => console.log(error));
            setUsers(users.filter(user => user.uid !== uid));
          }
        },
        onFail: error => {
          console.log(error);
        },
      });
    } else {
      return;
    }
  };

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
                  setUsersSearch(users);
                }
                return;
              },
              onFail: (error: any) => {
                console.log(error);
              },
            });
        }}
      />
      {usersSearch.length !== 0 &&
        usersSearch.map(userInvite => {
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
                  to={user}
                  from={userInvite.uid}
                />
              </View>
            </View>
          );
        })}
      <Space marginVertical={5} />
      {usersSearch.length === 0 && user.type === 'gym' && (
        <Label title="Treinadores" />
      )}
      <Space marginVertical={4} />
      {usersSearch.length === 0 &&
        users.map(userInvite => {
          const invite = invites.filter(invite => invite.to === userInvite.uid);
          const status = invite.length > 0 ? invite[0].accept : {status: null};
          if (status === null) {
            if (userInvite.type === 'trainner') {
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
                        title={userInvite.name}
                        size={16}
                        weight={600}
                        color="#090A0A"
                      />
                      <Text
                        title={
                          userInvite.type === 'common'
                            ? 'Aluno(a)'
                            : 'Treinador(a)'
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
                    <ButtonMiniRed
                      title="Aceitar"
                      weight={600}
                      size={13}
                      color="#FFF"
                      onPress={() =>
                        handleAcceptOrRecused({
                          state: true,
                          uid: userInvite.uid,
                        })
                      }
                    />
                    <Space marginVertical={5} />
                    <ButtonText
                      title="Recusar"
                      weight={400}
                      size={12}
                      color="#FF6859"
                      onPress={() =>
                        handleAcceptOrRecused({
                          state: false,
                          uid: userInvite.uid,
                        })
                      }
                    />
                  </View>
                </View>
              );
            }
          }
        })}
      {usersSearch.length === 0 && user.type !== 'gym' && (
        <Label title="Academias" />
      )}
      {usersSearch.length === 0 &&
        user.type !== 'gym' &&
        users.map(user => {
          const invite = invites.filter(invite => invite.to === user.uid);
          const status = invite.length > 0 ? invite[0].accept : {status: null};

          if (status === null) {
            if (user.type === 'trainner') {
              return (
                <View
                  key={user.uid}
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
                        title={user.name}
                        size={16}
                        weight={600}
                        color="#090A0A"
                      />
                      <Text
                        title={
                          user.type === 'common' ? 'Aluno(a)' : 'Treinador(a)'
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
                    <ButtonMiniRed
                      title="Aceitar"
                      weight={600}
                      size={13}
                      color="#FFF"
                      onPress={() =>
                        handleAcceptOrRecused({
                          state: true,
                          uid: user.uid,
                        })
                      }
                    />
                    <Space marginVertical={5} />
                    <ButtonText
                      title="Recusar"
                      weight={400}
                      size={12}
                      color="#FF6859"
                      onPress={() =>
                        handleAcceptOrRecused({
                          state: false,
                          uid: user.uid,
                        })
                      }
                    />
                  </View>
                </View>
              );
            }
          }
        })}
      <Space marginVertical={20} />
      {usersSearch.length === 0 && user.type !== 'common' && (
        <Label title="Alunos" />
      )}
      <Space marginVertical={4} />
      {usersSearch.length === 0 &&
        users.map(user => {
          const invite = invites.filter(invite => invite.to === user.uid);
          const status = invite.length > 0 ? invite[0].accept : {status: null};

          if (status === null) {
            if (user.type === 'common') {
              return (
                <View
                  key={user.uid}
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
                        title={user.name}
                        size={16}
                        weight={600}
                        color="#090A0A"
                      />
                      <Text
                        title={
                          user.type === 'common' ? 'Aluno(a)' : 'Treinador(a)'
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
                    <ButtonMiniRed
                      title="Aceitar"
                      weight={600}
                      size={13}
                      color="#FFF"
                      onPress={() =>
                        handleAcceptOrRecused({
                          state: true,
                          uid: user.uid,
                        })
                      }
                    />
                    <Space marginVertical={5} />
                    <ButtonText
                      title="Recusar"
                      weight={400}
                      size={12}
                      color="#FF6859"
                      onPress={() =>
                        handleAcceptOrRecused({
                          state: false,
                          uid: user.uid,
                        })
                      }
                    />
                  </View>
                </View>
              );
            }
          }
        })}
      <Space marginVertical={20} />
      {usersSearch.length === 0 && user.type === 'common' && (
        <Label title="Treinadores" />
      )}
      {usersSearch.length === 0 &&
        user.type === 'common' &&
        users.map(user => {
          const invite = invites.filter(invite => invite.to === user.uid);
          const status = invite.length > 0 ? invite[0].accept : {status: null};

          if (status === null) {
            if (user.type === 'trainner') {
              return (
                <View
                  key={user.uid}
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
                        title={user.name}
                        size={16}
                        weight={600}
                        color="#090A0A"
                      />
                      <Text
                        title={
                          user.type === 'common' ? 'Aluno(a)' : 'Treinador(a)'
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
                    <ButtonMiniRed
                      title="Aceitar"
                      weight={600}
                      size={13}
                      color="#FFF"
                      onPress={() =>
                        handleAcceptOrRecused({
                          state: true,
                          uid: user.uid,
                        })
                      }
                    />
                    <Space marginVertical={5} />
                    <ButtonText
                      title="Recusar"
                      weight={400}
                      size={12}
                      color="#FF6859"
                      onPress={() =>
                        handleAcceptOrRecused({
                          state: false,
                          uid: user.uid,
                        })
                      }
                    />
                  </View>
                </View>
              );
            }
          }
        })}
    </InvitesStyle>
  );
};

export default Invites;
