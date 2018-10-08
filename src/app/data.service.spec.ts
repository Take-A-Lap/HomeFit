// import { TestBed } from '@angular/core/testing';

// import { DataService } from './data.service';

// describe('DataService', () => {
//   beforeEach(() => TestBed.configureTestingModule({}));

//   it('should be created', () => {
//     const service: DataService = TestBed.get(DataService);
//     expect(service).toBeTruthy();
//   });
// });

const sum = require("../../../sum");
test('adds 1 + 2 to equal 3', () => {
  expect(sum(1, 2)).toBe(3);
});
