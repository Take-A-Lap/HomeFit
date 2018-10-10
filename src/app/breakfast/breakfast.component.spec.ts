// import { async, ComponentFixture, TestBed } from '@angular/core/testing';

// import { BreakfastComponent } from './breakfast.component';

// describe('BreakfastComponent', () => {
//   let component: BreakfastComponent;
//   let fixture: ComponentFixture<BreakfastComponent>;

//   beforeEach(async(() => {
//     TestBed.configureTestingModule({
//       declarations: [ BreakfastComponent ]
//     })
//     .compileComponents();
//   }));

//   beforeEach(() => {
//     fixture = TestBed.createComponent(BreakfastComponent);
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
