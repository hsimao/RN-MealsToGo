const functions = require('firebase-functions');
const { location: locationMock } = require('./geocode.mock');
const url = require('url');

module.exports.geocodeRequest = (request, response, client) => {
  const { city, mock } = url.parse(request.url, true).query;
  if (!city) {
    response.send('missing the "city" parameter.');
  }

  if (mock === 'true') {
    const location = city ? locationMock[city.toLowerCase()] : '';
    return response.json(location);
  }

  client
    .geocode({
      params: {
        address: city,
        key: functions.config().google.mapkey,
      },
      timeout: 1000,
    })
    .then(res => {
      return response.json(res.data);
    })
    .catch(err => {
      response.status(400);
      return response.send(err.response.data.error_message);
    });
};
