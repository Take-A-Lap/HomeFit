const db = require("../back-end/database/dbHelpers");


// chester-jester will be our test user
const name = "chester-tester",
email = "fakeEmail@gmail.com",
weight = 150,
num_push_ups = 5,
jog_dist = 10,
age = 25,
sex = "f",
height = 60,
squat_comf = 3,
goals = 2;

// test data ^^^^
  afterAll(()=>{
    //remove any changes to the database from testing it.
    db.removeUserByName(name);
  });
test('chester-tester should have been added to the database', () =>{
  return db.addNewUser(name, weight, num_push_ups, jog_dist, age, sex, height, squat_comf, goals, email).then(()=>{
    return db.getUserInfoByEmail(email);
  }).then((userArr)=>{
    expect(userArr[0].name).toBe(name);
  }).catch(err =>{
    console.error(err);
  })
});