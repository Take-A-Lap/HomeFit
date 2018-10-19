// const axios = require('axios');
// var Promise = require('bluebird');
const bluebird = require('bluebird');
var request = bluebird.promisify(require('request'));
const express = require('express');
const config = require('../../config.js');
const app = express();
const axios = require('axios');

const getMeal = function (meat, calorieMin, calorieMax, dietaryRestrictions) {
  const adjustment = dietaryRestrictions ? `&health=${dietaryRestrictions}` : '';
  return axios.get(`https://api.edamam.com/search?q=${meat}&app_id=${config.EDAMAM_API_ID}&app_key=${config.EDAMAM_API_KEY}&from=0&to=20&calories=${calorieMin}-${calorieMax}${adjustment}`)
    .then(recipes => recipes.data.hits)
};
const narrowDown = function (array) {
  let randomNumberArray = [];
  const meals = [];
  return new Promise((resolve, reject) => {
    let i = 1;
    while (i <= 7) {
      randomNumberArray.push(Math.floor(Math.random() * array.length));
      i++;
    }
    randomNumberArray.map(num => meals.push(array[num]), [])
    if (meals.length === 7) {
      resolve(meals)
    } else {
      reject('narrowing rejection')
    }
  })
}

module.exports = {

  getBreakfast: (calorieMin, calorieMax, dietaryRestrictions)=>{
    const meats = ['eggs', 'yogurt', 'breakfast']
    return bluebird.map(meats, meat => getMeal(meat, 0, 1000))
      .then(meals => narrowDown(meals.reduce((all, curr) => all.concat(curr), [])))
  },
  getLunch: (calorieMin, calorieMax, dietaryRestrictions)=> {
    return getMeal('lunch', 0, 1000)
      .then(meals => narrowDown(meals.reduce((all, curr) => all.concat(curr), [])))
  },
  getDinner: (calorieMin, calorieMax, dietaryRestrictions)=>{
    const meats = ['steak', 'chicken', 'beef', 'fish']
    return bluebird.map(meats, meat=>getMeal(meat, 0, 1000))
      .then(meals => narrowDown(meals.reduce((all, curr)=> all.concat(curr), [])))
  },

  setCalories: (user, today)=>{
    
    if(user){

    }
  }
}