import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { AuthstateGuard } from './authstate.guard';

describe('AuthstateGuard', () => {
  let guard: AuthstateGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule],
    });
    guard = TestBed.inject(AuthstateGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
