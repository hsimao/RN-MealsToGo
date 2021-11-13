import React, { useState, createContext, useContext, useEffect } from 'react';
import { fetchRestaurants, restaurantsTransform } from './restaurants.service';
import { LocationContext } from '../location/location.context';

export const RestaurantsContext = createContext();

export const RestaurantsContextProvider = ({ children }) => {
  const [restaurants, setRestaurants] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const { location } = useContext(LocationContext);

  const handleFetchRestaurants = loc => {
    setIsLoading(true);
    setRestaurants([]);
    setTimeout(() => {
      fetchRestaurants(loc)
        .then(restaurantsTransform)
        .then(res => {
          setError(null);
          setRestaurants(res);
        })
        .catch(err => setError(err))
        .finally(() => setIsLoading(false));
    }, 2000);
  };

  useEffect(() => {
    if (location) {
      const locationString = `${location.lat},${location.lng}`;
      handleFetchRestaurants(locationString);
    }
  }, [location]);

  return (
    <RestaurantsContext.Provider value={{ restaurants, isLoading, error }}>
      {children}
    </RestaurantsContext.Provider>
  );
};
