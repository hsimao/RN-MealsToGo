import { mocks, mockImages } from './mock';
import camelize from 'camelize';

export const fetchRestaurants = (location = '37.7749295,-122.4194155') => {
  return new Promise((resolve, reject) => {
    const mock = mocks[location];
    if (!mock) {
      return reject('not found');
    }
    return resolve(mock);
  });
};

export const restaurantsTransform = ({ results = [] }) => {
  const formatResults = results.map(item => {
    item.photos = item.photos.map(p => {
      return mockImages[Math.ceil(Math.random() * mockImages.length)];
    });

    return {
      ...item,
      isOpenNow: item.opening_hours && item.opening_hours.open_now,
      isClosedTemporarily: item.business_status === 'CLOSED_TEMPORARILY',
    };
  });

  return camelize(formatResults);
};
