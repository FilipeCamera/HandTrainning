import React from 'react';
import {View, Image} from 'react-native';
import {AvatarActiveStyle} from './styles';

interface AvatarActiveProps {
  avatar: string;
  status: boolean;
}

const AvatarActive = ({avatar, status}: AvatarActiveProps) => {
  return (
    <AvatarActiveStyle>
      <View
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          elevation: 1,
          borderWidth: 2,
          width: 15,
          height: 15,
          borderColor: '#fff',
          borderRadius: 9999,
        }}>
        <View
          style={{
            width: '100%',
            height: '100%',
            borderRadius: 9999,
            backgroundColor: status ? '#4CAF50' : '#EA4335',
          }}
        />
      </View>
      <Image
        source={{uri: avatar}}
        style={{width: '100%', height: '100%', borderRadius: 9999}}
      />
    </AvatarActiveStyle>
  );
};

export default AvatarActive;
