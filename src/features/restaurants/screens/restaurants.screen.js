import React, { useContext, useState } from 'react';
import styled from 'styled-components/native';
import { ActivityIndicator, Colors } from 'react-native-paper';
import { RestaurantList } from '../components/restaurant-list.component';
import { Search } from '../components/search.component.js';
import { SafeArea } from '../../../components/safe-area.component';
import { FavouritesBar } from '../../../components/favourites-bar.component';

import { RestaurantsContext } from '../../../services/restaurants/restaurants.context';
import { FavouritesContext } from '../../../services/favourites/favourites.context';

const Loading = styled(ActivityIndicator)`
  margin-left: -25px;
`;

const LoadingContainer = styled.View`
  position: absolute;
  top: 50%;
  left: 50%;
`;

export const RestaurantsScreen = ({ navigation }) => {
  const { isLoading, restaurants } = useContext(RestaurantsContext);
  const { favourites } = useContext(FavouritesContext);
  const [isToggled, setIsToggled] = useState(false);

  return (
    <SafeArea>
      {isLoading && (
        <LoadingContainer>
          <Loading size={50} animating={true} color={Colors.blue300} />
        </LoadingContainer>
      )}

      <Search
        isFavouritesToggled={isToggled}
        onFavouritesToggle={() => setIsToggled(!isToggled)}
      />

      {isToggled && (
        <FavouritesBar
          favourites={favourites}
          onNavigate={navigation.navigate}
        />
      )}

      <RestaurantList restaurants={restaurants} navigation={navigation} />
    </SafeArea>
  );
};
