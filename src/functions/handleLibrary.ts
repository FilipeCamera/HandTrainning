import {launchImageLibrary} from 'react-native-image-picker';

const selectImage = () => {
  return new Promise((resolve, reject) =>
    launchImageLibrary(
      {mediaType: 'photo', quality: 1, includeBase64: true},
      (response: any) => {
        if (response.didCancel) {
          reject({error: 'Imagem não foi selecionada'});
        } else if (response.error) {
          reject({
            error: 'Não foi possível selecionar a imagem. Tente novamente',
          });
        }
        resolve({error: '', data: response, sucess: true});
      },
    ),
  );
};

const selectImageOrVideo = () => {
  return new Promise((resolve, reject) => {
    launchImageLibrary(
      {
        mediaType: 'mixed',
        quality: 1,
        videoQuality: 'high',
        includeBase64: true,
      },
      (response: any) => {
        if (response.didCancel) {
          reject({error: 'Imagem não foi selecionada'});
        } else if (response.error) {
          reject({
            error: 'Não foi possível selecionar a imagem. Tente novamente',
          });
        }
        resolve({error: '', data: response, sucess: true});
      },
    );
  });
};

export {selectImage as default, selectImageOrVideo};
