import { initializeApp } from 'firebase/app';
import {
  apiKey,
  authDomawin,
  projectId,
  storageBucket,
  messagingSenderId,
  appId,
} from '@env';

const firebaseConfig = {
  apiKey,
  authDomawin,
  projectId,
  storageBucket,
  messagingSenderId,
  appId,
};

export const Firebase = initializeApp(firebaseConfig);
