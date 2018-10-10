// import { async, ComponentFixture, TestBed } from '@angular/core/testing';

// import { MealsComponent } from './meals.component';

// describe('MealsComponent', () => {
//   let component: MealsComponent;
//   let fixture: ComponentFixture<MealsComponent>;

//   beforeEach(async(() => {
//     TestBed.configureTestingModule({
//       declarations: [ MealsComponent ]
//     })
//     .compileComponents();
//   }));

//   beforeEach(() => {
//     fixture = TestBed.createComponent(MealsComponent);
//     component = fixture.componentInstance;
//     fixture.detectChanges();
//   });

//   it('should create', () => {
//     expect(component).toBeTruthy();
//   });
// });

sum = require("../../../sum");
test('adds 1 + 2 to equal 3', () => {
  expect(sum(1, 2)).toBe(3);
});
