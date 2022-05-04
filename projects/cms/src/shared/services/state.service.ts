import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class StateService {
  constructor(private httpClient: HttpClient) {}

  public getAllStates(pageNumber?: number, pageSize?: number): Observable<any> {
    return this.httpClient.get(
      'smartlocker-ticket/api/v1/states?page=' +
        pageNumber +
        '&size=' +
        pageSize
    );
  }

  public getLstStates(): Observable<any> {
    return this.httpClient.get('smartlocker-ticket/api/v1/states');
  }

  public getDetailState(id: number): Observable<any> {
    return this.httpClient.get('smartlocker-ticket/api/v1/states/' + id);
  }

  public createStates(data): Observable<any> {
    return this.httpClient.post('smartlocker-ticket/api/v1/states', data);
  }

  public updateStates(data, id: number): Observable<any> {
    return this.httpClient.put('smartlocker-ticket/api/v1/states/' + id, data);
  }

  public deleteStates(id: number): Observable<any> {
    return this.httpClient.delete('smartlocker-ticket/api/v1/states/' + id);
  }
}
