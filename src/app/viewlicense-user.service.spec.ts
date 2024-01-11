import { TestBed } from '@angular/core/testing';

import { ViewlicenseUserService } from './viewlicense-user.service';

describe('ViewlicenseUserService', () => {
  let service: ViewlicenseUserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ViewlicenseUserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
