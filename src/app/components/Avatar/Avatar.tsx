import React, {useState, useEffect} from 'react';
import {Image, Platform, View} from 'react-native';
import {AvatarStyle, ProfilePicBox} from './styles';

import Profile from 'assets/svg/profile.svg';
import ProfilePic from 'assets/svg/profile_pic.svg';
import useSendFile from 'hooks';
import {onPermission, selectImage} from 'functions';
import {firestore} from 'firebase';

interface AvatarProps {
  edit: boolean;
  dados: any;
  setDados: any;
  error: any;
}

const Avatar = ({edit, dados, setDados, error}: AvatarProps) => {
  const {sendFile} = useSendFile();
  const [image, setImage] = useState({});

  const handleImage = () => {
    selectImage()
      .then((res: any) => {
        setImage(res.data.assets[0]);
      })
      .catch((error: any) => {});
  };
  useEffect(() => {
    if (Object.keys(image).length !== 0) {
      const {uri} = image;
      const filename =
        firestore.FieldValue.serverTimestamp() +
        uri.substring(uri.lastIndexOf('/') + 1);
      const uploadUri =
        Platform.OS === 'ios' ? uri.replace('file://', '') : uri;
      sendFile({
        uri: uploadUri,
        filename,
        path: 'avatars',
        onComplete: (url: string) => {
          setDados({...dados, avatar: url});
        },
        onFail: () => {},
      });
    }
  }, [image]);
  return (
    <AvatarStyle onPress={handleImage} error={error ? true : false}>
      {!!edit && !image.uri && (
        <ProfilePicBox error={error ? true : false}>
          <ProfilePic />
        </ProfilePicBox>
      )}
      {Object.keys(image).length !== 0 && (
        <Image
          source={{uri: image.uri}}
          style={{width: '100%', height: '100%', borderRadius: 9999}}
        />
      )}
      {Object.keys(image).length === 0 && (
        <Profile width="140px" height="140px" />
      )}
    </AvatarStyle>
  );
};

export default Avatar;
