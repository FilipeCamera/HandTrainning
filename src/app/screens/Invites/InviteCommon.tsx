import {
  ButtonInvite,
  Header,
  Label,
  Search,
  Space,
  Text,
  ButtonMiniRed,
  ButtonText,
} from 'components';
import {firestore} from 'firebase';
import {useGetUser, useInvites} from 'hooks';
import React, {useState, useEffect} from 'react';
import {ActivityIndicator, Image, View} from 'react-native';
import {showMessage} from 'react-native-flash-message';
import {InvitesStyle} from './styles';

import Notify from 'assets/svg/Notify.svg';
import {userPersist} from 'functions';
import Colors from '@styles';

const InviteCommon = ({auth, navigation}: any) => {
  const {searchUser, getUsers} = useGetUser();
  const {getInvites, acceptedInvite} = useInvites();
  const [userSearch, setUserSearch] = useState('');
  const [usersSearch, setUsersSearch] = useState<any>([]);
  const [users, setUsers] = useState<any>([]);
  const [invites, setInvites] = useState<any>([]);
  const [associated, setAssociated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    firestore()
      .collection('users')
      .doc(auth.uid)
      .get()
      .then(querySnapshot => {
        const {userAssociate} = querySnapshot.data();

        if (userAssociate) {
          setAssociated(true);
          setLoading(false);
        }
      });
  }, []);

  useEffect(() => {
    getInvites(auth.uid, {
      onComplete: (invite: any) => {
        if (invite) {
          setInvites(invite);
          setLoading(false);
        }
      },
      onFail: (error: any) => console.log(error),
    });
    getUsers({
      onComplete: (user: any) => {
        setUsers(user);
      },
      onFail: (error: any) => console.log(error),
    });
  }, []);

  const handleAcceptOrRecused = async ({state, uid}: any) => {
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
    return await acceptedInvite(invite, state, {
      onComplete: async (status: boolean) => {
        if (status) {
          const users: any = await firestore()
            .collection('relations')
            .doc(auth.uid)
            .get()
            .then(querySnapshot => {
              return querySnapshot.data();
            });
          const data = {
            createdAt: firestore.FieldValue.serverTimestamp(),
            type: auth.type,
            users: uid,
          };
          await firestore()
            .collection('relations')
            .doc(auth.uid)
            .set(data)
            .then(() => {
              firestore()
                .collection('users')
                .doc(auth.uid)
                .update({userAssociate: uid})
                .then(querySnapshot => {
                  const user = firestore()
                    .collection('users')
                    .doc(auth.uid)
                    .get();
                  userPersist(user);
                  setUsers(users.filter((user: any) => user.uid !== uid));
                });
            })
            .catch(error => console.log(error));
        }
      },
      onFail: (error: any) => {
        console.log(error);
      },
    });
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
      <Header navigation={navigation} />
      {!!loading && (
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <ActivityIndicator size="large" color={Colors.red} />
        </View>
      )}
      {!loading && !!associated && (
        <View
          style={{
            flex: 1,
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Space marginVertical={20} />
          <Notify />
          <Space marginVertical={12} />
          <Text
            title="Você já é associado a uma academia ou treinador!"
            size={15}
            weight={500}
            color={Colors.grayMediumLight}
            center
          />
        </View>
      )}
      {!loading && !associated && (
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
      )}
      {!loading &&
        !associated &&
        usersSearch.length !== 0 &&
        usersSearch.map((userInvite: any) => {
          return (
            <View
              key={userInvite.uid}
              style={{
                width: '100%',
                backgroundColor: Colors.background,
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
                <View style={{width: 50, height: 50, borderRadius: 25}}>
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
                    size={14}
                    weight={600}
                    color={Colors.textColorBlack}
                  />
                  <Text
                    title={
                      userInvite.type === 'trainner'
                        ? 'Treinador(a)'
                        : userInvite.type === 'common'
                        ? 'Aluno(a)'
                        : 'Academia'
                    }
                    size={12}
                    weight={500}
                    color={Colors.textColorBlack}
                  />
                </View>
              </View>
              <View style={{height: 30}}>
                <ButtonInvite
                  title="Enviar convite"
                  sendTitle="Convite enviado"
                  size={10}
                  weight={600}
                  color={Colors.textColorWhite}
                  to={auth}
                  from={userInvite.uid}
                />
              </View>
            </View>
          );
        })}
      <Space marginVertical={5} />
      {!loading && !associated && usersSearch.length === 0 && (
        <Label title="Academias" />
      )}
      <Space marginVertical={5} />
      {!associated &&
        usersSearch.length === 0 &&
        users.map(userInvite => {
          const invite = invites.filter(
            (invite: any) => invite.to === userInvite.uid,
          );
          const status = invite.length > 0 ? invite[0].accept : {status: null};
          if (status === null) {
            if (userInvite.type === 'gym') {
              return (
                <View
                  key={userInvite.uid}
                  style={{
                    width: '100%',
                    backgroundColor: Colors.background,
                    padding: 16,
                    borderRadius: 10,
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginVertical: 8,
                    shadowColor: Colors.inputColorText,
                    shadowOffset: {
                      width: 0,
                      height: 2,
                    },
                    shadowOpacity: 0.25,
                    shadowRadius: 3.84,

                    elevation: 5,
                  }}>
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <View style={{width: 50, height: 50, borderRadius: 25}}>
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
                        size={14}
                        weight={600}
                        color={Colors.textColorBlack}
                      />
                      <Text
                        title={
                          userInvite.type === 'common'
                            ? 'Aluno(a)'
                            : 'Treinador(a)'
                        }
                        size={12}
                        weight={500}
                        color={Colors.textColorBlack}
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
                      size={11}
                      color={Colors.textColorWhite}
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
                      size={11}
                      color={Colors.red}
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
      {!loading &&
        !associated &&
        usersSearch.length === 0 &&
        auth.plan !== 'basic' && <Label title="Treinadores" />}
      <Space marginVertical={5} />
      {!loading &&
        !associated &&
        usersSearch.length === 0 &&
        auth.plan !== 'basic' &&
        users.map(userInvite => {
          const invite = invites.filter(
            (invite: any) => invite.to === userInvite.uid,
          );
          const status = invite.length > 0 ? invite[0].accept : {status: null};
          if (status === null) {
            if (userInvite.type === 'trainner') {
              return (
                <View
                  key={userInvite.uid}
                  style={{
                    width: '100%',
                    backgroundColor: Colors.background,
                    padding: 16,
                    borderRadius: 10,
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginVertical: 8,
                    shadowColor: Colors.inputColorText,
                    shadowOffset: {
                      width: 0,
                      height: 2,
                    },
                    shadowOpacity: 0.25,
                    shadowRadius: 3.84,

                    elevation: 5,
                  }}>
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <View style={{width: 50, height: 50, borderRadius: 25}}>
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
                        size={14}
                        weight={600}
                        color={Colors.textColorBlack}
                      />
                      <Text
                        title={
                          userInvite.type === 'common'
                            ? 'Aluno(a)'
                            : 'Treinador(a)'
                        }
                        size={12}
                        weight={500}
                        color={Colors.textColorBlack}
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
                      size={11}
                      color={Colors.textColorWhite}
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
                      size={11}
                      color={Colors.red}
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

export default InviteCommon;
