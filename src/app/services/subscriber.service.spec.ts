import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { SubscriberService } from './subscriber.service';

describe('SubscriberService', () => {
  let service: SubscriberService;
  let httpMock:HttpTestingController;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientTestingModule],
      providers:[SubscriberService]
    });
    service = TestBed.inject(SubscriberService);
    httpMock=TestBed.get(HttpTestingController);
  });

  describe('service check for idCheckUique',()=>{
    it("should use GET method",()=>{
      service.idCheckUnique("").subscribe();
      const req=httpMock.expectOne(service.testurl);
      expect(req.request.method).toBe('GET')
    })
  })

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
