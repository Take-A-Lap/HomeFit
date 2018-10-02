const getBreakfast = function (calorieMin, calorieMax, dietaryRestrictions) {
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
    return breakfastRecipes;
  })
}