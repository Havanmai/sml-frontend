import { TestBed } from '@angular/core/testing';

import { PostmansService } from './postmans.service';

describe('PostmansService', () => {
  let service: PostmansService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PostmansService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
