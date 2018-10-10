// import { async, ComponentFixture, TestBed } from '@angular/core/testing';

// import { ErrorComponent } from './error.component';

// describe('ErrorComponent', () => {
//   let component: ErrorComponent;
//   let fixture: ComponentFixture<ErrorComponent>;

//   beforeEach(async(() => {
//     TestBed.configureTestingModule({
//       declarations: [ ErrorComponent ]
//     })
//     .compileComponents();
//   }));

//   beforeEach(() => {
//     fixture = TestBed.createComponent(ErrorComponent);
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
