import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { DashboardService } from './dashboard.service';

describe('DashboardService', () => {
  let service: DashboardService;
  let httpMock:HttpTestingController
  
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientTestingModule],
      providers:[DashboardService]
    });
    service = TestBed.inject(DashboardService);
    httpMock=TestBed.get(HttpTestingController);
  });
  describe('service check',()=>{
    it("should call products GET method",()=>{
      service.getProducts().subscribe();
      const req=httpMock.expectOne(service.url);
      expect(req.request.method).toBe('GET')
    })
    it('should call emailSubscibers GET methods',()=>{
      service.getEmailSubscribers().subscribe();
      const req=httpMock.expectOne(service.subscibersUrl);
      expect(req.request.method).toBe('GET');
    })

    it('should call getOrders Method',()=>{
      service.getOrders().subscribe();
      const req=httpMock.expectOne(service.ordersUrl);
      expect(req.request.method).toBe('GET')
    })

    it('should call getUsers Method',()=>{
      service.getUsersCount().subscribe();
      const req=httpMock.expectOne(service.usersUrl);
      expect(req.request.method).toBe('GET')
    })

  })

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
