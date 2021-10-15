import React from 'react';

import {useSelector} from 'react-redux';
import InviteCommon from './InviteCommon';
import InviteGym from './InviteGym';
import InviteTrainner from './InviteTrainner';

const Invites = ({navigation}: any) => {
  const user = useSelector((state: any) => state.auth.user);
  return (
    <>
      {user.type === 'gym' && <InviteGym auth={user} />}
      {user.type === 'common' && (
        <InviteCommon auth={user} navigation={navigation} />
      )}
      {user.type === 'trainner' && <InviteTrainner auth={user} />}
    </>
  );
};

export default Invites;
