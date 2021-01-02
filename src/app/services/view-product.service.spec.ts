import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ViewProductService } from './view-product.service';

describe('ViewProductService', () => {
  let service: ViewProductService;
  let httpMock:HttpTestingController;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientTestingModule],
      providers:[ViewProductService]
    });
    service = TestBed.inject(ViewProductService);
    httpMock=TestBed.get(HttpTestingController);
  });
  describe('service check',()=>{
    it("should use GET method",()=>{
      service.getProducts().subscribe();
      const req=httpMock.expectOne(service.url);
      expect(req.request.method).toBe('GET')
    })
  })

  describe('should be call the API',()=>{
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
        url: service.url
      });
      req.flush([data]);
     
      expect(result[0]).toEqual(data);
    });

    it('should be update the products',()=>{
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
    service.updateProducts(data).subscribe();
    let req=httpMock.expectOne({method:"PATCH",url:`https://sumit-icylicious-sep-20.herokuapp.com/product`});
    expect(req.request.body).toEqual(data);
    })

    it('should call deleteProduct by Id',()=>{
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
    service.deleteProduct(data).subscribe();
    let req=httpMock.expectOne({method:"POST",url:`https://sumit-icylicious-sep-20.herokuapp.com/deleteproduct`});
    expect(req.request.body).toEqual(data);
    })
  })
  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
