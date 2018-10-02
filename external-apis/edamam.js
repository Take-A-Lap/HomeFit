const axios = require(axios);
const { Edamam_id } = require('config.js');
const { Edamam_KEY } = require('config.js');

module.exports.getBreakfast = (calorieMin, calorieMax, dietaryRestrictions, callback) => {

    const params = {
      q:eggs|yogurt,
      calories: `${calorieMin}-${calorieMax}`,
      app_id: Edamam_id,
      app_key: Edamam_KEY,
    }

    let endpoint = 'https://api.edamam.com/search'
    dietaryRestrictions.forEach(restriction => {
      endpoint += `Health=${restriction}&`
    })

    endpoint = endpoint.slice(0, endpoint.length-1);

    // make get request to edamam recipe api and add the restrictions, and calorie as params
    axios.get(endpoint, params)
      // on return of the request
      .then((response) => {
        // create an array for breakfast recipes
        const breakfastRecipes = [];
        // get all the recipes from the request
        const recipes = response.hits;
        // let randomNumbers = {};
        // create an array to store random numbers
        let randNums = [];
        // while the breakfast recipes array has less than 7 things in it 
        while (breakfastRecipes.length < 7) {
          // create a random number between 0 and the total number of recipes
          randNum = Math.floor(Math.random() * recipes.length);
          // if it is a unique random number
          if (!randNums.includes(randNum)) {
            // push the recipes array at the random number into the breakfast recipes array
            breakfastRecipes.push(recipes[randNum]);
            // then push the random number in the random numbers array so we don't duplicate that recipe later 
            randNums.push(randNum);
          }
        }
        // call the callback on the now populated breakfast recipes array
        callback(breakfastRecipes);
      })
      .catch(error => {
        console.log(error);
      });
}

module.exports.getLunchOrDinner = (calorieMin, calorieMax, dietaryRestrictions, callback) => {
  // make an object for the params to pass to the get request
  const params = {
    q:eggs|yogurt,
    calories: `${calorieMin}-${calorieMax}`,
    app_id: Edamam_id,
    app_key: Edamam_KEY,
  }

  let endpoint = 'https://api.edamam.com/search'
  dietaryRestrictions.forEach(restriction => {
    endpoint += `Health=${restriction}&`
  })

  endpoint = endpoint.slice(0, endpoint.length-1);

  // make get request to edamam recipe api and add the restrictions, and calorie as params
  axios.get(endpoint, params)
    // on return of the request
    .then((response) => {
      // create an array for breakfast recipes
      const lunchOrDinnerRecipes = [];
      // get all the recipes from the request
      const recipes = response.hits;
      // let randomNumbers = {};
      // create an array to store random numbers
      let randNums = [];
      // while the lunchOrDinner recipes array has less than 7 things in it 
      while (lunchOrDinnerRecipes.length < 7) {
        // create a random number between 0 and the total number of recipes
        randNum = Math.floor(Math.random() * recipes.length);
        // if it is a unique random number
        if (!randNums.includes(randNum)) {
          // push the recipes array at the random number into the lunchOrDinner recipes array
          lunchOrDinnerRecipes.push(recipes[randNum]);
          // then push the random number in the random numbers array so we don't duplicate that recipe later 
          randNums.push(randNum);
        }
      }
      // call the callback on the now populated breakfast recipes array
      callback(lunchOrDinnerRecipes);
    })
    .catch(error => {
      console.log(error);
    });
}

  // const getBreakfast = function (calorieMin, calorieMax, dietaryRestrictions) {
  // //   let recipes = [];
  // //   let breakfastRecipes = [];
  //   let breakfastPromise = new Promise(function (resolve, reject) {
  //     //api call to edamam returns appropriate recipes in an array
  //     recipes = ''/*API call return*/;
  //     if(recipes.length > 0) {
  //       resolve('Recipes received');
  //     } else {
  //       reject('Trouble receiving recipes');
  //     }
  //   });
  //   breakfastPromise.then(()=>{
  //     let randomNumbers = {};
  //     for(let i = 1; i <= 7; i++){
  //       randomNumbers[i] = Math.floor(Math.random() * recipes.length);
  //     }
  //     let randomNumberArray = Object.values(randomNumbers);
  //     randomNumberArray.forEach(randomNumber => {
  //       breakfastRecipes.push(recipes[randomNumber]);
  //     });
  //     return breakfastRecipes;
  //   });
  // }