// import { TestBed } from '@angular/core/testing';

// import { WeatherService } from './weather.service';

// describe('WeatherService', () => {
//   beforeEach(() => TestBed.configureTestingModule({}));

//   it('should be created', () => {
//     const service: WeatherService = TestBed.get(WeatherService);
//     expect(service).toBeTruthy();
//   });
// });

const sum = require("../../sum");
test('adds 1 + 2 to equal 3', () => {
  expect(sum(1, 2)).toBe(3);
});
