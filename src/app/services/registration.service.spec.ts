import { HttpClientTestingModule,HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { RegistrationService } from './registration.service';

describe('RegistrationService', () => {
  let service: RegistrationService;
  let httpMock:HttpTestingController;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientTestingModule],
      providers:[RegistrationService]
    });
    service = TestBed.inject(RegistrationService);
    httpMock=TestBed.get(HttpTestingController);
  });

  describe('service check for emailCheckUnique',()=>{
    it("should use GET method",()=>{
      service.emailCheckUnique("").subscribe();
      const req=httpMock.expectOne(service.testingUrl);
      expect(req.request.method).toBe('GET')
    })
  })

  describe('should call the api',()=>{
    it('should create the user',()=>{
      const data=
      {
        name:"xxx",
        email:"ayush@mindtree.com",
        phone:12356,
        password:"$2b$10$aib2SLTGC44FxjC0/JF6RuFb2pMUXoHRlsAQpSoIfCVb22sOris0W",
        question:"hello how are yous",
        answer:"fine howt you ok"
    }
    service.register(data).subscribe();
    let req=httpMock.expectOne({method:"POST",url:service.registerUrl});
    expect(req.request.body).toEqual(data);
    });
    it('should reset the password of the user',()=>{
      const data={
        email:"ayush@mindtree.com",
        question:"hello how are yous",
        answer:"fine howt you ok"
      }
      service.reset(data).subscribe();
      let req=httpMock.expectOne({method:"POST",url:service.resetUrl});
      expect(req.request.body).toEqual(data);
    });
    it('should update the user profile',()=>{
      const data={
        name:"xxx",
        email:"ayush@mindtree.com",
        phone:12356,
        question:"hello how are yous",
        answer:"fine howt you ok"
      }
      service.updateUserProfile(data).subscribe();
      let req=httpMock.expectOne({method:"POST",url:service.updateProfile});
      expect(req.request.body).toEqual(data);
    })
    it('should update the password of the user',()=>{
      const data={
        email:"ayush@mindtree.com",
        password:"hello@123",
      }
      service.updatePassword(data).subscribe();
      let req=httpMock.expectOne({method:"PATCH",url:service.updateUrl});
      expect(req.request.body).toEqual(data);
    })
    
  })
 
  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
