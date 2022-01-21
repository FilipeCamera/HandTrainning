import firestore from '@react-native-firebase/firestore';
import firebase from '@react-native-firebase/app';
import auth from '@react-native-firebase/auth';
import storage from '@react-native-firebase/storage';
import messaging from '@react-native-firebase/messaging';
import message from '@react-native-firebase/in-app-messaging';

const credentials = {
  apiKey: 'AIzaSyCAvSxbCE1W0z6u7ItVgEEVC4U0-rU01SU',
  databaseURL: 'https://handtrainning.firebaseio.com',
  authDomain: 'handtrainning.firebaseapp.com',
  projectId: 'handtrainning',
  storageBucket: 'handtrainning.appspot.com',
  messagingSenderId: '401181767167',
  appId: '1:401181767167:web:00af3f72f87ecf5cc3a3ca',
  measurementId: 'G-YPX61V53L4',
};

if (firebase.apps.length === 0) {
  firebase.initializeApp(credentials);
}

export {firebase, firestore, messaging, message, storage, auth};
