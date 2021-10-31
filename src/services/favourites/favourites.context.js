import React, { createContext, useState, useEffect, useContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthContext } from '../auth/auth.context';

export const FavouritesContext = createContext();

export const FavouritesContextProvider = ({ children }) => {
  const [favourites, setFavourites] = useState([]);
  const { user } = useContext(AuthContext);

  const saveFavourites = async (value, uid) => {
    if (value && value.length) {
      try {
        await AsyncStorage.setItem(`@favourites-${uid}`, JSON.stringify(value));
      } catch (e) {
        console.log('saveFavourites error: ', e);
      }
    }
  };

  const loadFavourites = async uid => {
    try {
      const value = await AsyncStorage.getItem(`@favourites-${uid}`);
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
    if (user && user.uid) {
      console.log('user', user);
      loadFavourites(user.uid);
    }
  }, [user]);

  useEffect(() => {
    if (user && user.uid && favourites.length) {
      saveFavourites(favourites, user.uid);
    }
  }, [favourites, user]);

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
