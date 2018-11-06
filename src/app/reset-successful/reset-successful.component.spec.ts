import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResetSuccessfulComponent } from './reset-successful.component';

describe('ResetSuccessfulComponent', () => {
  let component: ResetSuccessfulComponent;
  let fixture: ComponentFixture<ResetSuccessfulComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResetSuccessfulComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResetSuccessfulComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
