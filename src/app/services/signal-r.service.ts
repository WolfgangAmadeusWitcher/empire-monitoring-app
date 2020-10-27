import { EmpireQueue } from './../models/empire-queue.model';
import { BreakLogEntry } from './../models/break-log-entry.model';
import { EventEmitter, Injectable, Output } from '@angular/core';
import { Terminal } from '../models/terminal.model';
import * as signalR from '@aspnet/signalr';

@Injectable({
  providedIn: 'root',
})
export class SignalRService {
  @Output() breakLogEntryCreated = new EventEmitter<BreakLogEntry>();
  @Output() breakLogEntryUpdated = new EventEmitter<BreakLogEntry>();

  @Output() terminalUpdated = new EventEmitter<Terminal>();
  @Output() terminalCreated = new EventEmitter<Terminal>();
  @Output() terminalDeleted = new EventEmitter<Terminal>();

  @Output() empireQueueUpdated = new EventEmitter<EmpireQueue>();
  @Output() empireQueueCreated = new EventEmitter<EmpireQueue>();
  @Output() empireQueueDeleted = new EventEmitter<EmpireQueue>();

  public data: Terminal;
  public breakLogEntry: BreakLogEntry;
  public empireQueue: EmpireQueue;
  private hubConnection: signalR.HubConnection;

  public startConnection(): void {
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl('https://localhost:5007/monitoring')
      .build();
    console.log('Connection Starting...');
    this.hubConnection
      .start()
      .then(() => console.log('Connection started'))
      .catch((err) => console.log('Error while starting connection: ' + err));
  }

  public addBreakLogEntryUpdatedEventListener(): void {
    this.hubConnection.on('break-log-updated-event', (breakLog) => {
      this.breakLogEntry = breakLog;
      this.breakLogEntryUpdated.emit(this.breakLogEntry);
    });
  }

  public addBreakLogEntryCreatedEventListener(): void {
    this.hubConnection.on('break-log-created-event', (breakLog) => {
      this.breakLogEntry = breakLog;
      this.breakLogEntryCreated.emit(this.breakLogEntry);
    });
  }

  public addTerminalUpdatedEventListener(): void {
    this.hubConnection.on('terminal-updated-event', (data) => {
      this.data = data;
      this.terminalUpdated.emit(this.data);
    });
  }
  public addTerminalCreatedEventListener(): void {
    this.hubConnection.on('terminal-created-event', (data) => {
      this.data = data;
      this.terminalCreated.emit(this.data);
    });
  }

  public addTerminalDeletedEventListener(): void {
    this.hubConnection.on('terminal-deleted-event', (data) => {
      this.data = data;
      this.terminalDeleted.emit(this.data);
    });
  }
  public addEmpireQueueUpdatedEventListener(): void {
    this.hubConnection.on('empire-queue-updated', (data) => {
      this.empireQueue = data;
      this.empireQueueUpdated.emit(this.empireQueue);
    });
  }
  public addEmpireQueueCreatedEventListener(): void {
    this.hubConnection.on('empire-queue-created', (data) => {
      this.empireQueue = data;
      this.empireQueueCreated.emit(this.empireQueue);
    });
  }

  public addEmpireQueueDeletedEventListener(): void {
    this.hubConnection.on('empire-queue-deleted', (data) => {
      this.empireQueue = data;
      this.empireQueueDeleted.emit(this.empireQueue);
    });
  }
  onDisconnectEventListener(): void {
    this.hubConnection.onclose((error) => console.log(error));
  }
}
