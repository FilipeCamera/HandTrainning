import React from 'react';
import {AvatarActive} from 'components';
import {CardTrainnerStyle, styles} from './styles';
import {useSelector} from 'react-redux';
import Space from '../Space';

const CardTrainner = () => {
  const user = useSelector((state: any) => state.auth.user);
  return (
    <CardTrainnerStyle style={styles.shadow}>
      <AvatarActive avatar={user.avatar} status={true} />
      <AvatarActive avatar={user.avatar} status={true} />
      <AvatarActive avatar={user.avatar} status={true} />
      <AvatarActive avatar={user.avatar} status={true} />
      <AvatarActive avatar={user.avatar} status={true} />
      <AvatarActive avatar={user.avatar} status={true} />
      <AvatarActive avatar={user.avatar} status={true} />
      <AvatarActive avatar={user.avatar} status={true} />
    </CardTrainnerStyle>
  );
};

export default CardTrainner;
