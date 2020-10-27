import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TerminalMonitoringComponent } from './terminal-monitoring.component';

describe('TerminalMonitoringComponent', () => {
  let component: TerminalMonitoringComponent;
  let fixture: ComponentFixture<TerminalMonitoringComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TerminalMonitoringComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TerminalMonitoringComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
