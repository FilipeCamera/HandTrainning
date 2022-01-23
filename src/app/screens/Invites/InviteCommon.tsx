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
import {ActivityIndicator, Image, TouchableOpacity, View} from 'react-native';
import {showMessage} from 'react-native-flash-message';
import {InvitesStyle} from './styles';

import Notify from 'assets/svg/Notify.svg';

import Colors from '@styles';
import InviteProfile from './InviteProfile';
import {userPersist} from 'functions';

const InviteCommon = ({auth, navigation}: any) => {
  const {searchUser, getUser, getUserType} = useGetUser();
  const {getInvites, recusedInvite, acceptedInvite} = useInvites();

  const [userSearch, setUserSearch] = useState('');
  const [state, setState] = useState('');
  const [user, setUser] = useState<any>();
  const [usersSearch, setUsersSearch] = useState<any>([]);
  const [users, setUsers] = useState<any>([]);
  const [invites, setInvites] = useState<any>([]);
  const [inviteSend, setInviteSend] = useState<any[]>([]);
  const [trainnerAssociated, setTrainnerAssociated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (loading === true) {
      getUser({
        uid: auth.uid,
        onComplete: user => {
          if (user) {
            const {trainnerAssociate} = user;

            if (trainnerAssociate) {
              setTrainnerAssociated(true);
              setLoading(false);
            }
          }
        },
        onFail: err => {},
      });
    }
  }, [loading]);
  useEffect(() => {
    if (loading === true) {
      getInvites({
        uid: auth.uid,
        onComplete: (invite: any) => {
          if (invite) {
            setInvites(invite);
            setLoading(false);
          }
        },
        onFail: (error: any) => {},
      });
      getUserType({
        type: 'trainner',
        onComplete: (user: any) => {
          setUsers(user);
        },
        onFail: (error: any) => console.log(error),
      });
    }
  }, [loading]);

  const handleAcceptOrRecused = (
    state: boolean,
    trainner: any,
    userName: string,
  ) => {
    if (!state) {
      recusedInvite({
        userId: trainner.uid,
        uid: auth.uid,
        onComplete: res => {
          if (res) {
          }
        },
        onFail: err => {},
      });
      setUsers(
        users.filter((trainners: any) => trainners.uid !== trainner.uid),
      );
    } else {
      acceptedInvite({
        userId: trainner.uid,
        uid: auth.uid,
        onComplete: res => {
          if (res) {
            firestore()
              .collection('users')
              .doc(auth.uid)
              .update({
                trainnerAssociate: trainner.uid,
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
                  .doc(trainner.uid)
                  .update({
                    commons: trainner.commons
                      ? [...trainner.commons, auth.uid]
                      : [auth.uid],
                    updatedAt: firestore.FieldValue.serverTimestamp(),
                  });
                firestore()
                  .collection('warnings')
                  .doc()
                  .set({
                    title: 'Convite aceito',
                    desc: `${userName} aceitou o seu convite.`,
                    from: trainner.uid,
                    createdAt: firestore.FieldValue.serverTimestamp(),
                  });
                setLoading(true);
              })
              .catch(err => {});
          }
        },
        onFail: err => {},
      });
      setUsers(users.filter(trainners => trainners.uid !== trainner.uid));
    }
  };

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
      {!loading && !!trainnerAssociated && (
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
            title="Você já tem um treinador."
            size={15}
            weight={500}
            color={Colors.grayMediumLight}
            center
          />
        </View>
      )}
      {!loading && !trainnerAssociated && (
        <Search
          user={userSearch}
          onSearch={e => {
            setUserSearch(e),
              searchUser(e, 'trainner', {
                onComplete: (users: any) => {
                  if (users) {
                    setUsersSearch(users);
                  }
                  return;
                },
                onFail: (error: any) => {},
              });
          }}
        />
      )}
      {!loading &&
        !trainnerAssociated &&
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
                        : 'Aluno(a)'
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
                  name={userInvite.name}
                  inviteSend={inviteSend}
                  setInviteSend={setInviteSend}
                />
              </View>
            </View>
          );
        })}
      <Space marginVertical={5} />
      {!loading && !trainnerAssociated && usersSearch.length === 0 && (
        <Label title="Treinadores" />
      )}
      <Space marginVertical={5} />
      {!trainnerAssociated &&
        usersSearch.length === 0 &&
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
                        handleAcceptOrRecused(true, userInvite, auth.name)
                      }
                    />
                    <Space marginVertical={5} />
                    <ButtonText
                      title="Recusar"
                      weight={400}
                      size={11}
                      color={Colors.red}
                      onPress={() =>
                        handleAcceptOrRecused(false, userInvite, auth.name)
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
