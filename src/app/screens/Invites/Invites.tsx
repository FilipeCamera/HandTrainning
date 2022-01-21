import React from 'react';

import {useSelector} from 'react-redux';
import InviteCommon from './InviteCommon';

import InviteTrainner from './InviteTrainner';

const Invites = ({navigation}: any) => {
  const user = useSelector((state: any) => state.auth.user);
  return (
    <>
      {user.type === 'common' && (
        <InviteCommon auth={user} navigation={navigation} />
      )}
      {user.type === 'trainner' && (
        <InviteTrainner auth={user} navigation={navigation} />
      )}
    </>
  );
};

export default Invites;
