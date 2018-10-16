const request = require('request');
const express = require('express');
const config = require('../../config');
const app = express();

module.exports = {
  getWeather: function (callback) {
    request(`http://dataservice.accuweather.com/currentconditions/v1/348585?apikey=${config.ACCUWEATHER_API_KEY_2}`, function (error, response, body) {
      if (!error && response.statusCode === 200) {
        callback(body);
      }
    })
  },

  //Dark Sky API call
  getWeatherDarkSky: (latitude, longitude) => {
    return new Promise((resolve, reject) => {
      let solution;
      let options = {
        method: 'GET',
        url: `https://api.darksky.net/forecast/${config.DARKSKY_API_KEY}/${latitude},${longitude}`
      }
      request(options, (error, response) => {
        let solution = JSON.parse(response.body);
        if (response) {
          resolve(solution.currently)
        } else {
          reject('darkSky Rejection')
        }
      })
    })
  },

  getCityNameForWeatherInfo: (latitude, longitude) => {
    return new Promise((resolve, reject) => {
      let options = {
        method: 'GET',
        url: `https://reverse.geocoder.api.here.com/6.2/reversegeocode.json?prox=${latitude}%2C${longitude}%2C250&mode=retrieveAddresses&maxresults=1&gen=9&app_id=${config.HERE_AP_ID}&app_code=${config.HERE_AP_CODE}`
      }
      request(options, (error, result) => {
        let solution = JSON.parse(result.body)
        if (result) {
          resolve(solution.Response.View[0].Result[0].Location.Address)
        } else {
          reject('getCity Rejection')
        }
      })
    })
  },

  issueAdvisory: (lat, long, time) => {
    return new Promise((resolve, reject) => {
      let options = {
        method: 'GET',
        url: `https://reverse.geocoder.api.here.com/6.2/reversegeocode.json?prox=${latitude}%2C${longitude}%2C250&mode=retrieveAddresses&maxresults=1&gen=9&app_id=${config.HERE_AP_ID}&app_code=${config.HERE_AP_CODE}`
      }
      request(options, (error, result) => {
        if (result) {
          resolve(result)
        } else {
          reject('getCity Rejection')
        }
      })
    })
    getCityNameForWeatherInfo(lat, long),
      createDayNightLabel(time)

  },

  createDayNightLabel: (number, callback) => {
    let text;
    return new Promise((resolve, reject) => {
      if (number > 5 && number < 19) {
        text = 'day';
      } else if (number > 1 || number > 18) {
        text = 'night';
      }
      if (text === 'day' || text === 'night') {
        resolve(text)
      } else {
        reject('time of day label rejection')
      }
    })
  },

  createWeatherTypeLabel: (weatherInfo, callback) => {
    let label;
    return new Promise((resolve, reject) => {
      label = weatherInfo.text;
      if (label = weatherInfo.text) {
        resolve(label)
      } else {
        reject(label)
      }
    })
  },

  runningRecommendations: (weatherInfo) => {
    let recommendation;
    return new Promise((resolve, reject) => {
        if (weatherInfo.temp > 90 || weatherInfo.temp < 25 || weatherInfo.humidity > 0.75) {
          resolve('Poor');
        } else {
          resolve('Good');
        }
      })
      .catch(() => console.error('yuck'))
  }
}