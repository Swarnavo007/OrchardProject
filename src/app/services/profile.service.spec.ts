import { HttpClientTestingModule,HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { ProfileService } from './profile.service';

describe('ProfileService', () => {
  let service: ProfileService;
  let httpMock:HttpTestingController;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientTestingModule],
      providers:[ProfileService]
    });
    service = TestBed.inject(ProfileService);
    httpMock=TestBed.get(HttpTestingController);
  });

  describe('service check for profile',()=>{
    it("should use GET method",()=>{
      service.getOrders().subscribe();
      const req=httpMock.expectOne(service.url);
      expect(req.request.method).toBe('GET')
    })
  })

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
