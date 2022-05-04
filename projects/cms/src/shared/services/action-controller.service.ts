import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ActionControllerService {
  constructor(private httpClient: HttpClient) {}

  public createAction(data): Observable<any> {
    return this.httpClient.post(
      'smartlocker-ticket/api/v1/attached-actions',
      data
    );
  }
  public getAllAction(): Observable<any> {
    return this.httpClient.get('smartlocker-ticket/api/v1/attached-actions');
  }

  public updateAction(data, id: number): Observable<any> {
    return this.httpClient.put(
      'smartlocker-ticket/api/v1/attached-actions/' + id,
      data
    );
  }

  public deleteAction(id: number): Observable<any> {
    return this.httpClient.delete(
      'smartlocker-ticket/api/v1/attached-actions/' + id
    );
  }
}
