// import { async, ComponentFixture, TestBed } from '@angular/core/testing';

// import { SignUpComponent } from './sign-up.component';

// describe('SignUpComponent', () => {
//   let component: SignUpComponent;
//   let fixture: ComponentFixture<SignUpComponent>;

//   beforeEach(async(() => {
//     TestBed.configureTestingModule({
//       declarations: [ SignUpComponent ]
//     })
//     .compileComponents();
//   }));

//   beforeEach(() => {
//     fixture = TestBed.createComponent(SignUpComponent);
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
