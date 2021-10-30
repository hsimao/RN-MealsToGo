import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from 'firebase/auth';

export const login = (email, password) => {
  const auth = getAuth();
  return signInWithEmailAndPassword(auth, email, password);
};

export const register = (email, password) => {
  const auth = getAuth();
  return createUserWithEmailAndPassword(auth, email, password);
};
