import { TestBed } from '@angular/core/testing';

import { AuthstateGuard } from './authstate.guard';

describe('AuthstateGuard', () => {
  let guard: AuthstateGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(AuthstateGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
