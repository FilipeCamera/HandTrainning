import React, {useState, useEffect} from 'react';
import {Image, Platform} from 'react-native';
import {AvatarStyle, ProfilePicBox} from './styles';

import Profile from 'assets/svg/profile.svg';
import ProfilePic from 'assets/svg/profile_pic.svg';
import {useSendFile} from 'hooks';
import {selectImage} from 'functions';
import {firestore, storage} from 'firebase';

interface AvatarProps {
  edit: boolean;
  dados: any;
  setDados: any;
  error: any;
}

const Avatar = ({edit, dados, setDados, error}: AvatarProps) => {
  const {sendFile} = useSendFile();
  const [image, setImage] = useState<any>({});

  const handleImage = () => {
    selectImage()
      .then((res: any) => {
        setImage(res.data.assets[0]);
      })
      .catch((error: any) => {});
  };
  useEffect(() => {
    if (dados.avatar !== '') {
      const storageRef = storage().refFromURL(dados.avatar);
      const imageRef = storage().ref(storageRef.fullPath);

      imageRef
        .delete()
        .then(() => {})
        .catch(err => {});
    }
    if (Object.keys(image).length !== 0) {
      const {uri} = image;
      const filename = uri.substring(uri.lastIndexOf('/') + 1);
      const uploadUri =
        Platform.OS === 'ios' ? uri.replace('file://', '') : uri;
      sendFile({
        uri: uploadUri,
        filename,
        path: 'avatars',
        onComplete: (url: string) => {
          setDados({...dados, avatar: url});
        },
        onFail: error => {
          console.log(error);
        },
      });
    }
  }, [image]);
  return (
    <AvatarStyle onPress={handleImage} error={error ? true : false}>
      {!!edit && !dados.avatar && !image.uri && (
        <ProfilePicBox error={error ? true : false}>
          <ProfilePic />
        </ProfilePicBox>
      )}
      {Object.keys(image).length !== 0 && (
        <Image
          source={{
            uri: image.uri,
          }}
          style={{width: '100%', height: '100%', borderRadius: 9999}}
        />
      )}
      {Object.keys(image).length === 0 && (
        <>
          {!!dados.avatar && (
            <Image
              source={{
                uri: dados.avatar,
              }}
              style={{width: '100%', height: '100%', borderRadius: 9999}}
            />
          )}
          {!dados.avatar && <Profile width="140px" height="140px" />}
        </>
      )}
    </AvatarStyle>
  );
};

export default Avatar;
