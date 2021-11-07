const { location: locationMock } = require('./geocode.mock');
const url = require('url');

module.exports.geocodeRequest = (request, response) => {
  const { city } = url.parse(request.url, true).query;

  const location = city ? locationMock[city.toLowerCase()] : '';

  response.json(location);
};
