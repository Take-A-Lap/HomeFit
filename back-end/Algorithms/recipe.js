// const axios = require('axios');
// var Promise = require('bluebird');
const bluebird = require('bluebird');
var request = bluebird.promisify(require('request'));
const express = require('express');
const config = require('../../config.js');
const app = express();
const axios = require('axios');

const getMeal = function (meat, calorieMin, calorieMax, dietaryRestrictions) {
  const adjustment = dietaryRestrictions ? dietaryRestrictions.map(restriction => `&${restriction.type}=${restriction.name}`).reduce((acc, curr) => acc.concat(curr), '') : '';
  console.log([meat, adjustment])
  return axios.get(`https://api.edamam.com/search?q=${meat}&app_id=${config.EDAMAM_API_ID}&app_key=${config.EDAMAM_API_KEY}&from=0&to=30&calories=${calorieMin}-${calorieMax}${adjustment}`)
    .then(recipes => recipes.data.hits)
};
const narrowDown = function (array) {
  let randomNumberArray = [];
  const meals = [];
  return new Promise((resolve, reject) => {
    let i = 1;
    while (i <= 12) {
      randomNumberArray.push(Math.floor(Math.random() * array.length));
      i++;
    }
    randomNumberArray.map(num => meals.push(array[num]), [])
    if (meals.length === 12) {
      resolve(meals)
    } else {
      reject('narrowing rejection')
    }
  })
}

module.exports = {
  getBreakfast: (calorieMin, calorieMax, dietaryRestrictions)=>{
    const meats = ['eggs', 'yogurt', 'breakfast']
    return bluebird.map(meats, meat => getMeal(meat, calorieMin, calorieMax))
      .then(meals => narrowDown(meals.reduce((all, curr) => all.concat(curr), [])))
  },
  getLunch: (calorieMin, calorieMax, dietaryRestrictions)=> {
    const meats = ['taco', 'sandwich', 'salad']
    return bluebird.map(meats, meat=> getMeal(meat, calorieMin, calorieMax))
      .then(meals => narrowDown(meals.reduce((all, curr) => all.concat(curr), [])))
  },
  getDinner: (calorieMin, calorieMax, dietaryRestrictions) => {
    const meats = ['steak', 'chicken', 'beef', 'fish', 'pork', 'ham', 'tuna', 'salad']
    return bluebird.map(meats, meat=>getMeal(meat, calorieMin, calorieMax, dietaryRestrictions))
      .then(meals => narrowDown(meals.reduce((all, curr)=> all.concat(curr), [])))
  },
  setCalories: (user, completes, today)=>{
    let calories = {};
    user = JSON.parse(user);
    completes = parseInt(completes);
    if(typeof today === 'string'){
      today = parseInt(today)
    }
    return new Promise((resolve,reject)=>{
      if (user.sex === 'm'){
        if(user.goals === 1){
          calories = {
            breakfastMin: 0,
            breakfastMax: 700,
            lunchMin: 0,
            lunchMax: 500,
            dinnerMin: 0,
            dinnerMax: 400
          }
        } if(user.goals === 2){
          calories = {
            breakfastMin: 0,
            breakfastMax: 975,
            lunchMin: 0,
            lunchMax: 700,
            dinnerMin: 0,
            dinnerMax: 550
        }
      } else if(user.goals === 3){
        calories = {
          breakfastMin: 0,
          breakfastMax: 1225,
          lunchMin: 0,
          lunchMax: 875,
          dinnerMin: 0,
          dinnerMax: 700
        }
      }
    } else if (user.sex === 'f'){
      if (user.goals === 1) {
        calories = {
          breakfastMin: 0,
          breakfastMax: 550,
          lunchMin: 0,
          lunchMax: 400,
          dinnerMin: 0,
          dinnerMax: 300
        }
      }
      if (user.goals === 2) {
        calories = {
          breakfastMin: 0,
          breakfastMax: 750,
          lunchMin: 0,
          lunchMax: 550,
          dinnerMin: 0,
          dinnerMax: 425
        }
      } else if (user.goals === 3) {
        calories = {
          breakfastMin: 0,
          breakfastMax: 1050,
          lunchMin: 0,
          lunchMax: 750,
          dinnerMin: 0,
          dinnerMax: 600
        }
      }
    }
    if(Array.isArray(completes)){
      if(completes.includes(today)){
        calories.breakfastMax = calories.breakfastMax + 100;
        calories.lunchMax = calories.lunchMax + 150;
        calories.dinnerMax = calories.dinnerMax + 100;
      }
    } else if(completes === today){
      calories.breakfastMax = calories.breakfastMax + 100;
      calories.lunchMax = calories.lunchMax + 150;
      calories.dinnerMax = calories.dinnerMax + 100;
    }
    if(user){
      resolve(calories)
    }else {
      reject('calorie rejection')
    }
    
    })
  },
  testGet: ()=>{
    return getMeal('steak', 0, 1000, '')
  }
}