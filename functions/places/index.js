const functions = require('firebase-functions');
const { mocks, addMockImage } = require('./mock');
const url = require('url');

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
      // NOTE: google map 圖片要另外處理, 這邊用假圖
      res.data.results = res.data.results.map(addMockImage);
      return response.json(res.data);
    })
    .catch(err => {
      response.status(400);
      return response.send(err.response.data.error_message);
    });
};
