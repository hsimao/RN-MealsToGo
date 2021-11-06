import React from 'react';
import styled from 'styled-components/native';
import { FlatList } from 'react-native';
import { TouchableOpacity } from 'react-native';
import { Spacer } from '../../../components/spacer.component';
import { RestaurantInfoCard } from './restaurant-info-card.component';

export const RestaurantListContainer = styled(FlatList).attrs({
  contentContainerStyle: {
    padding: 16,
  },
})``;

export const RestaurantList = ({ restaurants, navigation }) => (
  <RestaurantListContainer
    data={restaurants}
    renderItem={({ item }) => {
      return (
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('RestaurantDetail', {
              restaurant: item,
            })
          }
        >
          <Spacer position="bottom" size="large">
            <RestaurantInfoCard restaurant={item} />
          </Spacer>
        </TouchableOpacity>
      );
    }}
    keyExtractor={item => item.name}
  />
);
