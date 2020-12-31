import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { ToastrModule } from 'ngx-toastr';
import { RegistrationService } from 'src/app/services/registration.service';

import { UpdatePasswordComponent } from './update-password.component';

describe('UpdatePasswordComponent', () => {
  let component: UpdatePasswordComponent;
  let fixture: ComponentFixture<UpdatePasswordComponent>;
   let service :RegistrationService
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UpdatePasswordComponent],
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        ToastrModule.forRoot(),
      ],
      providers: [FormBuilder],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdatePasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it ('check the working of the button', ()=>
  {
    expect(component.submitButton).toBe(false, 'not yet clicked');
    component.onSubmit();
    expect(component.submitButton).toBe(true, 'clicked!');
  })

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
