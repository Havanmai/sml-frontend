import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Result } from '../models/result.model';

@Injectable({
  providedIn: 'root',
})
export class WaybillsService {
  private formatErrors(error: any) {
    return throwError(error);
  }
  constructor(private httpClient: HttpClient) {}

  //   public downloadFile(params: HttpParams): Observable<any> {
  //     return this.httpClient.download(`/api/files/download`, params);
  //   }

  public importDevices(data: any): Observable<any> {
    return this.httpClient.post(
      'smartlocker-warehouse/api/v1/bills/import-devices-by-excel',
      data
    );
  }

  public createDevices(data: any): Observable<any> {
    return this.httpClient.post('smartlocker-warehouse/api/v1/bills', data);
  }

  public getListDeviceModels(): Observable<any> {
    return this.httpClient.get('smartlocker-warehouse/api/v1/device-models');
  }

  public getListBills(page?: number, size?: number): Observable<any> {
    return this.httpClient.get(
      'smartlocker-warehouse/api/v1/bills?page=' + page + '&size=' + size
    );
  }

  public getListDevices(id?: number, status?: number): Observable<any> {
    return this.httpClient.get(
      'smartlocker-warehouse/api/v1/devices/' + id + '/' + status
    );
  }

  public getDetailBills(id): Observable<any> {
    return this.httpClient.get(
      'smartlocker-warehouse/api/v1/bills/detail/' + id
    );
  }

  public importByExcel(data): Observable<any> {
    return this.httpClient.post(
      `smartlocker-warehouse/api/v1/devices/list-devices-by-excel`,
      data
    );
  }

  public getCodeRandom(): Observable<any> {
    return this.httpClient.get(
      `smartlocker-warehouse/api/v1/devices/get-batch-number`
    );
  }

  public exportDevicesByExcel(): Observable<HttpResponse<Blob>> {
    return this.httpClient.get(
      'smartlocker-warehouse/api/v1/devices/download-file-sample',
      { responseType: 'blob', observe: 'response' }
    );
  }

  public downloadPost(body = {}): Observable<HttpResponse<Blob>> {
    return this.httpClient
      .get(`smartlocker-warehouse/api/v1/devices/download-file-sample`, {
        responseType: 'blob',
        observe: 'response',
      })
      .pipe(catchError(this.formatErrors));
  }

  dataModal$ = new Subject<void>();
  public dataModal(data) {
    this.dataModal$.next(data);
  }
}
