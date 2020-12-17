import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { AddProductService } from './add-product.service';

describe('AddProductService', () => {
  let service: AddProductService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientTestingModule],
    });
    service = TestBed.inject(AddProductService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
