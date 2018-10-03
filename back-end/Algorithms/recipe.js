module.exports = {
  getBreakfast: function (calorieMin, calorieMax, dietaryRestrictions, callback) {
    let recipes = [];
    let breakfastRecipes = [];
    let breakfastPromise = new Promise(function (resolve, reject) {
      //api call to edamam returns appropriate recipes in an array 
      recipes = ''/*API call return*/;
      if(recipes.length > 0){
        resolve('Recipes received');
      } else {
        reject('Trouble receiving recipes');
      }
    })
    breakfastPromise.then(()=>{
      let randScreen = [];
      let randomNumbers = {};
      for(let i = 1; i <= 7; i++){
        let gen = Math.floor(Math.random() * recipes.length);
        randomNumbers[i] = randScreen.includes(gen) ? Math.floor(Math.random() * recipes.length) : gen;
      }
      let randomNumberArray = Object.values(randomNumbers);
      randomNumberArray.forEach(randomNumber => {
        breakfastRecipes.push(recipes[randomNumber]);
      });
      callback(breakfastRecipes);
    })
  },
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