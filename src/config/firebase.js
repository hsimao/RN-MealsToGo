import { initializeApp } from 'firebase/app';
import {
  apiKey,
  authDomawin,
  projectId,
  storageBucket,
  messagingSenderId,
  appId,
  measurementId,
  functionsApiUrl,
} from '@env';

const firebaseConfig = {
  apiKey,
  authDomawin,
  projectId,
  storageBucket,
  messagingSenderId,
  appId,
  measurementId,
};

export const Firebase = initializeApp(firebaseConfig);

const devApiUrl = 'http://localhost:5001/mealstogo-45a73/us-central1/';
export const apiUrl =
  process.env.NODE_ENV === 'development' ? devApiUrl : functionsApiUrl;
