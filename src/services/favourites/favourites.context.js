import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const FavouritesContext = createContext();

export const FavouritesContextProvider = ({ children }) => {
  const [favourites, setFavourites] = useState([]);

  const saveFavourites = async value => {
    if (value && value.length) {
      try {
        await AsyncStorage.setItem('@favourites', JSON.stringify(value));
      } catch (e) {
        console.log('saveFavourites error: ', e);
      }
    }
  };

  const loadFavourites = async () => {
    try {
      const value = await AsyncStorage.getItem('@favourites');
      if (value !== null) {
        setFavourites(JSON.parse(value));
      }
    } catch (e) {
      console.log('loadFavourites error: ', e);
    }
  };

  const addFavourites = restaurant => {
    setFavourites([...favourites, restaurant]);
  };

  const removeFavourite = restaurant => {
    const withoutRemoveFavourites = favourites.filter(
      item => item.placeId !== restaurant.placeId
    );
    setFavourites(withoutRemoveFavourites);
  };

  // 第一次掛載時先從本地裝置取得資料
  useEffect(() => {
    loadFavourites();
  }, []);

  useEffect(() => {
    saveFavourites(favourites);
  }, [favourites]);

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
