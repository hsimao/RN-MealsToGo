import React, { useContext } from 'react';
import styled from 'styled-components/native';
import { AntDesign } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native';
import { FavouritesContext } from '../services/favourites/favourites.context';

const FavouriteButton = styled(TouchableOpacity)`
  position: absolute;
  top: 25px;
  right: 25px;
  z-index: 9;
`;

export const Favourite = ({ restaurant }) => {
  const { favourites, addFavourites, removeFavourite } =
    useContext(FavouritesContext);

  const isFavourite = favourites.find(
    favourite => favourite.placeId === restaurant.placeId
  );

  const handleFavouriteClick = () => {
    isFavourite ? removeFavourite(restaurant) : addFavourites(restaurant);
  };

  const iconName = isFavourite ? 'heart' : 'hearto';
  const iconColor = isFavourite ? 'red' : 'white';

  return (
    <FavouriteButton onPress={() => handleFavouriteClick()}>
      <AntDesign name={iconName} size={24} color={iconColor} />
    </FavouriteButton>
  );
};
