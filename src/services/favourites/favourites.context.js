import React, { createContext, useState } from 'react';

export const FavouritesContext = createContext();

export const FavouritesContextProvider = ({ children }) => {
  const [favourites, setFavourites] = useState([]);

  const addFavourites = restaurant => {
    setFavourites([...favourites, restaurant]);
  };

  const removeFavourite = restaurant => {
    const withoutRemoveFavourites = favourites.filter(
      item => item.placeId !== restaurant.placeId
    );
    setFavourites(withoutRemoveFavourites);
  };

  return (
    <FavouritesContext.Provider
      value={{
        favourites,
        addFavourites,
        removeFavourite,
      }}
    >
      {children}
    </FavouritesContext.Provider>
  );
};
