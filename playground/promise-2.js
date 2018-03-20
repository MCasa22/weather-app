const request = require('request');
const key = 'AIzaSyAGFm69f20xcCN5nNN1_C5LLN6rF9NCV-8';

var geocodeAddress = (address) => {
  return new Promise((resolve, reject) => {
    var encodedAddress = encodeURIComponent(address);

    request( {
      url: `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}&key=${key}`,
      json: true
    }, (error, response, body) => {
      if (error) {
        reject('unable to connect to Google servers');
      } else if (body.status === 'ZERO_RESULTS') {
        reject('unable to find typed address');
      } else if (body.status === 'OK') {
        resolve({
          address: body.results[0].formatted_address,
          latitude: body.results[0].geometry.location.lat,
          longitude: body.results[0].geometry.location.lng
        });
      }
    });
  });
};

geocodeAddress('vicolo isetta 13')
  .then((res) => {
    console.log(JSON.stringify(res, undefined, 2));
    console.log(typeof res);
  },
        (errorMessage) => {
    console.log('####: ', errorMessage);
  });
