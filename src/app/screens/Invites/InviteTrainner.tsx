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
import {useGetUser, useInvites, useVerification} from 'hooks';
import React, {useState, useEffect} from 'react';
import {ActivityIndicator, Image, TouchableOpacity, View} from 'react-native';
import {showMessage} from 'react-native-flash-message';
import {InvitesStyle} from './styles';

import Colors from '@styles';
import InviteProfile from './InviteProfile';
import {userPersist} from 'functions';

const InviteTrainner = ({auth, navigation}: any) => {
  const {searchUser, getUserType, getUser} = useGetUser();
  const {getInvites, recusedInvite, acceptedInvite} = useInvites();
  const {verifyUserAssociate} = useVerification();
  const [limit, setLimit] = useState('');
  const [userSearch, setUserSearch] = useState('');
  const [usersSearch, setUsersSearch] = useState<any>([]);
  const [users, setUsers] = useState<any[]>([]);
  const [invites, setInvites] = useState<any[]>([]);
  const [inviteSend, setInviteSend] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [state, setState] = useState('');
  const [user, setUser] = useState<any>();

  useEffect(() => {
    console.log(auth);
    if (loading) {
      getInvites({
        uid: auth.uid,
        onComplete: (invite: any) => {
          if (invite) {
            setInvites(invite);
            setLoading(false);
          }
        },
        onFail: (error: any) => console.log(error),
      });
      getUserType({
        type: 'common',
        onComplete: (user: any) => {
          setUsers(user);
        },
        onFail: (error: any) => console.log(error),
      });
      verifyUserAssociate({
        uid: auth.uid,
        onComplete: (desc, value) => {
          if (value) {
            setLimit(desc);
          }
        },
        onFail: err => {},
      });
    }
  }, [loading]);

  const handleAcceptOrRecused = (
    state: boolean,
    commonId: any,
    userName: string,
  ) => {
    if (!state) {
      recusedInvite({
        userId: commonId,
        uid: auth.uid,
        onComplete: res => {
          if (res) {
            setUsers(users.filter(user => user.uid !== commonId));
          }
        },
        onFail: err => {},
      });
    } else {
      acceptedInvite({
        userId: commonId,
        uid: auth.uid,
        onComplete: res => {
          if (res) {
            firestore()
              .collection('users')
              .doc(auth.uid)
              .update({
                commons:
                  auth.commons !== undefined
                    ? [...auth.commons, commonId]
                    : [commonId],
                updatedAt: firestore.FieldValue.serverTimestamp(),
              })
              .then(res => {
                getUser({
                  uid: auth.uid,
                  onComplete: updateUser => {
                    if (updateUser) {
                      userPersist(updateUser);
                    }
                  },
                  onFail: err => {},
                });
                firestore()
                  .collection('users')
                  .doc(commonId)
                  .get()
                  .then(query => {
                    const common = query.data();
                    if (
                      (!!common && !common.trainnerAssociate) ||
                      (!!common && common.trainnerAssociate === '')
                    ) {
                      firestore().collection('users').doc(commonId).update({
                        trainnerAssociate: auth.uid,
                        updatedAt: firestore.FieldValue.serverTimestamp(),
                      });
                      firestore()
                        .collection('warnings')
                        .doc()
                        .set({
                          title: 'Convite aceito',
                          desc: `${userName} aceitou o seu convite.`,
                          from: commonId,
                          visualized: false,
                          createdAt: firestore.FieldValue.serverTimestamp(),
                        });
                      setUsers(users.filter(user => user.uid !== commonId));
                    }
                  });
              })
              .catch(err => {});
          }
        },
        onFail: err => {},
      });
    }
  };
  if (limit !== '') {
    return (
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <Text title={limit} size={15} weight={500} color={Colors.gray} />
      </View>
    );
  }
  if (state === 'profile') {
    return (
      <InviteProfile
        profile={user}
        onBack={setState}
        auth={auth}
        setInviteSend={setInviteSend}
        inviteSend={inviteSend}
        handleAcceptOrRecused={handleAcceptOrRecused}
      />
    );
  }
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

      {!loading && (
        <Search
          user={userSearch}
          onSearch={e => {
            setUserSearch(e),
              searchUser(e, 'common', {
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
                shadowColor: Colors.textColorRX,
                shadowOffset: {
                  width: 0,
                  height: 2,
                },
                shadowOpacity: 0.25,
                shadowRadius: 3.84,

                elevation: 5,
              }}>
              <TouchableOpacity
                onPress={() => {
                  setUser(userInvite);
                  setState('profile');
                }}
                style={{flexDirection: 'row', alignItems: 'center'}}>
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
              </TouchableOpacity>
              <View style={{height: 30}}>
                <ButtonInvite
                  title="Enviar convite"
                  sendTitle="Convite enviado"
                  size={10}
                  weight={600}
                  color={Colors.textColorWhite}
                  to={auth}
                  from={userInvite.uid}
                  name={auth.name}
                  inviteSend={inviteSend}
                  setInviteSend={setInviteSend}
                />
              </View>
            </View>
          );
        })}
      <Space marginVertical={5} />
      {!loading && usersSearch.length === 0 && <Label title="Alunos" />}
      <Space marginVertical={5} />
      {usersSearch.length === 0 &&
        users.map(userInvite => {
          const invite = invites.filter(
            (invite: any) => invite.to === userInvite.uid,
          );
          const status = invite.length > 0 ? invite[0].accept : {status: null};
          if (status === null) {
            if (userInvite.type === 'common') {
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
                  <TouchableOpacity
                    onPress={() => {
                      setUser({...userInvite, invite: true});
                      setState('profile');
                    }}
                    style={{flexDirection: 'row', alignItems: 'center'}}>
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
                        title="Aluno(a)"
                        size={12}
                        weight={500}
                        color={Colors.textColorBlack}
                      />
                    </View>
                  </TouchableOpacity>
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
                        handleAcceptOrRecused(true, userInvite.uid, auth.name)
                      }
                    />
                    <Space marginVertical={5} />
                    <ButtonText
                      title="Recusar"
                      weight={400}
                      size={11}
                      color={Colors.red}
                      onPress={() =>
                        handleAcceptOrRecused(false, userInvite.uid, auth.name)
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

export default InviteTrainner;
