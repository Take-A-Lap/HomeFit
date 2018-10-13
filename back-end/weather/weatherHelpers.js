const request = require('request');
const express = require('express');
const config = require('../../config');
const app = express();

module.exports = {
  getWeather: function(callback) {
    request(`http://dataservice.accuweather.com/currentconditions/v1/348585?apikey=${config.ACCUWEATHER_API_KEY_2}`, function(error, response, body) {
      if (!error && response.statusCode === 200) {
        callback(body);
      }
    })
  },

  //Dark Sky API call
  getWeatherDarkSky: (latitude, longitude, callback) => {
    let options = {
      method: 'GET',
      url: `https://api.darksky.net/forecast/${config.DARKSKY_API_KEY}/${latitude},${longitude}`
    }
    request(options, callback);
  },

  getCityNameForWeatherInfo: (latitude, longitude, callback) => {
    let options = {
      method: 'GET',
      url: `https://reverse.geocoder.api.here.com/6.2/reversegeocode.json?prox=${latitude}%2C${longitude}%2C250&mode=retrieveAddresses&maxresults=1&gen=9&app_id=${config.HERE_AP_ID}&app_code=${config.HERE_AP_CODE}`
    }
    request(options, callback);
  },

  createDayNightLabel: (number, callback) => {
    let text;
    if (number > 5 && number < 19) {
      text = 'day';
    } else if (number > 1 || number > 18) {

      text = 'night';
    }
    callback(text);
  },

  createWeatherTypeLabel: (weatherInfo, callback) => {
    let label;
    label = weatherInfo.text;
      callback(label);
  }

}
