import Colors from '@styles';
import {ButtonInvite, Header, Label, Search, Space, Text} from 'components';
import {useGetUser} from 'hooks';
import React, {useState, useEffect} from 'react';
import {Image, TouchableOpacity, View} from 'react-native';
import InviteProfile from './InviteProfile';
import {InvitesStyle} from './styles';

const InviteTrainner = ({auth}: any) => {
  const {searchUser} = useGetUser();
  const [userSearch, setUserSearch] = useState('');
  const [usersSearch, setUsersSearch] = useState<any>([]);
  const [profile, setProfile] = useState('');
  const [user, setUser] = useState<any>();

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
      {usersSearch.length === 0 && <Label title="Academias" />}
      <Space marginVertical={20} />
      {usersSearch.length === 0 && <Label title="Alunos" />}
    </InvitesStyle>
  );
};

export default InviteTrainner;
