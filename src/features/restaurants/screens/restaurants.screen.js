import React from 'react';
import styled from 'styled-components/native';
import { StatusBar, SafeAreaView, View } from 'react-native';
import { Searchbar } from 'react-native-paper';
import { RestaurantInfoCard } from '../components/restaurant-info-card.component.js';

const statusBarHeight = StatusBar?.currentHeight ? StatusBar.currentHeight : 0;

const SafeArea = styled(SafeAreaView)`
  flex: 1;
  margin-top: ${statusBarHeight}px;
`;

const SearchContainer = styled(View)`
  padding: 16px;
`;

const RestaurantListContainer = styled(View)`
  flex: 1;
  padding: 16px;
  background-color: blue;
`;

export const RestaurantsScreen = () => (
  <SafeArea>
    <SearchContainer>
      <Searchbar placeholder="Search" />
    </SearchContainer>
    <RestaurantListContainer>
      <RestaurantInfoCard />
    </RestaurantListContainer>
  </SafeArea>
);
