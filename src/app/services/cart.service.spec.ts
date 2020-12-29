import { HttpClientTestingModule,HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { CartService } from './cart.service';

describe('CartService', () => {
  let service: CartService;
  let httpMock:HttpTestingController;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientTestingModule],
      providers:[CartService]
    });
    service = TestBed.inject(CartService);
    httpMock=TestBed.get(HttpTestingController);
  });

  describe('test get service for cart',()=>{
    it("should use get method",()=>{
      service.getImageDetail("").subscribe();
      const req=httpMock.expectOne(service.testurl);
      expect(req.request.method).toBe('GET')
    })
  })

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
