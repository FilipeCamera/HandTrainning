import {Text, Space} from 'components';
import React, {useState, useEffect} from 'react';
import {BoxContainer, BoxFooter, BoxStyle, ButtonUpload} from './styles';

import FileIcon from 'assets/svg/file.svg';
import {Image, Platform, View} from 'react-native';
import {selectImageUpload} from 'functions';
import {useSendFile} from 'hooks';
import {showMessage} from 'react-native-flash-message';
import Colors from '@styles';
import {storage} from 'firebase';

interface BoxUploadProps {
  error: string;
  setUrl: any;
  url: any;
}

const BoxUpload = ({setUrl, error, url}: BoxUploadProps) => {
  const sendFile = useSendFile();
  const [upload, setUpload] = useState({});
  const handleImageOrVideo = () => {
    selectImageUpload()
      .then((res: any) => {
        setUpload(res.data.assets[0]);
      })
      .catch((error: any) => {});
  };

  useEffect(() => {
    if (url !== '' && Object.keys(upload).length !== 0) {
      const storageRef = storage().refFromURL(url);
      const imageRef = storage().ref(storageRef.fullPath);

      imageRef
        .delete()
        .then(() => {})
        .catch(err => {});
    }
    if (Object.keys(upload).length !== 0) {
      const {uri} = upload;
      const filename = uri.substring(uri.lastIndexOf('/') + 1);
      const uploadUri =
        Platform.OS === 'ios' ? uri.replace('file://', '') : uri;
      sendFile({
        uri: uploadUri,
        filename,
        path: 'exercises',
        onComplete: (url: string) => {
          setUrl(url);
        },
        onFail: (error: any) => {
          if (error) {
            showMessage({
              type: 'danger',
              message: 'Erro',
              description:
                'Não foi possível fazer o upload do arquivo. Caso for um vídeo você precisa selecionar',
            });
          }
        },
      });
    }
  }, [upload]);
  return (
    <BoxStyle>
      {Object.keys(upload).length !== 0 && (
        <ButtonUpload onPress={handleImageOrVideo}>
          <View style={{height: 160, width: '100%'}}>
            <Image
              source={{uri: upload.uri}}
              style={{width: '100%', height: '100%'}}
            />
          </View>
        </ButtonUpload>
      )}
      {Object.keys(upload).length === 0 && (
        <BoxContainer onPress={handleImageOrVideo} error={error ? true : false}>
          <FileIcon />
          <View style={{flexDirection: 'column', alignItems: 'flex-start'}}>
            <View style={{width: '90%'}}>
              <Text
                title="Faça upload do arquivo aqui"
                size={12}
                weight={500}
                color={Colors.textColorRX}
                center
              />
            </View>
            <View style={{width: '90%'}}>
              <Text
                title="Tamanho máximo suportado 2mb"
                size={10}
                weight={400}
                color={Colors.red}
                center
              />
            </View>
          </View>
        </BoxContainer>
      )}
      <Space marginVertical={2} />
      <BoxFooter>
        <Text
          title="Formatos suportados:"
          size={12}
          weight={500}
          color={Colors.textColorBlack}
        />
        <Space marginHorizontal={2} />
        <Text
          title=".jpg, .gif"
          size={12}
          weight={400}
          color={Colors.textColorRX}
        />
      </BoxFooter>
    </BoxStyle>
  );
};

export default BoxUpload;
