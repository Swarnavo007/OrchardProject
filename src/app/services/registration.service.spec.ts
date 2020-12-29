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

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
