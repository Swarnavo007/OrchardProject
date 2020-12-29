import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { ViewProductsService } from './view-products.service';

describe('UserViewProductsService', () => {
  let service: ViewProductsService;
  let httpMock:HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientTestingModule],
      providers:[ViewProductsService]
    });
    service = TestBed.inject(ViewProductsService);
    httpMock=TestBed.get(HttpTestingController);
  });

  describe('service check',()=>{
    it("should use GET method",()=>{
      service.getProducts().subscribe();
      const req=httpMock.expectOne(service.newurl);
      expect(req.request.method).toBe('GET')
    })
  })

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
