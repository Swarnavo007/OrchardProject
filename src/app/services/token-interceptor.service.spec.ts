import { HttpTestingController } from '@angular/common/http/testing';
import { inject, TestBed } from '@angular/core/testing';

import { TokenInterceptorService } from './token-interceptor.service';

describe('TokenInterceptorService', () => {
  let service: TokenInterceptorService;
 let httpMock:HttpTestingController;
  beforeEach(() => {
    TestBed.configureTestingModule({

    });
    service = TestBed.inject(TokenInterceptorService);
   
  });

  
   
  it('should be created', () => {
    expect(service).toBeTruthy();
  });

});
