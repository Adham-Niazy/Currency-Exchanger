import { TestBed } from '@angular/core/testing';

import { HistoricalService } from './historical.service';

describe('HistoricalService', () => {
  let service: HistoricalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HistoricalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
