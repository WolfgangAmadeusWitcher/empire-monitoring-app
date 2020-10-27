import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Terminal } from '../models/terminal.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TerminalMonitoringService {

  public url = 'https://localhost:5007/TerminalMonitoring';
  private headers: HttpHeaders;

  constructor(private http: HttpClient) { }

  getAll(): Observable<Terminal[]> {
    return this.http.get<Terminal[]>(this.url + '/GetAll');
  }
}
