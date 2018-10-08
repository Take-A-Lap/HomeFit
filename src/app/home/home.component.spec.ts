// import { async, ComponentFixture, TestBed } from '@angular/core/testing';

// import { HomeComponent } from './home.component';

// describe('HomeComponent', () => {
//   let component: HomeComponent;
//   let fixture: ComponentFixture<HomeComponent>;

//   beforeEach(async(() => {
//     TestBed.configureTestingModule({
//       declarations: [ HomeComponent ]
//     })
//     .compileComponents();
//   }));

//   beforeEach(() => {
//     fixture = TestBed.createComponent(HomeComponent);
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
