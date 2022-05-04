import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AddressService {
  constructor(private http: HttpClient) {}

  getAllAddress(page: number = 0, size: number = 10) {
    return this.http.get(
      'smartlocker-locker/api/v1/locker-cabinet-addresses?page=' +
        page +
        '&size=' +
        size +
        '&sort=id,desc'
    );
  }

  getAllRatingBuildingLocker(page: number = 0, size: number = 10) {
    return this.http.get(
      'smartlocker-locker/api/v1/building-classifications?page=' +
        page +
        '&size=' +
        size
    );
  }

  getAllLocationLocker(page: number = 0, size: number = 10) {
    return this.http.get(
      'smartlocker-locker/api/v1/locker-cabinet-places?page=' +
        page +
        '&size=' +
        size
    );
  }

  createAddress(idward: number, detail: number, idbuildclass: number) {
    let json = {
      buildingClass: {
        id: idbuildclass,
      },
      detail: detail,
      vtpPhuongXa: {
        id: idward,
      },
    };
    return this.http.post(
      'smartlocker-locker/api/v1/locker-cabinet-addresses',
      JSON.stringify(json)
    );
  }

  editAddress(
    id: number,
    idward: number,
    detail: number,
    idbuildclass: number
  ) {
    let json = {
      id: id,
      buildingClass: {
        id: idbuildclass,
      },
      detail: detail,
      vtpPhuongXa: {
        id: idward,
      },
    };
    return this.http.put(
      'smartlocker-locker/api/v1/locker-cabinet-addresses/' + id,
      JSON.stringify(json)
    );
  }

  deleteAddressItem(id: number) {
    return this.http.delete(
      'smartlocker-locker/api/v1/locker-cabinet-addresses/' + id
    );
  }

  getAddressLockerByWard(id: number) {}

  reloadItemList$ = new Subject<void>();
  reloadItem() {
    this.reloadItemList$.next();
  }
}
