import firebase from '@react-native-firebase/app';
// import database from '@react-native-firebase/database';

const firebaseConfig = {
  apiKey: 'AIzaSyBz_lWUP7gVOFzftenarxCTFXtzTjR9mTM',
  authDomain: 'cardrescue-f1830.firebaseapp.com',
  databaseURL: 'https://cardrescue-f1830-default-rtdb.firebaseio.com',
  projectId: 'cardrescue-f1830',
  storageBucket: 'cardrescue-f1830.appspot.com',
  messagingSenderId: '24441989990',
  appId: '1:24441989990:web:788bb7d27f69f9093876a7',
  measurementId: 'G-S86HYN6LH2',
};

const app = !firebase.apps.length
  ? firebase.initializeApp(firebaseConfig)
  : firebase.app();

export default app;
