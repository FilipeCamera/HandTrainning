import React from 'react';
import {useSelector} from 'react-redux';
import ProfileCommon from './ProfileCommon';
import ProfileGym from './ProfileGym';
import ProfileTrainner from './ProfileTrainner';

const Profile = ({navigation}: any) => {
  const user = useSelector((state: any) => state.auth.user);
  return (
    <>
      {user.type === 'gym' && (
        <ProfileGym user={user} navigation={navigation} />
      )}
      {user.type === 'common' && (
        <ProfileCommon user={user} navigation={navigation} />
      )}
      {user.type === 'trainner' && (
        <ProfileTrainner user={user} navigation={navigation} />
      )}
    </>
  );
};

export default Profile;
