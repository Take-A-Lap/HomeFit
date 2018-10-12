// import { async, ComponentFixture, TestBed } from '@angular/core/testing';

// import { Component } from './workout.component';

// describe('StrengthComponent', () => {
//   let component: StrengthComponent;
//   let fixture: ComponentFixture<StrengthComponent>;

//   beforeEach(async(() => {
//     TestBed.configureTestingModule({
//       declarations: [ StrengthComponent ]
//     })
//     .compileComponents();
//   }));

//   beforeEach(() => {
//     fixture = TestBed.createComponent(StrengthComponent);
//     component = fixture.componentInstance;
//     fixture.detectChanges();
//   });

//   it('should create', () => {
//     expect(component).toBeTruthy();
//   });
// });

const sum = require("../../../sum");
test('adds 1 + 2 to equal 3', () => {
  expect(sum(1, 2)).toBe(3);
});
