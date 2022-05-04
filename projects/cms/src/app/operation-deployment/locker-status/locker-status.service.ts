import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { LockerStatus } from './locker-status.model';

@Injectable({
  providedIn: 'root',
})
export class LockerStatusService {
  reloadLockerDiagram$ = new Subject<void>();
  reloadLockerTransaction$ = new Subject<void>();
  reloadLockerActivity$ = new Subject<void>();
  reloadLockerDeploy$ = new Subject<void>();
  reloadLockerDiagram() {
    this.reloadLockerDiagram$.next();
  }
  reloadLockerTransaction() {
    this.reloadLockerTransaction$.next();
  }
  reloadLockerActivity() {
    this.reloadLockerActivity$.next();
  }
  reloadLockerDeploy() {
    this.reloadLockerDeploy$.next();
  }

  reloadListLocker$ = new Subject<void>();
  reloadItem() {
    this.reloadListLocker$.next();
  }

  constructor(private http: HttpClient) {}

  getAllLockerCabinets(
    page: number = 0,
    size: number = 10,
    codeSearch?: string,
    maTinh?: string,
    maQuanHuyen?: string,
    phuongXaId?: number,
    buuCucId?: number
  ) {
    let url =
      'smartlocker-locker/api/v1/locker-cabinets?page=' +
      page +
      '&size=' +
      size;
    if (codeSearch && codeSearch.trim() !== '') {
      url = url.concat('&code.contains=', codeSearch);
    }
    if (maTinh && maTinh.trim() !== '') {
      url = url.concat('&maTinh.equals=', maTinh);
    }
    if (maQuanHuyen !== undefined && maQuanHuyen !== null) {
      url = url.concat('&maQuanHuyen.equals=', maQuanHuyen);
    }
    if (phuongXaId !== undefined && phuongXaId !== null) {
      url = url.concat('&phuongXaId.equals=' + phuongXaId);
    }
    if (buuCucId !== undefined && buuCucId !== null) {
      url = url.concat('&buuCucId.equals=' + buuCucId);
    }
    return this.http.get(url);
  }

  getDetailLockerCabinet(id: number) {
    return this.http.get('smartlocker-locker/api/v1/locker-cabinets/' + id);
  }

  deleteLockerStatus(id: number) {
    return this.http.delete('smartlocker-locker/api/v1/locker-cabinets/' + id);
  }
  updateLocker(json, idLocker) {
    return this.http.put(
      'smartlocker-locker/api/v1/locker-cabinets/' + idLocker,
      JSON.stringify(json)
    );
  }
  updateLockerCabinets(
    idLocker: number,
    idBuucuc: number,
    code: string,
    title: string,
    description: string,
    latitude: number,
    longitude: number,
    secret: string,
    serial: string,
    idAddress: number,
    status: number,
    categoryId: number,
    idplace: number
  ) {
    let json = {
      buuCuc: {
        id: idBuucuc,
      },
      category: {
        id: categoryId,
      },
      code: code,
      title: title,
      description: description,
      id: idLocker,
      latitude: latitude,
      longitude: longitude,
      secret: secret,
      serial: serial,
      address: {
        id: idAddress,
      },
      place: {
        id: idplace,
      },
      status: status,
    };
    return this.http.put(
      'smartlocker-locker/api/v1/locker-cabinets/' + idLocker,
      JSON.stringify(json)
    );
  }

  ///Detail Locker Cabinets
  getDetailHardwareStatus(id: number) {
    return this.http.get(
      'smartlocker-locker/api/v1/hardware-statuses/cabinet/' + id
    );
  }

  getLockerList(id: number) {
    return this.http.get(
      'smartlocker-locker/api/v1/lockers/unpaged?cabinetId.equals=' + id
    );
  }

  getLockerPlacesList() {
    return this.http.get(
      'smartlocker-locker/api/v1/locker-cabinet-places/unpaged'
    );
  }

  getSuppliersList() {
    return this.http.get('smartlocker-locker/api/v1/suppliers/unpaged');
  }

  getBuildingClassList() {
    return this.http.get(
      'smartlocker-locker/api/v1/building-classifications/unpaged'
    );
  }

  getBuuCuSearch(
    page: number = 0,
    size: number = 10,
    maTinh: string,
    maQuanHuyen: string,
    phuongXaId: number
  ) {
    let url = 'smartlocker/api/v1/buu-cucs?page=' + page + '&size=' + size;
    if (maTinh && maTinh.trim() !== '') {
      url = url.concat('&maTinh.equals=', maTinh);
    }
    if (maQuanHuyen !== undefined && maQuanHuyen !== null) {
      url = url.concat('&maQuanHuyen.equals=', maQuanHuyen);
    }
    if (phuongXaId !== undefined && phuongXaId !== null) {
      url = url.concat('&phuongXaId.equals=' + phuongXaId);
    }
    return this.http.get(url);
  }

  Lockerlock(id: number) {
    let json = {
      id: id,
    };
    return this.http.post(
      'smartlocker-locker/api/v1/lockers/' + id + '/lock',
      JSON.stringify(json)
    );
  }

  lockLockersByBlock(block: number, cabinetId: number) {
    let json = {
      block: block,
      cabinetId: cabinetId,
    };
    return this.http.post(
      `smartlocker-locker/api/v1/lockers/lock-by-block?block=${block}&cabinetId=${cabinetId}`,
      JSON.stringify(json)
    );
  }

  lockLockerAll(cabinetId: number) {
    let json = {
      cabinetId: cabinetId,
    };
    return this.http.post(
      `smartlocker-locker/api/v1/lockers/lock-all?cabinetId=${cabinetId}`,
      JSON.stringify(json)
    );
  }

  getAllSupplier(page: number = 0, size: number = 10) {
    let url =
      'smartlocker-locker/api/v1/suppliers?page=' + page + '&size=' + size;
    return this.http.get(url);
  }

  getAllLocationLocker(page: number = 0, size: number = 10) {
    return this.http.get(
      'smartlocker-locker/api/v1/locker-cabinet-places?page=' +
        page +
        '&size=' +
        size
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

  getAllDevicesByLocker(id: number, page: number = 0, size: number = 10) {
    return this.http.get(
      'smartlocker-warehouse/api/v1/devices/all-device-by-cabinet/' + id
    );
  }

  getPostOffByCode(code: string) {
    return this.http.get('smartlocker/api/v1/buu-cucs?maBuuCuc.equals=' + code);
  }
}
