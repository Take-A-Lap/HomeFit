const db = require('../back-end/database/dbHelpers');

test('testing our test', ()=>{
  expect.assertions(1);
  return db.getUserById(1).then(userArr => {
    expect(userArr[0].id).toBe(1);
  }).catch(err=>{
    console.error(err);
  })
})