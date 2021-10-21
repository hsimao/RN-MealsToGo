import { mocks, mockImages } from './mock';
import camelize from 'camelize';

export const fetchRestaurants = location => {
  return new Promise((resolve, reject) => {
    const mock = mocks[location];
    if (!mock) {
      reject('not found');
    }
    resolve(mock);
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
