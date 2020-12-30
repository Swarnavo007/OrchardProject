
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { ProfileService } from './profile.service';

describe('ProfileService', () => {
  let service: ProfileService;
  let httpMock:HttpTestingController
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientTestingModule],
      providers:[ProfileService]
    });
    service = TestBed.inject(ProfileService);
    httpMock=TestBed.get(HttpTestingController)
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  describe("service check",()=>{
    it("should contain the get method",()=>{
      service.getOrders().subscribe();
      const req=httpMock.expectOne(service.url);
      expect(req.request.method).toBe('GET');
    });

    it('should get the orders', () => {
      const dummyData = 
        {
          "status": "Delivered",
          "_id": "5fe9a62facc30d0017cfab47",
          "userId": "ayush.jaiswal47.aj@gmail.com",
          "itemPurchased": [
              {
                  "_id": "5fe9a627acc30d0017cfab44",
                  "productQty": 1,
                  "productId": "CH10",
                  "productName": "chocolat",
                  "productPrice": 1000
              },
              {
                  "_id": "5fe9a627acc30d0017cfab45",
                  "productQty": 1,
                  "productId": "NAVA",
                  "productName": "kjfhxk",
                  "productPrice": 90
              },
              {
                  "_id": "5fe9a629acc30d0017cfab46",
                  "productQty": 1,
                  "productId": "CH12",
                  "productName": "vanilla",
                  "productPrice": 56
              }
          ],
          "totalPrice": 1146,
          "orderDate": "2020-12-28T09:32:31.033Z",
          "__v": 0
      }
      
      service.getOrders().subscribe(res => {
        expect(res).toEqual(dummyData);
      });
  
      const request = httpMock.expectOne(`https://sumit-icylicious-sep-20.herokuapp.com/getOrders`);
      expect(request.request.method).toBe('GET');
      request.flush(dummyData);
    });
  })
});