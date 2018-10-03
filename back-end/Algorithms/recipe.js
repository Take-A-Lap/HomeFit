// const axios = require('axios');
var request = require('request');
const express = require('express');
const config = require('../../config.js');
const app = express();

module.exports = {
  getBreakfast: function (calorieMin, calorieMax, dietaryRestrictions, callback) {
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
    request(`https://api.edamam.com/search?q=lunch&app_id=${config.EDAMAM_API_ID}&app_key=${config.EDAMAM_API_KEY}&from=0&to=3&calories=591-722&health=alcohol-free`, function (error, response, body) {
      if (!error && response.statusCode == 200) {
        callback(body);
      }
    })
  },
    // breakfastPromise.then(()=>{
    //   let randScreen = [];
    //   let randomNumbers = {};
    //   for(let i = 1; i <= 7; i++){
    //     let gen = Math.floor(Math.random() * recipes.length);
    //     randomNumbers[i] = randScreen.includes(gen) ? Math.floor(Math.random() * recipes.length) : gen;
    //   }
    //   let randomNumberArray = Object.values(randomNumbers);
    //   randomNumberArray.forEach(randomNumber => {
    //     breakfastRecipes.push(recipes[randomNumber]);
    //   });
    //   callback(breakfastRecipes);
    // })
  
  getMeal: function (calorieMin, calorieMax, dietaryRestrictions, callback) {
    let recipes = [];
    let submittedRecipes = [];
    let mealPromise = new Promise(function (resolve, reject) {
      //api call to edamam returns appropriate recipes in an array 
      recipes = ''/*API call return*/;
      if(recipes.length > 0){
        resolve('Recipes received');
      } else {
        reject('Trouble receiving recipes');
      }
    })
    mealPromise.then(()=>{
      let randScreen = [];
      let randomNumbers = {};
      for(let i = 1; i <= 7; i++){
        let gen = Math.floor(Math.random() * recipes.length);
        randomNumbers[i] = randScreen.includes(gen) ? Math.floor(Math.random() * recipes.length) : gen;
      }
      let randomNumberArray = Object.values(randomNumbers);
      randomNumberArray.forEach(randomNumber => {
        mealRecipes.push(recipes[randomNumber]);
      });
      callback(mealRecipes);
    })
  }

}