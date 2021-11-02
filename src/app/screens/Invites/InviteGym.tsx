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
import {firestore} from 'firebase';
import {useGetUser, useInvites, useVerification} from 'hooks';
import React, {useState, useEffect} from 'react';
import {Image, TouchableOpacity, View} from 'react-native';
import {showMessage} from 'react-native-flash-message';
import InviteProfile from './InviteProfile';
import {InvitesStyle} from './styles';

const InviteGym = ({auth}: any) => {
  const {searchUserTypeGym, getUsers} = useGetUser();
  const {getInvites, acceptedInvite} = useInvites();
  const {verifyUserAssociate, verifyUserIsType} = useVerification();
  const [userSearch, setUserSearch] = useState('');
  const [profile, setProfile] = useState('');
  const [user, setUser] = useState<any>();
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

  if (profile === 'profile') {
    return <InviteProfile profile={user} onBack={setProfile} />;
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
      <Header />
      <Search
        user={userSearch}
        onSearch={e => {
          setUserSearch(e),
            searchUserTypeGym(e, auth.uid, {
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
            <TouchableOpacity
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
              }}
              onPress={() => {
                setUser(userInvite);
                setProfile('profile');
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
            </TouchableOpacity>
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
                      setUser(userInvite);
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
                      onPress={() => {}}
                    />
                    <Space marginVertical={5} />
                    <ButtonText
                      title="Recusar"
                      weight={400}
                      size={11}
                      color={Colors.red}
                      onPress={() => {}}
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
