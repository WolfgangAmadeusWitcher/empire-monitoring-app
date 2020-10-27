import { TestBed } from '@angular/core/testing';

import { TerminalMonitoringService } from './terminal-monitoring.service';

describe('TerminalMonitoringService', () => {
  let service: TerminalMonitoringService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TerminalMonitoringService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
