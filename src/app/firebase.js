// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import { initializeApp } from 'firebase/app';
import {getStorage} from 'firebase/storage'
const firebaseConfig = {
    apiKey: "AIzaSyAWZ96SHlAanPfD0tln_mZI5HcMI3K4Bzw",
    authDomain: "fe-is220.firebaseapp.com",
    projectId: "fe-is220",
    storageBucket: "fe-is220.appspot.com",
    messagingSenderId: "1076333927972",
    appId: "1:1076333927972:web:7f25e72b285c5dab06c2b1",
    measurementId: "G-7ZNQKJY0EB"
  };
  const firebaseApp = initializeApp(firebaseConfig)
  export const storage = getStorage(firebaseApp)