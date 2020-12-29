import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { ViewProductsService } from './view-products.service';

describe('ViewProductsService', () => {
  let service: ViewProductsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientTestingModule],
    });
    service = TestBed.inject(ViewProductsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
