import { TestBed } from '@angular/core/testing';

import { FixerService } from './fixer.service';

describe('FixerService', () => {
  let service: FixerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FixerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
