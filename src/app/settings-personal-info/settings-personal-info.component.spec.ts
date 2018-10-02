import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingsPersonalInfoComponent } from './settings-personal-info.component';

describe('SettingsPersonalInfoComponent', () => {
  let component: SettingsPersonalInfoComponent;
  let fixture: ComponentFixture<SettingsPersonalInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SettingsPersonalInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingsPersonalInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
