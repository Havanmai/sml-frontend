import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LockerCategoryService {
  constructor(private http: HttpClient) {}

  getAllLockerCategory(page: number = 0, size: number = 10) {
    return this.http.get(
      'smartlocker-locker/api/v1/locker-cabinet-categories?page=' +
        page +
        '&size=' +
        size
    );
  }

  postCategoryLocker(name: string, note: string, status: number) {
    let json = {
      name: name,
      status: status,
      note: note,
    };
    return this.http.post(
      'smartlocker-locker/api/v1/locker-cabinet-categories',
      JSON.stringify(json)
    );
  }

  updateCategoryLocker(id: number, name: string, note: string, status: number) {
    let json = {
      id: id,
      name: name,
      status: status,
      note: note,
    };
    return this.http.put(
      'smartlocker-locker/api/v1/locker-cabinet-categories/' + id,
      JSON.stringify(json)
    );
  }

  deleteCategoryLocker(id: number) {
    return this.http.delete(
      'smartlocker-locker/api/v1/locker-cabinet-categories/' + id
    );
  }

  editCategoryLocker$ = new Subject<any>();
  editCategory(data) {
    this.editCategoryLocker$.next(data);
  }

  reloadCategoryLocker$ = new Subject<void>();
  reloadCategoryLocker() {
    this.reloadCategoryLocker$.next();
  }
}
