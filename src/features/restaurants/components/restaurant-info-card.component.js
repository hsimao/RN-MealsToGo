import React from 'react';
import { Platform } from 'react-native';
import { Spacer } from '../../../components/spacer.component';
import { Text } from '../../../components/text.component';
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

const isWeb = Platform.OS === 'web';

export const RestaurantInfoCard = ({ restaurant = {} }) => {
  const {
    name = 'Some Restaurant',
    icon = 'https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/lodging-71.png',
    photos = ['https://picsum.photos/500/300/?random'],
    address = '100 some random street',
    isOpenNow = true,
    rating = 4,
    isClosedTemporarily = true,
  } = restaurant;

  const ratingArray = Array.from(new Array(Math.floor(rating)));

  const StarIconList = ratingArray.map((item, index) =>
    isWeb ? (
      <img key={index} src={Star} width={20} height={20} />
    ) : (
      <Star key={index} width={20} height={20} />
    )
  );

  const OpenIcon = isWeb ? (
    <img src={Open} width={20} height={20} />
  ) : (
    <Open width={20} height={20} />
  );

  return (
    <RestaurantCard elevation={5}>
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

            {OpenIcon}

            <Spacer position="left" size="medium" />
            <IconImage source={{ uri: icon }} />
          </SectionEnd>
        </Section>

        <Text variant="caption">{address}</Text>
      </Info>
    </RestaurantCard>
  );
};
