const functions = require('firebase-functions');
const { mocks, addMockImage, images } = require('./mock');

const url = require('url');

const addGoogleImage = restaurant => {
  const ref = restaurant?.photos[0]?.photo_reference;
  if (!ref) {
    restaurant.photos = [images.mockImages[0]];
    return restaurant;
  }

  restaurant.photos = [
    `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${ref}&key=${
      functions.config().google.mapkey
    }`,
  ];
  return restaurant;
};

module.exports.placesRequest = (request, response, client) => {
  const { location, mock } = url.parse(request.url, true).query;

  if (!location) {
    response.send('missing the "location" parameter.');
  }

  if (mock === 'true') {
    const data = location ? mocks[location] : '';
    if (data) {
      data.results = data.results.map(addMockImage);
    }
    return response.send(data);
  }

  client
    .placesNearby({
      params: {
        location,
        radius: 1500, // 半徑
        type: 'restaurant',
        key: functions.config().google.mapkey,
      },
      timeout: 1000,
    })
    .then(res => {
      // NOTE: google map 圖片要另外呼叫 api 會導致費用遽增, 這邊用假圖
      res.data.results = res.data.results.map(addMockImage);
      return response.json(res.data);
    })
    .catch(err => {
      response.status(400);
      console.log('err', err);
      return response.send(err.response.data.error_message);
    });
};
