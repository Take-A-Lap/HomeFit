// import { async, ComponentFixture, TestBed } from '@angular/core/testing';

// import { SettingsComponent } from './settings.component';

// describe('SettingsComponent', () => {
//   let component: SettingsComponent;
//   let fixture: ComponentFixture<SettingsComponent>;

//   beforeEach(async(() => {
//     TestBed.configureTestingModule({
//       declarations: [ SettingsComponent ]
//     })
//     .compileComponents();
//   }));

//   beforeEach(() => {
//     fixture = TestBed.createComponent(SettingsComponent);
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
