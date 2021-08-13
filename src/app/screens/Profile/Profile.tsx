import React from 'react';
import {useSelector} from 'react-redux';
import ProfileGym from './ProfileGym';

const Profile = ({navigation}: any) => {
  const user = useSelector((state: any) => state.auth.user);
  return (
    <>
      {user.type === 'gym' && (
        <ProfileGym user={user} navigation={navigation} />
      )}
    </>
  );
};

export default Profile;
