import React from 'react';
import { Text } from 'react-native';
import styled from 'styled-components/native';
import { Card } from 'react-native-paper';

const RestaurantCard = styled(Card)`
  background-color: ${props => props.theme.colors.bg.primary};
`;

const RestaurantCardCover = styled(Card.Cover)`
  padding: ${props => props.theme.space[3]};
  background-color: ${props => props.theme.colors.bg.primary};
`;

const Title = styled(Text)`
  font-family: ${props => props.theme.fonts.body};
  padding: ${props => props.theme.space[3]};
  color: ${props => props.theme.colors.ui.primary};
`;

export const RestaurantInfoCard = ({ restaurant = {} }) => {
  const {
    name = 'Some Restaurant',
    icon,
    photos = ['https://picsum.photos/500/300/?random'],
    address = '100 some random street',
    isOpenNow = true,
    rating = 4,
    isClosedTemporarily,
  } = restaurant;

  return (
    <RestaurantCard elevation={5}>
      <RestaurantCardCover key={name} source={{ uri: photos[0] }} />
      <Title>{name}</Title>
    </RestaurantCard>
  );
};
