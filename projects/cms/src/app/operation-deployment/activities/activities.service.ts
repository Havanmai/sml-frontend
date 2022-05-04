import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ActivitiesService {
  constructor(private http: HttpClient) {}

  getLocker(page: number = 0, size: number = 10, cabinetId: number) {
    return this.http.get(
      'smartlocker/api/v1/lockers?cabinetId.equals=' +
        cabinetId +
        '&page=' +
        page +
        '&size=' +
        size +
        '&sort=desc'
    );
  }
}
