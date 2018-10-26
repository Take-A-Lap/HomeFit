import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SavedDietComponent } from './saved-diet.component';

describe('SavedDietComponent', () => {
  let component: SavedDietComponent;
  let fixture: ComponentFixture<SavedDietComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SavedDietComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SavedDietComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
