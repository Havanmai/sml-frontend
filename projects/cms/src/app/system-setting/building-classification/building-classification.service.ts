import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BuildingClassificationService {
  constructor(private http: HttpClient) {}

  getAllRatingBuildingLocker(page: number = 0, size: number = 10) {
    return this.http.get(
      'smartlocker-locker/api/v1/building-classifications?page=' +
        page +
        '&size=' +
        size
    );
  }

  postRatingBuildingLocker(name: string, note: string) {
    let json = {
      name: name,
      note: note,
    };
    return this.http.post(
      'smartlocker-locker/api/v1/building-classifications',
      JSON.stringify(json)
    );
  }

  updateRatingBuildingLocker(id: number, name: string, note: string) {
    let json = {
      id: id,
      name: name,
      note: note,
    };
    return this.http.put(
      'smartlocker-locker/api/v1/building-classifications/' + id,
      JSON.stringify(json)
    );
  }

  deleteRatingBuildingLocker(id: number) {
    return this.http.delete(
      'smartlocker-locker/api/v1/building-classifications/' + id
    );
  }

  editRatingBuilding$ = new Subject<any>();
  editRatingBuilding(data) {
    this.editRatingBuilding$.next(data);
  }

  reloadRatingBuildingLocker$ = new Subject<void>();
  reloadRatingBuildingLocker() {
    this.reloadRatingBuildingLocker$.next();
  }
}
