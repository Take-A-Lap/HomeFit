// import { TestBed, async } from '@angular/core/testing';
// import { AppComponent } from './app.component';
// describe('AppComponent', () => {
//   beforeEach(async(() => {
//     TestBed.configureTestingModule({
//       declarations: [
//         AppComponent
//       ],
//     }).compileComponents();
//   }));
//   it('should create the app', async(() => {
//     const fixture = TestBed.createComponent(AppComponent);
//     const app = fixture.debugElement.componentInstance;
//     expect(app).toBeTruthy();
//   }));
//   it(`should have as title 'Take a Lap'`, async(() => {
//     const fixture = TestBed.createComponent(AppComponent);
//     const app = fixture.debugElement.componentInstance;
//     expect(app.title).toEqual('Take a Lap');
//   }));
//   it('should render title in a h1 tag', async(() => {
//     const fixture = TestBed.createComponent(AppComponent);
//     fixture.detectChanges();
//     const compiled = fixture.debugElement.nativeElement;
//     expect(compiled.querySelector('h1').textContent).toContain('Terrible, Take a Lap!');
//   }));
// });

let sum = require("../../sum");
test('adds 1 + 2 to equal 3', () => {
  expect(sum(1, 2)).toBe(3);
});
