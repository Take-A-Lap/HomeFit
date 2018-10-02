import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingsDietaryRestrictionsComponent } from './settings-dietary-restrictions.component';

describe('SettingsDietaryRestrictionsComponent', () => {
  let component: SettingsDietaryRestrictionsComponent;
  let fixture: ComponentFixture<SettingsDietaryRestrictionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SettingsDietaryRestrictionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingsDietaryRestrictionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
