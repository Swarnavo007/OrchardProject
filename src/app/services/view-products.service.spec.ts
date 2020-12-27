import { TestBed } from '@angular/core/testing';

import { ViewProductsService } from './view-products.service';

describe('ViewProductsService', () => {
  let service: ViewProductsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ViewProductsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
