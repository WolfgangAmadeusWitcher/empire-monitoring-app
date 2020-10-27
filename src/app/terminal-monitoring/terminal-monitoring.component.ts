import { BreakLogEntry, BreakState } from './../models/break-log-entry.model';
import { HashTable } from './../utils/hash-table';
import { SignalRService } from '../services/signal-r.service';
import { Component, OnInit } from '@angular/core';
import { Terminal, Status } from '../models/terminal.model';
import { TerminalMonitoringService } from '../services/terminal-monitoring.service';

@Component({
  selector: 'app-terminal-monitoring',
  templateUrl: './terminal-monitoring.component.html',
  styleUrls: ['./terminal-monitoring.component.css'],
})
export class TerminalMonitoringComponent implements OnInit {
  terminals = new HashTable<number, Terminal>();
  activeBreakLogs = new HashTable<number, BreakLogEntry>();

  constructor(
    private terminalMonitoringService: TerminalMonitoringService,
    private signalRService: SignalRService
  ) {
    this.signalRService.terminalUpdated.subscribe((tc) =>
      this.updateTerminal(tc)
    );

    this.signalRService.terminalCreated.subscribe((tc) =>
      this.terminals.put(tc.id, tc)
    );

    this.signalRService.terminalDeleted.subscribe((terminalId) =>
      this.terminals.remove(terminalId)
    );

    this.signalRService.breakLogEntryCreated.subscribe((ble) =>
      this.activeBreakLogs.put(ble.terminalId, ble)
    );

    this.signalRService.breakLogEntryUpdated.subscribe((breakLogEntry) =>
      this.updateBreakLogEntry(breakLogEntry)
    );
  }

  ngOnInit(): void {
    this.terminalMonitoringService
      .getAll()
      .subscribe((terminalRecords) =>
        terminalRecords.forEach((terminal) =>
          this.terminals.put(terminal.id, terminal)
        )
      );
    this.signalRService.startConnection();
    this.signalRService.addBreakLogEntryCreatedEventListener();
    this.signalRService.addBreakLogEntryUpdatedEventListener();
    this.signalRService.addTerminalUpdatedEventListener();
    this.signalRService.addTerminalCreatedEventListener();
    this.signalRService.addTerminalDeletedEventListener();
    this.signalRService.onDisconnectEventListener();
  }

  updateTerminal(updatedTerminal: Terminal): void {
    this.terminals.put(updatedTerminal.id, updatedTerminal);
  }

  getStatusText(statusCode: number): string {
    return Status[statusCode];
  }

  updateBreakLogEntry(updatedBreakLog: BreakLogEntry): void {
    this.activeBreakLogs.remove(updatedBreakLog.terminalId);
    if (updatedBreakLog.breakState !== BreakState.Closed) {
      this.activeBreakLogs.put(updatedBreakLog.terminalId, updatedBreakLog);
    }
  }
}
