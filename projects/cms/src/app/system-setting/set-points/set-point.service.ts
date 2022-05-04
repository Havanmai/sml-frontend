import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SetPointService {
  constructor(private http: HttpClient) {}

  getAllLocationLocker(page: number = 0, size: number = 10) {
    return this.http.get(
      'smartlocker-locker/api/v1/locker-cabinet-places?page=' +
        page +
        '&size=' +
        size
    );
  }
  postLocationLocker(name: string, note: string) {
    let json = {
      name: name,
      note: note,
    };
    return this.http.post(
      'smartlocker-locker/api/v1/locker-cabinet-places',
      JSON.stringify(json)
    );
  }

  updateLocationLocker(id: number, name: string, note: string) {
    let json = {
      id: id,
      name: name,
      note: note,
    };
    return this.http.put(
      'smartlocker-locker/api/v1/locker-cabinet-places/' + id,
      JSON.stringify(json)
    );
  }

  deleteLocationLocker(id: number) {
    return this.http.delete(
      'smartlocker-locker/api/v1/locker-cabinet-places/' + id
    );
  }

  editLocation$ = new Subject<any>();
  editLocation(data) {
    this.editLocation$.next(data);
  }

  reloadLocationLocker$ = new Subject<void>();
  reloadLocationLocker() {
    this.reloadLocationLocker$.next();
  }
}
