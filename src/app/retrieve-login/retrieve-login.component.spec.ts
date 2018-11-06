import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RetrieveLoginComponent } from './retrieve-login.component';

describe('RetrieveLoginComponent', () => {
  let component: RetrieveLoginComponent;
  let fixture: ComponentFixture<RetrieveLoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RetrieveLoginComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RetrieveLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
