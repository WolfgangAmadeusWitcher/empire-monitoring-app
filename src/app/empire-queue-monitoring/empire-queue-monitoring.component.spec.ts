import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpireQueueMonitoringComponent } from './empire-queue-monitoring.component';

describe('EmpireQueueMonitoringComponent', () => {
  let component: EmpireQueueMonitoringComponent;
  let fixture: ComponentFixture<EmpireQueueMonitoringComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmpireQueueMonitoringComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmpireQueueMonitoringComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
