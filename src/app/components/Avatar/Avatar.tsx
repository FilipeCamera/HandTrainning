import React from 'react';
import {Image, View} from 'react-native';
import {AvatarStyle, ProfilePicBox} from './styles';

import Profile from 'assets/svg/profile.svg';
import ProfilePic from 'assets/svg/profile_pic.svg';

interface AvatarProps {
  edit: boolean;
  avatar: string;
}

const Avatar = ({edit, avatar}: AvatarProps) => {
  return (
    <AvatarStyle>
      <ProfilePicBox>
        <ProfilePic />
      </ProfilePicBox>
      {!!avatar && (
        <Image
          source={{uri: avatar}}
          style={{width: '100%', height: '100%', borderRadius: 9999}}
        />
      )}
      {!avatar && <Profile width="140px" height="140px" />}
    </AvatarStyle>
  );
};

export default Avatar;
