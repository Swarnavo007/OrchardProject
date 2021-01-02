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
  describe('should call the API',()=>{
    
    it("should return data", () => {
      let result
      const data={
        productId: "V101",
        productName: "Pure Vanilla",
        productType: "classic",
        productPrice: 30,
        productDescription: "The classic which everyone likes, Made with vanilla essence",
        productStartDate: "2020-12-30T00:00:00.000Z",
        productEndDate: "2021-01-30T00:00:00.000Z",
        productImage: "http://sumit-icylicious-sep-20.herokuapp.com\\uploads/1609302771670.png", 
    }
      service.getProducts().subscribe(t => {
        result = t;
      });
      const req = httpMock.expectOne({
        method: "GET",
        url: service.newurl
      });
     
      req.flush([data]);
     
      expect(result[0]).toEqual(data);
    });

    it('should add the product to cart',()=>{
      const data={
        productId: "V101",
        productName: "Pure Vanilla",
        productType: "classic",
        productPrice: 30,
        productDescription: "The classic which everyone likes, Made with vanilla essence",
        productStartDate: "2020-12-30T00:00:00.000Z",
        productEndDate: "2021-01-30T00:00:00.000Z",
        productImage: "http://sumit-icylicious-sep-20.herokuapp.com\\uploads/1609302771670.png", 
    }
    service.createCart(data).subscribe();
    let req=httpMock.expectOne({method:"POST",url:service.setCartUrl});
    expect(req.request.body).toEqual(data);
    })
  })

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
