// Dependencies
const { MAPBOX_TOKEN } = require('../../.env');
const request = require('request');
// Location request
// @params: address, callback, base_url, limit, url
const geocode = (address, callback) => {
  // set up parameters
  const limit = 1;
  const base_url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/';
  const url = `${base_url}${address}.json?access_token=${MAPBOX_TOKEN}&limit=${limit}`;

  // fire up the request
  request({ url, json: true }, (error, { body }) => {
    // check if all is OK.
    if (error) {
      callback(`Unable to connect to the location services`, undefined);
    } else if (body.features.length === 0) {
      callback(`Unable to find location. Try another search.`, undefined);
    } else {
      callback(undefined, {
        latitude: body.features[0].center[1],
        longitude: body.features[0].center[0],
        location: body.features[0].place_name
      });
    }
  });
};

module.exports = geocode;
