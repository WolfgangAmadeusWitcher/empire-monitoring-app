import { TestBed } from '@angular/core/testing';

import { EmpireQueueMonitoringService } from './empire-queue-monitoring.service';

describe('EmpireQueueMonitoringService', () => {
  let service: EmpireQueueMonitoringService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EmpireQueueMonitoringService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
