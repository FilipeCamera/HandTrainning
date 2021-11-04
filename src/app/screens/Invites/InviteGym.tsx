import Colors from '@styles';
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
import {useGetUser, useInvites, useVerification} from 'hooks';
import React, {useState, useEffect, useCallback} from 'react';
import {Image, RefreshControl, TouchableOpacity, View} from 'react-native';
import {showMessage} from 'react-native-flash-message';
import InviteProfile from './InviteProfile';
import {InvitesStyle} from './styles';

const InviteGym = ({auth, navigation}: any) => {
  const {searchUserTypeGym, getUsers} = useGetUser();
  const {getInvites, acceptedInvite, recusedInvite} = useInvites();
  const {verifyUserAssociate, updateUserAssociate} = useVerification();
  const [userSearch, setUserSearch] = useState('');
  const [profile, setProfile] = useState('');
  const [user, setUser] = useState<any>();
  const [usersSearch, setUsersSearch] = useState<any>([]);
  const [users, setUsers] = useState<any>([]);
  const [invites, setInvites] = useState<any>([]);
  const [refresh, setRefresh] = useState(false);
  const [countTrainner, setCountTrainner] = useState(0);
  const [countCommon, setCountCommon] = useState(0);
  const [notAddTrainner, setNotAddTrainer] = useState(false);
  const [notAddCommon, setNotAddCommon] = useState(false);

  const wait = timeout => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  };

  const onRefresh = useCallback(() => {
    setRefresh(true);
    wait(100).then(() => setRefresh(false));
  }, []);

  const handleAcceptOrRecused = (
    state: boolean,
    userId: string,
    type: string,
    userAssociate: any,
  ) => {
    if (state) {
      verifyUserAssociate({
        uid: userId,
        onComplete: (error, bool) => {
          if (bool) {
            acceptedInvite({
              gymId: userId,
              uid: auth.uid,
              onComplete: res => {
                if (res) {
                  updateUserAssociate({
                    uid: userId,
                    type: type,
                    associate: userAssociate,
                    gym: auth.uid,
                    onComplete: msg => {
                      if (msg) {
                        showMessage({
                          type: 'success',
                          message: 'Aceito',
                          description: msg,
                        });
                        setUsers(users.filter(user => user.uid !== userId));
                      }
                    },
                    onFail: err => {},
                  });
                }
              },
            });
          } else {
            showMessage({
              type: 'info',
              message: 'Aviso',
              description: error,
            });
          }
        },
      });
    } else {
      recusedInvite({
        gymId: userId,
        uid: auth.uid,
        onComplete: res => {
          if (res) {
            setUsers(users.filter(user => user.uid !== userId));
          }
        },
        onFail: err => {},
      });
    }
  };

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
  }, [refresh]);

  if (profile === 'profile') {
    return (
      <InviteProfile
        profile={user}
        onBack={setProfile}
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
        paddingBottom: 50,
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
      <Header navigation={navigation} refresh={refresh} />
      <Search
        user={userSearch}
        onSearch={e => {
          setUserSearch(e),
            searchUserTypeGym(e, 'gym', {
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
                style={{flexDirection: 'row', alignItems: 'center'}}
                onPress={() => {
                  setUser(userInvite);
                  setProfile('profile');
                }}>
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
                      userInvite.type === 'common'
                        ? 'Aluno(a)'
                        : userInvite.type === 'trainner'
                        ? 'Treinador(a)'
                        : 'Academia'
                    }
                    size={13}
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
                          userId: userInvite.uid,
                          type: userInvite.type,
                          userAssociate: userInvite.userAssociate,
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
                        handleAcceptOrRecused(
                          false,
                          userInvite.uid,
                          userInvite.type,
                          userInvite.userAssociate,
                        )
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
                      setProfile('profile');
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
                        handleAcceptOrRecused(
                          true,
                          userInvite.uid,
                          userInvite.type,
                          userInvite.userAssociate,
                        )
                      }
                    />
                    <Space marginVertical={5} />
                    <ButtonText
                      title="Recusar"
                      weight={400}
                      size={11}
                      color={Colors.red}
                      onPress={() =>
                        handleAcceptOrRecused(
                          false,
                          userInvite.uid,
                          userInvite.type,
                          userInvite.userAssociate,
                        )
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
