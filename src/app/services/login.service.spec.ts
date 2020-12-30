import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { fakeAsync, TestBed, tick, inject } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { LoginComponent } from '../modules/admin/components/login/login.component';
import { UserComponent } from '../modules/user/user.component';

import { LoginService } from './login.service';

describe('LoginService', () => {
  let service: LoginService;
  let httpMock:HttpTestingController

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientTestingModule],
      providers: [LoginService],
    });
    service = TestBed.inject(LoginService);
    httpMock=TestBed.get(HttpTestingController);
    
  });
  
  it('should call Post API to create a new admin',()=>{
    const dummyData = {
      username:"admin",
      password:"admin123"
    }
    service.adminLogin(dummyData).subscribe();
    let req=httpMock.expectOne({method:"POST",url:service.loginUrl})
    expect(req.request.body).toEqual(dummyData);
  })

  it('should call Post API to create a login admin',()=>{
    const dummyData = {
      username:"admin",
      password:"admin123"
    }
    service.login(dummyData).subscribe();
    let req=httpMock.expectOne({method:"POST",url:service._url})
    expect(req.request.body).toEqual(dummyData);
  })

 

 
  // it('should be login correctly',fakeAsync(()=>{
  //   const url='https://icylicious.herokuapp.com/adminlogin';
  //   const responceObj={
  //     success:true,
  //     message:'login was successful'
  //   };

  //   let response=null;

  // }))
  // it(
  //   'should perform login correctly',
  //   fakeAsync(
  //     inject(
  //       [LoginService, HttpTestingController],
  //       (authService: LoginService, backend: HttpTestingController) => {

  //         // Set up
  //         const url = 'https://icylicious.herokuapp.com/adminlogin';
  //         const responseObject = {
  //           success: true,
  //           message: 'login was successful'
  //         };
  //         // const user = new User('admin', 'testpassword');
  //         let data={
  //           username:"admin",
  //           password:"admin123"
  //         }
  //         let response = null;
  //         // End Setup

  //         authService.login(data).subscribe(
  //           (receivedResponse: any) => {
  //             response = receivedResponse;
  //           },
  //           (error: any) => {}
  //         );

  //         const requestWrapper = backend.expectOne({url: 'https://icylicious.herokuapp.com/adminlogin'});
  //         requestWrapper.flush(responseObject);

  //         tick();

  //         expect(requestWrapper.request.method).toEqual('POST');
  //         expect(response.body).toEqual(undefined);
  //         expect(response.status).toBe(undefined);
  //       }
  //     )
  //   )
  // );
  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
