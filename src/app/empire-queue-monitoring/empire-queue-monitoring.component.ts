import { EmpireQueueMonitoringService } from './../services/empire-queue-monitoring.service';
import { EmpireQueue } from './../models/empire-queue.model';
import { Component, OnInit } from '@angular/core';
import { HashTable } from '../utils/hash-table';
import { SignalRService } from '../services/signal-r.service';

@Component({
  selector: 'app-empire-queue-monitoring',
  templateUrl: './empire-queue-monitoring.component.html',
  styleUrls: ['./empire-queue-monitoring.component.css'],
})
export class EmpireQueueMonitoringComponent implements OnInit {
  empireQueues = new HashTable<number, EmpireQueue>();

  constructor(
    private empireQueueMonitoringService: EmpireQueueMonitoringService,
    private signalRService: SignalRService
  ) {
    this.signalRService.empireQueueCreated.subscribe(
      (empireQueue: EmpireQueue) =>
        this.empireQueues.put(empireQueue.id, empireQueue)
    );

    this.signalRService.empireQueueDeleted.subscribe(
      (empireQueue: EmpireQueue) => this.empireQueues.remove(empireQueue.id)
    );

    this.signalRService.empireQueueUpdated.subscribe(
      (empireQueue: EmpireQueue) => {
        console.log(empireQueue);
        this.updateEmpireQueue(empireQueue);
      }
    );
  }

  ngOnInit(): void {
    this.empireQueueMonitoringService
      .getAll()
      .subscribe((empireQueueRecords) =>
        empireQueueRecords.forEach((empireQueueRecord) =>
          this.empireQueues.put(empireQueueRecord.id, empireQueueRecord)
        )
      );
    this.signalRService.startConnection();
    this.signalRService.addEmpireQueueUpdatedEventListener();
    this.signalRService.addEmpireQueueCreatedEventListener();
    this.signalRService.addEmpireQueueDeletedEventListener();
    this.signalRService.onDisconnectEventListener();
  }

  updateEmpireQueue(empireQueue: EmpireQueue): void {
    this.empireQueues.put(empireQueue.id, empireQueue);
  }
}
