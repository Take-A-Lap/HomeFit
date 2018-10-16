// const axios = require('axios');
// var Promise = require('bluebird');
var request = /*Promise.promisify(*/require('request');
const express = require('express');
const config = require('../../config.js');
const app = express();
const axios = require('axios');


module.exports = {
  getBreakfast: function (calorieMin, calorieMax, dietaryRestrictions) {
    const adjustment = dietaryRestrictions ? `&health=${dietaryRestrictions}` : '';
    return new Promise((resolve, reject) => {
      request(`https://api.edamam.com/search?q=breakfast&app_id=${config.EDAMAM_API_ID}&app_key=${config.EDAMAM_API_KEY}&calories=${calorieMin}-${calorieMax}${adjustment}`, function (error, response, body) {
        if (body) {
          body = JSON.parse(body)
          resolve(body.hits)
        } else {
          reject('Breakfast Error')
        }
      })
    })
    
  },
  getEggs: function (calorieMin, calorieMax, dietaryRestrictions) {
    const adjustment = dietaryRestrictions ? `&health=${dietaryRestrictions}` : '';
    return new Promise((resolve, reject)=>{
      request(`https://api.edamam.com/search?q=eggs&app_id=${config.EDAMAM_API_ID}&app_key=${config.EDAMAM_API_KEY}&from=0&to=12&calories=${calorieMin}-${calorieMax}${adjustment}`, function (error, response, body) {
       if (body) {
         body = JSON.parse(body)
         resolve(body.hits)
       } else {
          reject('Egg rejection')
        }
      })
    })
  },
  getYogurt: function (calorieMin, calorieMax, dietaryRestrictions) {
    const adjustment = dietaryRestrictions ? `&health=${dietaryRestrictions}` : '';
    return new Promise((resolve, reject)=>{
      request(`https://api.edamam.com/search?q=yogurt&app_id=${config.EDAMAM_API_ID}&app_key=${config.EDAMAM_API_KEY}&calories=${calorieMin}-${calorieMax}${adjustment}`, function (error, response, body) {
        if (body) {
          body = JSON.parse(body)
          resolve(body.hits)
        } else {
          reject('Yogurt rejection')
        }
      })
    })
  },

  getLunch: function (calorieMin, calorieMax, dietaryRestrictions) {
    let adjustment = dietaryRestrictions ? `&health=${dietaryRestrictions}` : '';
    return new Promise((resolve, reject)=>{
      request(`https://api.edamam.com/search?q=lunch&app_id=${config.EDAMAM_API_ID}&app_key=${config.EDAMAM_API_KEY}&from=0&to=30&calories=${calorieMin}-${calorieMax}${adjustment}`, function (error, response, body) {
        if(body){
          body = JSON.parse(body)
          resolve(body.hits)
        } else {
          reject('lunch rejection')
        }
    }) 
  })
  },

  getSteak: function (calorieMin, calorieMax, dietaryRestrictions) {
    const adjustment = dietaryRestrictions ? `&health=${dietaryRestrictions}` : '';
    return new Promise((resolve, reject)=>{
      request(`https://api.edamam.com/search?q=steak&app_id=${config.EDAMAM_API_ID}&app_key=${config.EDAMAM_API_KEY}&from=0&to=10&calories=${calorieMin}-${calorieMax}${adjustment}`, function (error, response, body) {
        if (body) {
          body = JSON.parse(body)
          resolve(body.hits)
        } else {
          reject('Steak rejection')
        }
      })
    })
  },

  getBeef: function (calorieMin, calorieMax, dietaryRestrictions) {
    const adjustment = dietaryRestrictions ? `&health=${dietaryRestrictions}` : '';
    return new Promise((resolve, reject)=>{
      request(`https://api.edamam.com/search?q=beef&app_id=${config.EDAMAM_API_ID}&app_key=${config.EDAMAM_API_KEY}&from=0&to=10&calories=${calorieMin}-${calorieMax}${adjustment}`, function (error, response, body) {
        if (body) {
          resolve(body.hits)
        } else {
          reject('Beef rejection')
        }
      })
    })
  },

  getChicken: function (calorieMin, calorieMax, dietaryRestrictions) {
    const adjustment = dietaryRestrictions ? `&health=${dietaryRestrictions}` : '';
    return new Promise((resolve, reject)=>{
      request(`https://api.edamam.com/search?q=chicken&app_id=${config.EDAMAM_API_ID}&app_key=${config.EDAMAM_API_KEY}&from=0&to=10&calories=${calorieMin}-${calorieMax}${adjustment}`, function (error, response, body) {
        if (body) {
          body = JSON.parse(body)
          resolve(body.hits)
        } else {
          reject('Chicken rejection')
        }
      })
    })
  },
  getFish: function (calorieMin, calorieMax, dietaryRestrictions, callback) {
    const adjustment = dietaryRestrictions ? `&health=${dietaryRestrictions}` : '';
    return new Promise((resolve, reject)=>{
      request(`https://api.edamam.com/search?q=fish&app_id=${config.EDAMAM_API_ID}&app_key=${config.EDAMAM_API_KEY}&from=0&to=10&calories=${calorieMin}-${calorieMax}${adjustment}`, function (error, response, body) {
        if (body) {
          resolve(body.hits)
        } else {
          reject('Fish rejection')
        }
      })
    })
  },

  narrowDown: function(array){
    let result = [];
    return new Promise((resolve, reject)=>{
      let i = 1;
      while(i <= 7){
        result.push(Math.floor(Math.random() * array.length));
        i++;
      }
      if(result.length === 7){
        resolve(result)
      } else {
        reject('narrowing rejection')
      }
    })
  },

  generateSeven: function(fromArray, toArray) {
    return new Promise((resolve, reject)=>{
      let randScreen = [];
      let randomNumbers = {};
      for (let i = 1; i <= 7; i++) {
        let gen = Math.floor(Math.random() * fromArray.length);
        randomNumbers[i] = randScreen.includes(gen) ? Math.floor(Math.random() * fromArray.length) : gen;
      }
      let randomNumberArray = Object.values(randomNumbers);
      randomNumberArray.forEach(randomNumber => {
        toArray.push(fromArray[randomNumber]);
        if(toArray.length === 7){
          resolve(toArray)
        } else {
          reject('Seven rejection')
        }
      });     
    })
  },
}