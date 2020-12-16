import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ViewProductService } from './view-product.service';

describe('ViewProductService', () => {
  let service: ViewProductService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientTestingModule],
    });
    service = TestBed.inject(ViewProductService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
