const yargs = require('yargs');

const geocode = require('./geocode/geocode.js');
const weather = require('./weather/weather.js');

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
//console.log(argv);

geocode.geocodeAddress(argv.address, (errorMessage, results) => {
  if(errorMessage) {
    console.log(errorMessage);
  } else {
    console.log(results.address);

    weather.getWeather(results.latitude, results.longitude, (errorMessage, weatherResults) => {
      if (errorMessage) {
        console.log(errorMessage);
      } else {
        console.log(`It's currently ${weatherResults.temperature} degrees.\nIt feels like ${weatherResults.apparentTemperature}`);
      }
    });

  }
});



//KEY FOR USING GOOGLE API'S: add "&key=AIzaSyAGFm69f20xcCN5nNN1_C5LLN6rF9NCV-8" in url query
//KEY FOR USING DARK SKY WEATHER API: "4e56879cf921868539d85c16097c973d"
