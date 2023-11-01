import {initializeApp} from 'firebase/app'
import {getAuth} from 'firebase/auth'
import {getFirestore} from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyDxywpvJZTSaBDUvmB3FuBv-TIbzJru9Ow",
  authDomain: "tccf-58232.firebaseapp.com",
  projectId: "tccf-58232",
  storageBucket: "tccf-58232.appspot.com",
  messagingSenderId: "168483994346",
  appId: "1:168483994346:web:3b3a3badd5f2c8573cb593",
  measurementId: "G-TBF482NGTV"
};

const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp);
const db = getFirestore(firebaseApp);

export {auth, db};