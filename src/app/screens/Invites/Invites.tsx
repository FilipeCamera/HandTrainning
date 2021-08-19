import React from 'react';

import {useSelector} from 'react-redux';
import InviteCommon from './InviteCommon';
import InviteGym from './InviteGym';

const Invites = () => {
  const user = useSelector((state: any) => state.auth.user);
  return (
    <>
      {user.type === 'gym' && <InviteGym auth={user} />}
      {user.type === 'common' && <InviteCommon auth={user} />}
      {user.type === 'trainner' && <InviteGym auth={user} />}
    </>
  );
};

export default Invites;
