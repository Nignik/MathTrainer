import { TestBed } from '@angular/core/testing';

import { ProblemGeneratorService } from './problem-generator.service';

describe('ProblemGeneratorService', () => {
  let service: ProblemGeneratorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProblemGeneratorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
