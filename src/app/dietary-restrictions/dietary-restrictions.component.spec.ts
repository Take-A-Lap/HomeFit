import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DietaryRestrictionsComponent } from './dietary-restrictions.component';

describe('DietaryRestrictionsComponent', () => {
  let component: DietaryRestrictionsComponent;
  let fixture: ComponentFixture<DietaryRestrictionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DietaryRestrictionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DietaryRestrictionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
