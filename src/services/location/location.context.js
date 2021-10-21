import React, { useState, createContext } from 'react';
import { fetchLocation, locationTransform } from './location.service';

export const LocationContext = createContext();

export const LocationContextProvider = ({ children }) => {
  const [keyword, setKeyword] = useState('San Francisco');
  const [location, setLocation] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const onSearch = searchKeyword => {
    if (!searchKeyword.length) {
      return;
    }

    setIsLoading(true);
    setKeyword(searchKeyword);

    fetchLocation(searchKeyword.toLowerCase())
      .then(locationTransform)
      .then(res => setLocation(res))
      .catch(err => setError(err))
      .finally(() => setIsLoading(false));
  };

  return (
    <LocationContext.Provider
      value={{
        isLoading,
        error,
        location,
        search: onSearch,
        keyword,
      }}
    >
      {children}
    </LocationContext.Provider>
  );
};
