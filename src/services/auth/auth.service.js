import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
} from 'firebase/auth';

export const login = (email, password) => {
  const auth = getAuth();
  return signInWithEmailAndPassword(auth, email, password);
};

export const register = (email, password) => {
  const auth = getAuth();
  return createUserWithEmailAndPassword(auth, email, password);
};

export const authStateChanged = callback => {
  const auth = getAuth();
  return onAuthStateChanged(auth, user => callback(user));
};

export const logout = () => {
  return getAuth().signOut();
};
