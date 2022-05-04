import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Result } from '../models/result.model';

@Injectable({
  providedIn: 'root',
})
export class WorkflowService {
  constructor(private httpClient: HttpClient) {}

  public getAllWorkflows(
    pageNumber?: number,
    pageSize?: number
  ): Observable<any> {
    return this.httpClient.get(
      'smartlocker-ticket/api/v1/workflows?page=' +
        pageNumber +
        '&size=' +
        pageSize
    );
  }

  public createWorkflows(data): Observable<any> {
    return this.httpClient.post('smartlocker-ticket/api/v1/workflows', data);
  }

  public updateWorkflows(data, id: number): Observable<any> {
    return this.httpClient.put(
      'smartlocker-ticket/api/v1/workflows/' + id,
      data
    );
  }

  public deleteWorkflows(id: number): Observable<any> {
    return this.httpClient.delete('smartlocker-ticket/api/v1/workflows/' + id);
  }

  dataGraph$ = new Subject<void>();
  saveDataGraph(data) {
    this.dataGraph$.next(data);
  }

  // public getAllDataChartWorkflows(): Observable<Result<any>> {
  //   return;
  // }
}
