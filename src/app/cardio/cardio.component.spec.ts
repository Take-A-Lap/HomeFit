// import { async, ComponentFixture, TestBed } from '@angular/core/testing';

// import { CardioComponent } from './cardio.component';

// describe('CardioComponent', () => {
//   let component: CardioComponent;
//   let fixture: ComponentFixture<CardioComponent>;

//   beforeEach(async(() => {
//     TestBed.configureTestingModule({
//       declarations: [ CardioComponent ]
//     })
//     .compileComponents();
//   }));

//   beforeEach(() => {
//     fixture = TestBed.createComponent(CardioComponent);
//     component = fixture.componentInstance;
//     fixture.detectChanges();
//   });

//   it('should create', () => {
//     expect(component).toBeTruthy();
//   });
// });

// const sum = require("../../../sum");
test('adds 1 + 2 to equal 3', () => {
  expect(sum(1, 2)).toBe(3);
});