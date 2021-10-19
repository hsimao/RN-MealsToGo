import React from 'react';
import { Platform } from 'react-native';
import styled from 'styled-components/native';
import { Card } from 'react-native-paper';
import { Spacer } from '../../../components/spacer.component';
import Star from '../../../../assets/star.svg';
import Open from '../../../../assets/open.svg';

const isWeb = Platform.OS === 'web';

const RestaurantCard = styled(Card)`
  background-color: ${props => props.theme.colors.bg.primary};
`;

const RestaurantCardCover = styled(Card.Cover)`
  padding: ${props => props.theme.space[3]};
  background-color: ${props => props.theme.colors.bg.primary};
`;

const Address = styled.Text`
  font-family: ${props => props.theme.fonts.body};
  font-size: ${props => props.theme.fontSizes.caption};
`;

const Title = styled.Text`
  font-family: ${props => props.theme.fonts.body};
  font-size: ${props => props.theme.fontSizes.body};
  color: ${props => props.theme.colors.ui.primary};
`;

const Info = styled.View`
  padding: ${props => props.theme.space[3]};
`;

const Section = styled.View`
  flex-direction: row;
  align-items: center;
`;

const SectionEnd = styled.View`
  flex: 1;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
`;

const Rating = styled.View`
  flex-direction: row;
  padding-top: ${props => props.theme.space[2]};
  padding-bottom: ${props => props.theme.space[2]};
`;

const CloseText = styled.Text`
  color: ${props => props.theme.colors.text.error};
`;

const IconImage = styled.Image`
  width: 15px;
  height: 15px;
`;

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
        <Title>{name}</Title>

        <Section>
          <Rating>{StarIconList}</Rating>

          <SectionEnd>
            {isClosedTemporarily && (
              <CloseText variant="label">CLOSED TEMPORARILY</CloseText>
            )}

            <Spacer position="left" size="medium" />

            {OpenIcon}

            <Spacer position="left" size="medium" />
            <IconImage source={{ uri: icon }} />
          </SectionEnd>
        </Section>

        <Address>{address}</Address>
      </Info>
    </RestaurantCard>
  );
};
