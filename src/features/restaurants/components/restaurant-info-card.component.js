import React from 'react';
import { Spacer } from '../../../components/spacer.component';
import { Text } from '../../../components/text.component';
import { SvgWrapper } from '../../../components/svg-wrapper.component';
import { Favourite } from '../../../components/favourite.component';
import Star from '../../../../assets/star.svg';
import Open from '../../../../assets/open.svg';

import {
  RestaurantCard,
  RestaurantCardCover,
  Info,
  Section,
  SectionEnd,
  Rating,
  IconImage,
} from './restaurant-info-card.styles';

export const RestaurantInfoCard = ({ restaurant = {} }) => {
  const {
    name = 'Some Restaurant',
    icon = 'https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/lodging-71.png',
    photos = ['https://picsum.photos/500/300/?random'],
    address = '100 some random street',
    isOpenNow = true,
    rating = 4,
    isClosedTemporarily = true,
    placeId,
  } = restaurant;

  const ratingArray = Array.from(new Array(Math.floor(rating)));

  const StarIconList = ratingArray.map((_, index) => (
    <SvgWrapper
      key={`star-${placeId}-${index}`}
      Svg={Star}
      width={20}
      height={20}
    />
  ));

  return (
    <RestaurantCard elevation={5}>
      <Favourite restaurant={restaurant} />
      <RestaurantCardCover key={name} source={{ uri: photos[0] }} />
      <Info>
        <Text variant="label">{name}</Text>

        <Section>
          <Rating>{StarIconList}</Rating>

          <SectionEnd>
            {isClosedTemporarily && (
              <Text variant="error">CLOSED TEMPORARILY</Text>
            )}

            <Spacer position="left" size="medium" />

            <SvgWrapper Svg={Open} width={20} height={20} />

            <Spacer position="left" size="medium" />
            <IconImage source={{ uri: icon }} />
          </SectionEnd>
        </Section>

        <Text variant="caption">{address}</Text>
      </Info>
    </RestaurantCard>
  );
};
