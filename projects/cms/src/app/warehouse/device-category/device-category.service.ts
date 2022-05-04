import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { DeviceCategory } from './device-category.model';

@Injectable({
  providedIn: 'root',
})
export class DeviceCategoryService {
  /*
   apiURL="http://10.61.145.152:8080/api"; */

  constructor(private http: HttpClient) {}

  getDeviceCategory(page: number = 0, size: number = 10) {
    return this.http.get(
      `smartlocker-warehouse/api/v1/device-categories?page=` + page + '&size=' + size +'&sort=id,desc'
    );
  }
  createDeviceCategory(name: string, note: string) {
    let json = {
      name: name,
      note: note,
    };
    return this.http.post(
      'smartlocker-warehouse/api/v1/device-categories',
      JSON.stringify(json)
    );
  }

  updateDeviceCategory(id: number, name: string, note: string) {
    let json = {
      id: id,
      name: name,
      note: note,
    };
    return this.http.put(
      'smartlocker-warehouse/api/v1/device-categories/' + id,
      JSON.stringify(json)
    );
  }

  deleteDeviceCategory(id: number) {
    return this.http.delete('smartlocker-warehouse/api/v1/device-categories' + id);
  }

  getDeviceItem(page: number = 0, size: number = 10) {
    return this.http.get(
      `smartlocker-warehouse/api/v1/device-models?page=` +
        page +
        '&size=' +
        size
        +'&sort=id,desc'
    );

  }

  createDeviceItem(
    name: string,
    id: number,
    note: string,
    isLockerCabinet: boolean = false,
    isBlock: boolean = false
  ) {
    let json = {
      category: {
        id: id,
      },
      name: name,
      unit: note,
      isLockerCabinet: isLockerCabinet,
      isBlock: isBlock,
    };
    return this.http.post(
      'smartlocker-warehouse/api/v1/device-models',
      JSON.stringify(json)
    );
  }

  updateDeviceItem(
    id: number,
    name: string,
    idcategory: number,
    note: string,
    isLockerCabinet: boolean = false,
    isBlock: boolean = false
  ) {
    let json = {
      category: {
        id: idcategory,
      },
      id: id,
      name: name,
      unit: note,
      isLockerCabinet: isLockerCabinet,
      isBlock: isBlock,
    };
    return this.http.put(
      'smartlocker-warehouse/api/v1/device-models/' + id,
      JSON.stringify(json)
    );
  }

  deleteDeviceItem(id: number) {
    return this.http.delete('smartlocker-warehouse/api/v1/device-models/' + id);
  }

  getAllDepot(page:number=0,size:number=10) {
    return this.http.get(`smartlocker-warehouse/api/v1/ware-houses?page=` +
    page +
    '&size=' +
    size
    +'&sort=id,desc');
  }

  deleteDepotItem(id: number) {
    return this.http.delete('smartlocker-warehouse/api/v1/ware-houses/' + id);
  }

  createDepotItem(obj) {
    return this.http.post('smartlocker-warehouse/api/v1/ware-houses/', obj);
  }

  updateDepotItem(obj, id) {
    return this.http.put('smartlocker-warehouse/api/v1/ware-houses/' + id, obj);
  }

  checkExistDepot(data): Observable<any> {
    return this.http.get(
      'smartlocker-warehouse/api/v1/ware-houses/check-exist/' + data
    );
  }

  editCategoryGroupDialog$ = new Subject<any>();
  showEditCategoryGroup(group: any) {
    this.editCategoryGroupDialog$.next(group);
  }

  reloadGroupList$ = new Subject<void>();
  reloadGroup() {
    this.reloadGroupList$.next();
  }

  reloadItemList$ = new Subject<void>();
  reloadItem() {
    this.reloadItemList$.next();
  }

  editCategoryItemDialog$ = new Subject<any>();
  showEditCategoryItem(item: any) {
    this.editCategoryItemDialog$.next(item);
  }

  editDepot$ = new Subject<any>();
  editDepot(data) {
    this.editDepot$.next(data);
  }

  reloadDepotLocker$ = new Subject<void>();
  reloadDepotLocker() {
    this.reloadDepotLocker$.next();
  }
}
