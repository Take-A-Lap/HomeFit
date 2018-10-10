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
  }
}
