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
  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
