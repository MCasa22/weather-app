const request = require('request');

var getWeather = (latitude, longitude, callback) => {
  request( {
    url: `https://api.darksky.net/forecast/4e56879cf921868539d85c16097c973d/${latitude},${longitude}`,
    json: true
  }, (error, response, body) => {
    if (!error && response.statusCode === 200) {

      var tempCelsius = toCelsius(body.currently.temperature);
      var apparentTempCelsius = toCelsius(body.currently.apparentTemperature);

      callback(undefined, {
        temperature:          tempCelsius,
        apparentTemperature:  apparentTempCelsius
      });
    } else {
      callback(`ERROR: unable to contact servers\n ${JSON.stringify(error, undefined, 2)}`);
    }
  });
}

var toCelsius = (tempInFarh) => {
  var res = (tempInFarh - 32) * 5 / 9;
  return Math.round(res);
};

module.exports = {
  getWeather
};
