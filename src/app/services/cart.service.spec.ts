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

  describe('test the services',()=>{
    it('should call updateCartDetail method',()=>{
      const data=
      {
        userId:"navaneetha@gmail",
        products: [
          {
            productId: "BN101",
            productName:"chocolate",
            productQty: 1
          },
        ]
    }
    service.updateCartDetail(data).subscribe();
    let req=httpMock.expectOne({method:"POST",url:service.updateCartUrl});
    expect(req.request.body).toEqual(data);
    });

    it('should call the deleteProduct',()=>{
      const data=
      {
        userId:"navaneetha@gmail",
        products: [
          {
            productId: "BN101",
            productName:"chocolate",
            productQty: 1
          },
        ]
      }
    service.deleteProduct(data).subscribe();
    let req=httpMock.expectOne({method:"POST",url:service.deleteProductUrl});
    expect(req.request.body).toEqual(data);
    })

    it('should call the placeOrder method',()=>{
      const data=
      {
        userId:"navaneetha@gmail",
        products: [
          {
            productId: "BN101",
            productName:"chocolate",
            productQty: 1
          },
        ]
      }
      service.placeOrder(data).subscribe();
      let req=httpMock.expectOne({method:"POST",url:service.placeOrderUrl});
      expect(req.request.body).toEqual(data)
    })

    // it('should call the deleteUserCart',()=>{
    //   const data=
    //   {
    //     userId:"navaneetha@gmail",
    //     products: [
    //       {
    //         productId: "BN101",
    //         productName:"chocolate",
    //         productQty: 1
    //       },
    //     ]
    //   }
   
    //   service.getImageDetail(data).subscribe();
    //   let req=httpMock.expectOne({method:"GET",url:`${service.getImageUrl}/${data.products}`});
    //   expect(req.request.body).toEqual(data);
    // })


  })

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
