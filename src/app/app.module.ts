import { TerminalMonitoringComponent } from './terminal-monitoring/terminal-monitoring.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TerminalMonitoringService } from './services/terminal-monitoring.service';
import { SignalRService } from './services/signal-r.service';
import { HttpClientModule } from '@angular/common/http';
import { EmpireQueueMonitoringComponent } from './empire-queue-monitoring/empire-queue-monitoring.component';

@NgModule({
  declarations: [
    AppComponent,
    TerminalMonitoringComponent,
    EmpireQueueMonitoringComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [SignalRService, TerminalMonitoringService],
  bootstrap: [AppComponent]
})
export class AppModule { }
