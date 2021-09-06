import {Text, Space} from 'components';
import React, {useState, useEffect} from 'react';
import {BoxContainer, BoxFooter, BoxStyle, ButtonUpload} from './styles';

import FileIcon from 'assets/svg/file.svg';
import {Platform, View} from 'react-native';
import {selectImageOrVideo} from 'functions';
import {firestore} from 'firebase';
import {useSendFile} from 'hooks';
import {showMessage} from 'react-native-flash-message';

interface BoxUploadProps {
  error: string;
  setUrl: any;
}

const BoxUpload = ({setUrl, error}: BoxUploadProps) => {
  const {sendFile} = useSendFile();
  const [upload, setUpload] = useState({});
  const handleImageOrVideo = () => {
    selectImageOrVideo()
      .then((res: any) => {
        setUpload(res.data.assets[0]);
      })
      .catch((error: any) => {});
  };

  useEffect(() => {
    if (Object.keys(upload).length !== 0) {
      const {uri} = upload;
      const filename =
        firestore.FieldValue.serverTimestamp() +
        uri.substring(uri.lastIndexOf('/') + 1);
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
          <Text title={upload.uri} size={14} weight={500} color="#1c2439" />
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
                color="#1C2439"
                center
              />
            </View>
            <View style={{width: '90%'}}>
              <Text
                title="Tamanho máximo suportado 5mb"
                size={10}
                weight={400}
                color="#FF6859"
                center
              />
            </View>
          </View>
        </BoxContainer>
      )}
      <BoxFooter>
        <Text
          title="Formatos suportados:"
          size={12}
          weight={500}
          color="#090a0a"
        />
        <Space marginHorizontal={2} />
        <Text title=".jpg, .gif, .mp4" size={12} weight={400} color="#1C2439" />
      </BoxFooter>
    </BoxStyle>
  );
};

export default BoxUpload;
