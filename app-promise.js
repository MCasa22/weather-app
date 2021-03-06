const yargs = require('yargs');
const axios = require('axios');

//see config.example.js for configuration
const {key, keyID} = require('./config.js');

const argv = yargs
  .options({
    a:{
      demand: true,
      alias: 'address',
      description: 'ddress to fetch the weather for',
      string: true
    }
  })
  .help()
  .alias('help', 'h')
  .argv;

var encodedAddress = encodeURIComponent(argv.address);
var geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}&key=${key}`;

//il metodo restituisce una promise;
axios.get(geocodeUrl)
  .then((response) => {
    if(response.data.status === 'ZERO_RESULTS') {
      throw new Error('unable to find address.');
    }
    var latitude = response.data.results[0].geometry.location.lat;
    var longitude = response.data.results[0].geometry.location.lng;
    var weatherUrl = `https://api.darksky.net/forecast/${keyID}/${latitude},${longitude}`;
    console.log(response.data.results[0].formatted_address);
    return axios.get(weatherUrl)
      .then((response) => {
        var temperature = response.data.currently.temperature;
        var apparentTemperature = response.data.currently.apparentTemperature;
        console.log(`It's ${temperature} but it feels like ${apparentTemperature} degrees.`);
      })
  })
   .catch((e) => {
    if(e.code === 'ENOTFOUND') {
      console.log('unable to connect to API servers.');
    } else {
      console.log(e.message);
    }
  })
