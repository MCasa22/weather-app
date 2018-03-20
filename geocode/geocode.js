const request = require('request');

const key = 'AIzaSyAGFm69f20xcCN5nNN1_C5LLN6rF9NCV-8';
const forecastKey = '4e56879cf921868539d85c16097c973d';

var geocodeAddress = (address, callback) => {
  var encodedAddress = encodeURIComponent(address);

  request( {
    url: `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}&key=${key}`,
    json: true
  }, (error, response, body) => {
    if (error) {
      callback('unable to connect to Google servers');
    } else if (body.status === 'ZERO_RESULTS') {
      callback('unable to find typed address');
    } else if (body.status === 'OK') {
      callback(undefined, {
        address: body.results[0].formatted_address,
        latitude: body.results[0].geometry.location.lat,
        longitude: body.results[0].geometry.location.lng
      });
    }
  });
};


module.exports = {
  geocodeAddress
};
