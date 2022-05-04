import { TestBed } from '@angular/core/testing';

import { LockerStatusService } from './locker-status.service';

describe('LockerStatusService', () => {
  let service: LockerStatusService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LockerStatusService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
