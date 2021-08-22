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
import {Image, View} from 'react-native';
import {showMessage} from 'react-native-flash-message';
import {InvitesStyle} from './styles';

const InviteGym = ({auth}: any) => {
  const {searchUser, getUsers} = useGetUser();
  const {getInvites, acceptedInvite} = useInvites();
  const {verifyUserAssociate, verifyUserIsType} = useVerification();
  const [userSearch, setUserSearch] = useState('');
  const [usersSearch, setUsersSearch] = useState<any>([]);
  const [users, setUsers] = useState<any>([]);
  const [invites, setInvites] = useState<any>([]);
  const [countTrainner, setCountTrainner] = useState(0);
  const [countCommon, setCountCommon] = useState(0);
  const [notAddTrainner, setNotAddTrainer] = useState(false);
  const [notAddCommon, setNotAddCommon] = useState(false);

  useEffect(() => {
    getInvites(auth.uid, {
      onComplete: (invites: any) => {
        if (invites) {
          setInvites(invites);
        }
      },
      onFail: (error: any) => console.log(error),
    });
    getUsers({
      onComplete: (users: any) => {
        setUsers(users);
      },
      onFail: (error: any) => console.log(error),
    });
  }, []);

  useEffect(() => {
    firestore()
      .collection('users')
      .where('userAssociate', 'array-contains', auth.uid)
      .get()
      .then(querySnapshot => {
        const data = querySnapshot.docs.map(doc => doc.data());
        data.map(item => {
          if (item.type === 'trainner') {
            setCountTrainner(countTrainner + 1);
          } else if (countTrainner >= auth.limitTrainner) {
            setNotAddTrainer(true);
          }
        });
      });
    firestore()
      .collection('users')
      .where('userAssociate', '==', auth.uid)
      .get()
      .then(querySnapshot => {
        const data = querySnapshot.docs.map(doc => doc.data());
        data.map(item => {
          if (item.type === 'common') {
            setCountCommon(countCommon + 1);
          } else if (countCommon >= auth.limitCommon) {
            setNotAddCommon(true);
          }
        });
      });
  }, []);

  const verify = async ({user, uid}: any) => {
    if (notAddCommon) {
      showMessage({
        type: 'danger',
        message: 'Usuário já chegou no limite de alunos.',
      });
      return false;
    }
    if (notAddTrainner) {
      showMessage({
        type: 'danger',
        message: 'Usuário já chegou no limite de treinadores.',
      });
      return false;
    }
    const result = await verifyUserIsType(user, uid, {
      onComplete: (error: any) => {
        if (error) {
          showMessage({type: 'warning', message: error});
        }
      },
      onFail: (error: any) => console.log(error),
    });
    const result2 = await verifyUserAssociate(uid, {
      onComplete: (error: any) => {
        if (error) {
          showMessage({type: 'warning', message: error});
        }
      },
      onFail: (error: any) => {
        console.log(error);
      },
    });

    if (!result || !result2) {
      return false;
    }
    return true;
  };
  const handleAcceptOrRecused = async ({state, uid}: any) => {
    const verified = await verify({auth, uid});
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
            setUsers(users.filter((user: any) => user.uid !== uid));
          }
        },
        onFail: (error: any) => {
          console.log(error);
        },
      });
    }
    if (verified) {
      return await acceptedInvite(invite, state, {
        onComplete: async (status: boolean) => {
          if (status) {
            const users = await firestore()
              .collection('relations')
              .doc(auth.uid)
              .get()
              .then(querySnapshot => {
                const {user} = querySnapshot.data();
                return user;
              });
            const data = {
              createdAt: firestore.FieldValue.serverTimestamp(),
              type: auth.type,
              users: [...users, uid],
            };
            await firestore()
              .collection('relations')
              .doc(auth.uid)
              .set(data)
              .then(() => {});
            const user = firestore().collection('users').doc(uid);

            user.get().then(res => {
              const {type} = res.data();
              if (type === 'trainner') {
                user.update({userAssociate: [auth.uid]});
              }
              if (type === 'common') {
                user.update({userAssociate: auth.uid});
              }
            });
          }
        },
        onFail: (error: any) => {
          console.log(error);
        },
      });
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
            searchUser(e, auth.uid, {
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
        usersSearch.map((userInvite: any) => {
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
                  to={auth}
                  from={userInvite.uid}
                />
              </View>
            </View>
          );
        })}
      <Space marginVertical={5} />
      {usersSearch.length === 0 && <Label title="Treinadores" />}
      <Space marginVertical={5} />
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
      <Space marginVertical={20} />
      {usersSearch.length === 0 && <Label title="Alunos" />}
      <Space marginVertical={5} />
      {usersSearch.length === 0 &&
        users.map(userInvite => {
          const invite = invites.filter(invite => invite.to === userInvite.uid);
          const status = invite.length > 0 ? invite[0].accept : {status: null};
          if (status === null) {
            if (userInvite.type === 'common') {
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
    </InvitesStyle>
  );
};

export default InviteGym;
