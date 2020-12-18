import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { SubscribersService } from './subscribers.service';

describe('SubscribersService', () => {
  let service: SubscribersService;
  let httpMock:HttpTestingController;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientTestingModule],
      providers:[SubscribersService]
    });
    service = TestBed.inject(SubscribersService);
    httpMock=TestBed.get(HttpTestingController);
  });

  describe('service check',()=>{
    it("should use GET method",()=>{
      service. getSubscibers().subscribe();
      const req=httpMock.expectOne(service.url);
      expect(req.request.method).toBe('GET')
    })
  })
  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
