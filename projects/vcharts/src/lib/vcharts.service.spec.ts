import { TestBed } from '@angular/core/testing';

import { VchartsService } from './vcharts.service';

describe('VchartsService', () => {
  let service: VchartsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VchartsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
