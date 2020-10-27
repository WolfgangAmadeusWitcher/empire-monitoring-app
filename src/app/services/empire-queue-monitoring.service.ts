import { EmpireQueue } from './../models/empire-queue.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmpireQueueMonitoringService {

  public url = 'https://localhost:5007/EmpireQueueMonitoring';
  private headers: HttpHeaders;

  constructor(private http: HttpClient) { }

  getAll(): Observable<EmpireQueue[]> {
    return this.http.get<EmpireQueue[]>(this.url + '/GetAll');
  }
}
