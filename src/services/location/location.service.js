import camelize from 'camelize';
import { location } from './location.mock';

export const fetchLocation = searchTerm => {
  return new Promise((resolve, reject) => {
    const locationMock = location[searchTerm];
    if (!locationMock) {
      reject('not found');
    }
    resolve(locationMock);
  });
};

export const locationTransform = result => {
  const formattedResponse = camelize(result);
  const { geometry = {} } = formattedResponse.results[0];
  const { lat, lng } = geometry.location;

  return { lat, lng };
};
