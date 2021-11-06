import React, { useContext } from 'react';
import styled from 'styled-components/native';
import { Text } from '../../../components/text.component';
import { SafeArea } from '../../../components/safe-area.component';
import { RestaurantList } from '../../restaurants/components/restaurant-list.component';
import { FavouritesContext } from '../../../services/favourites/favourites.context';

const NoFavouritesArea = styled(SafeArea)`
  align-items: center;
  justify-content: center;
`;

export const favouritesScreen = ({ navigation }) => {
  const { favourites } = useContext(FavouritesContext);

  return favourites.length ? (
    <SafeArea>
      <RestaurantList restaurants={favourites} navigation={navigation} />
    </SafeArea>
  ) : (
    <NoFavouritesArea>
      <Text>No favourites yet</Text>
    </NoFavouritesArea>
  );
};
