import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { getTestBed, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { AddProductService } from './add-product.service';

describe('AddProductService', () => {
  let service: AddProductService;
  let httpMock: HttpTestingController
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientTestingModule],
    });
    service = TestBed.inject(AddProductService);
    httpMock=getTestBed().get(HttpTestingController)
  });

  // afterEach(()=>{
  //   httpMock.verify();
  // })
   describe('Service checking',()=>{
      it('should call POST method',()=>{
        let data={
            productId:"CN101",
            productName:"chocolate", 
            productType:"classic",
            productPrice:40,
            productDescription:"Made with dark chocolate",
            productStarttDate:"2020-12-31T00:00:00.000+00:00",
            productEndDate:"2020-12-31T00:00:00.000+00:00",
            productImage:"http://sumit-icylicious-sep-20.herokuapp.com/1609304175917.jpg"
        }
        service.create(data).subscribe();
        let req=httpMock.expectOne({method:"POST",url:service._url});
        expect(req.request.body).toEqual(data);

      })

      // it('should called the idCheck method',()=>{
      //   let data={
      //     productId:"CN101",
      //   }
      //   service.idCheckUnique(data).subscribe();
      //   let req=httpMock.expectOne({method:"GET",url:`https://sumit-icylicious-sep-20.herokuapp.com/id?id=CN01`})
      //   expect(req.request.body).toEqual(data);
      // })
   })
  

  it('should be created', () => {
    expect(service).toBeTruthy();
  });


});
