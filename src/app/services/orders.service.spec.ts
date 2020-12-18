import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { OrdersService } from './orders.service';

describe('OrdersService', () => {
  let service: OrdersService;
  let httpMock:HttpTestingController;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientTestingModule],
      providers:[OrdersService]
    });
    service = TestBed.inject(OrdersService);
    httpMock=TestBed.get(HttpTestingController)
  });
  describe('Service Check',()=>{
    it('should call GET method',()=>{
       service.getOrdersList().subscribe();
       let req=httpMock.expectOne(service.url);
       expect(req.request.method).toBe('GET');
    })

  })
  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
