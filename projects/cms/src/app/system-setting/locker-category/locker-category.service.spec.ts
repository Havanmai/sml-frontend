import { TestBed } from '@angular/core/testing';

import { LockerCategoryService } from './locker-category.service';

describe('LockerCategoryService', () => {
  let service: LockerCategoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LockerCategoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
