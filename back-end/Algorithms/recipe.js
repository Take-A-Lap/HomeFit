// const axios = require('axios');
var request = require('request');
const express = require('express');
const config = require('../../config.js');
const app = express();
const axios = require('axios');


module.exports = {

  // promiseTest:()=>{
  //   return new Promise(resolve, reject)=>{
  //     axios.get()
  //   }
  // },

  getBreakfast: function (calorieMin, calorieMax, dietaryRestrictions) {
    request(`https://api.edamam.com/search?q=breakfast&app_id=${config.EDAMAM_API_ID}&app_key=${config.EDAMAM_API_KEY}&calories=${calorieMin}-${calorieMax}&health=${dietaryRestrictions}`, function (error, response, body) {
      if (!error && response.statusCode == 200) {
        callback(body);
      }
    })
  },
  getEggs: function (calorieMin, calorieMax, dietaryRestrictions, callback) {
    request(`https://api.edamam.com/search?q=eggs&app_id=${config.EDAMAM_API_ID}&app_key=${config.EDAMAM_API_KEY}&from=0&to=12&calories=${calorieMin}-${calorieMax}&health=${dietaryRestrictions}`, function (error, response, body) {
      if (!error && response.statusCode == 200) {
        callback(body);
      }
    })
  },
  getYogurt: function (calorieMin, calorieMax, dietaryRestrictions, callback) {
    request(`https://api.edamam.com/search?q=yogurt&app_id=${config.EDAMAM_API_ID}&app_key=${config.EDAMAM_API_KEY}&calories=${calorieMin}-${calorieMax}&health=${dietaryRestrictions}`, function (error, response, body) {
      if (!error && response.statusCode == 200) {
        callback(body);
      }
    })
  },
  getLunch: function (calorieMin, calorieMax, dietaryRestrictions, callback) {
    request(`https://api.edamam.com/search?q=lunch&app_id=${config.EDAMAM_API_ID}&app_key=${config.EDAMAM_API_KEY}&from=0&to=30&calories=${calorieMin}-${calorieMax}&health=${dietaryRestrictions}`, function (error, response, body) {
      if (!error && response.statusCode == 200) {
        callback(body);
      }
    })
  },
  getSteak: function (calorieMin, calorieMax, dietaryRestrictions, callback) {
    request(`https://api.edamam.com/search?q=steak&app_id=${config.EDAMAM_API_ID}&app_key=${config.EDAMAM_API_KEY}&from=0&to=10&calories=${calorieMin}-${calorieMax}&health=${dietaryRestrictions}`, function (error, response, body) {
      if (!error && response.statusCode == 200) {
        callback(body);
      }
    })
  },
  getBeef: function (calorieMin, calorieMax, dietaryRestrictions, callback) {
    request(`https://api.edamam.com/search?q=beef&app_id=${config.EDAMAM_API_ID}&app_key=${config.EDAMAM_API_KEY}&from=0&to=10&calories=${calorieMin}-${calorieMax}&health=${dietaryRestrictions}`, function (error, response, body) {
      if (!error && response.statusCode == 200) {
        callback(body);
      }
    })
  },
  getChicken: function (calorieMin, calorieMax, dietaryRestrictions, callback) {
    request(`https://api.edamam.com/search?q=chicken&app_id=${config.EDAMAM_API_ID}&app_key=${config.EDAMAM_API_KEY}&from=0&to=10&calories=${calorieMin}-${calorieMax}&health=${dietaryRestrictions}`, function (error, response, body) {
      if (!error && response.statusCode == 200) {
        callback(body);
      }
    })
  },
  getFish: function (calorieMin, calorieMax, dietaryRestrictions, callback) {
    request(`https://api.edamam.com/search?q=fish&app_id=${config.EDAMAM_API_ID}&app_key=${config.EDAMAM_API_KEY}&from=0&to=10&calories=${calorieMin}-${calorieMax}&health=${dietaryRestrictions}`, function (error, response, body) {
      if (!error && response.statusCode == 200) {
        callback(body);
      }
    })
  },
  generateSeven: function(fromArray, toArray) {
    let randScreen = [];
    let randomNumbers = {};
    for (let i = 1; i <= 7; i++) {
      let gen = Math.floor(Math.random() * fromArray.length);
      randomNumbers[i] = randScreen.includes(gen) ? Math.floor(Math.random() * fromArray.length) : gen;
    }
    let randomNumberArray = Object.values(randomNumbers);
    randomNumberArray.forEach(randomNumber => {
      toArray.push(fromArray[randomNumber]);
    });
  },
}