import React, { useState, createContext } from 'react';
import { login, register } from './auth.service';

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
      .catch(error => setError(error.message))
      .finally(() => setIsLoading(false));
  };

  const onRegister = (email, password, repeatedPassword) => {
    if (password !== repeatedPassword) {
      setError('Error: Passwords do not match');
      return;
    }
    setIsLoading(true);

    register(email, password)
      .then(userCredential => {
        if (userCredential.user) {
          setUser(userCredential.user);
        }
      })
      .catch(error => setError(error.message))
      .finally(() => setIsLoading(false));
  };

  return (
    <AuthContext.Provider
      value={{
        isAuth: !!user,
        user,
        isLoading,
        error,
        onLogin,
        onRegister,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
