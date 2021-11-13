import camelize from 'camelize';
import { location } from './location.mock';
import { Platform } from 'react-native';
import { apiUrl } from '../../config/firebase';
import { isMock } from '@env';

export const fetchLocation = searchTerm => {
  const isWeb = Platform.OS === 'web';
  return isWeb
    ? fetchLocationFromLocal(searchTerm)
    : fetchLocationFromFirebase(searchTerm);
};

const fetchLocationFromFirebase = searchTerm => {
  return fetch(`${apiUrl}geocode?city=${searchTerm}&mock=${isMock}`).then(res =>
    res.json()
  );
};

const fetchLocationFromLocal = searchTerm => {
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

  return { lat, lng, viewport: geometry.viewport };
};
