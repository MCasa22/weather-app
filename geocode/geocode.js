const request = require('request');

//see config.example.js for configuration
const {key} = require('../config.js');

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
