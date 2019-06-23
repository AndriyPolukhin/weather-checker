// Dependencies
const { DARKSKY_TOKEN } = require('../../.env');
const request = require('request');

// Forecast request
// @params: address, callback, base_url, limit, url
const forecast = (lat, long, callback) => {
  // url
  const url = `https://api.darksky.net/forecast/${DARKSKY_TOKEN}/${lat},${long}?units=si&lang=en`;

  // request
  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback(`Unable to connect to the weather services`, undefined);
    } else if (body.error) {
      callback(`Unable to find location`, undefined);
    } else {
      callback(
        undefined,
        `Summary: ${body.daily.data[0].summary} It is currently ${
          body.currently.temperature
        } degrees out. There is a ${
          body.currently.precipProbability
        } % chance of rain.`
      );
    }
  });
};

module.exports = forecast;
