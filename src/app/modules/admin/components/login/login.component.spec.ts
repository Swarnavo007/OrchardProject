
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { LoginService } from 'src/app/services/login.service';
import { of } from 'rxjs';
import { LoginComponent } from './login.component';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

const data={
    "username":"admin",
    "password":"admin123"
}

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let service:LoginService;
  let mockdata=data;
  const routerSpy=jasmine.createSpyObj('Router',['navigate'])

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [RouterTestingModule],
      providers: [FormBuilder,{ provide: LoginService, useClass: LoginServiceStub }],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    service=TestBed.get(LoginService); //service added
    fixture.detectChanges();
  });

  // describe('check the login component',()=>{
  //   it('should call the login method',fakeAsync(()=>{
  //     let loginSpy=spyOn(service,'login').and.returnValue(of());
  //     // let subSpy=spyOn(service,adminLogin(mockdata),'subscribe');
  //     component.login();
  //     tick();
  //     expect(loginSpy).toHaveBeenCalled()
  //   }))
  //   // it('should call login method',()=>{
  //   //   spyOn(component,'login');
  //   //   e1=fixture.debugElement.query(By.css('button')).nativeElement;
  //   //   e1.click();
  //   //   expect(component.loginForm).toHaveBeenCalledTimes(1);
  //   // })
  // })
  
  


  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it ('check the working of the onChange button', ()=>
    {
      expect(component.submitButton).toBe(false, 'not clicked');
      component.onChange();
      expect(component.submitButton).toBe(true, 'clicked!');
    });
 
});

class LoginServiceStub{
  adminLogin(data:any){
    return true;
  }
  login(data:any){
    return true;
  }
}