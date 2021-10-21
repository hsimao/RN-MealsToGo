import React, { useState, createContext, useEffect, useMemo } from 'react';
import { fetchRestaurants, restaurantsTransform } from './restaurants.service';

export const RestaurantsContext = createContext();

export const RestaurantsContextProvider = ({ children }) => {
  const [restaurants, setRestaurants] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleFetchRestaurants = () => {
    setIsLoading(true);
    setTimeout(() => {
      fetchRestaurants()
        .then(restaurantsTransform)
        .then(res => setRestaurants(res))
        .catch(err => setError(err))
        .finally(() => setIsLoading(false));
    }, 2000);
  };

  useEffect(() => {
    handleFetchRestaurants();
  }, []);

  return (
    <RestaurantsContext.Provider value={{ restaurants, isLoading, error }}>
      {children}
    </RestaurantsContext.Provider>
  );
};
