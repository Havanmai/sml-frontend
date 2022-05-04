import { TestBed } from '@angular/core/testing';

import { BuildingClassificationService } from './building-classification.service';

describe('BuildingClassificationService', () => {
  let service: BuildingClassificationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BuildingClassificationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
