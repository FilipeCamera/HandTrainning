import {Platform} from 'react-native';
import {request, PERMISSIONS} from 'react-native-permissions';

const onPermission = async () => {
  await request(PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE).then(result => {
    const statusFine = result;

    if (Platform.Version < 29) {
      if (statusFine === 'granted') {
        return;
      }
      return;
    }
    if (statusFine === 'granted') {
      return;
    }
    return;
  });
};

export default onPermission;
