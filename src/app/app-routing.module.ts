import { EmpireQueueMonitoringComponent } from './empire-queue-monitoring/empire-queue-monitoring.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TerminalMonitoringComponent } from './terminal-monitoring/terminal-monitoring.component';

const routes: Routes = [
  { path: 'terminal-monitoring', component: TerminalMonitoringComponent},
  { path: 'queue-monitoring', component: EmpireQueueMonitoringComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
