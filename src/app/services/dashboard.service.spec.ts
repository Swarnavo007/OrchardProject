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
  // describe('service check',()=>{
  //   it("should use GET method",()=>{
  //     service.getEmailSubscribers().subscribe();
  //     const req=httpMock.expectOne(service.url);
  //     expect(req.request.method).toBe('GET')

  //   })
  // })

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
