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
  

  it('should be created', () => {
    expect(service).toBeTruthy();
  });


});
