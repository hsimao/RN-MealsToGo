import { mocks, mockImages } from './mock';
import camelize from 'camelize';
import { Platform } from 'react-native';

export const fetchRestaurants = location => {
  const isWeb = Platform.OS === 'web';
  return isWeb
    ? fetchRestaurantsFromLocal(location)
    : fetchRestaurantsFromFirebase(location);
};

const fetchRestaurantsFromFirebase = location => {
  return fetch(
    `http://localhost:5001/mealstogo-329909/us-central1/placesNearby?location=${location}`
  ).then(res => res.json());
};

export const fetchRestaurantsFromLocal = location => {
  return new Promise((resolve, reject) => {
    const mock = mocks[location];
    if (!mock) {
      reject('not found');
    }

    const addMockImage = restaurant => {
      const rendomImage =
        mockImages[Math.ceil(Math.random() * mockImages.length)];
      restaurant.photos = [rendomImage];
      return restaurant;
    };

    mock.results = mock.results.map(addMockImage);

    resolve(mock);
  });
};

export const restaurantsTransform = ({ results = [] }) => {
  const formatResults = results.map(item => {
    return {
      ...item,
      address: item.vicinity,
      isOpenNow: item.opening_hours && item.opening_hours.open_now,
      isClosedTemporarily: item.business_status === 'CLOSED_TEMPORARILY',
    };
  });

  return camelize(formatResults);
};
