import React, { useState, createContext } from 'react';
import { login } from './auth.service';

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  const onLogin = (email, password) => {
    setIsLoading(true);

    login(email, password)
      .then(userCredential => {
        if (userCredential.user) {
          setUser(userCredential.user);
        }
      })
      .catch(error => {
        console.log('error', error.message);
        setError(error);
      })
      .finally(() => setIsLoading(false));
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, error, onLogin }}>
      {children}
    </AuthContext.Provider>
  );
};
