import React from 'react';
import {AvatarActive} from 'components';
import {CardTrainnerStatusStyle, styles} from './styles';
import {useSelector} from 'react-redux';

const CardTrainnerStatus = () => {
  const user = useSelector((state: any) => state.auth.user);
  return (
    <CardTrainnerStatusStyle style={styles.shadow}>
      <AvatarActive avatar={user.avatar} status={true} />
      <AvatarActive avatar={user.avatar} status={true} />
      <AvatarActive avatar={user.avatar} status={true} />
      <AvatarActive avatar={user.avatar} status={true} />
      <AvatarActive avatar={user.avatar} status={true} />
      <AvatarActive avatar={user.avatar} status={true} />
      <AvatarActive avatar={user.avatar} status={true} />
      <AvatarActive avatar={user.avatar} status={true} />
    </CardTrainnerStatusStyle>
  );
};

export default CardTrainnerStatus;
