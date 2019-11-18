import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginEmailPasswordComponent } from './login-email-password.component';

describe('LoginEmailPasswordComponent', () => {
  let component: LoginEmailPasswordComponent;
  let fixture: ComponentFixture<LoginEmailPasswordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginEmailPasswordComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginEmailPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
