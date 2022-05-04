import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  BehaviorSubject,
  Observable,
  ObservableInput,
  of,
  Subject,
} from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class StoreService {
  constructor(private http: HttpClient) {}

  getAllDevice(
    page: number = 0,
    size: number = 10,
    id: number,
    batchNumber: string,
    modelId: number,
    status: string,
    categoryId: number,
    importerId: number,
    dateStart: string,
    dateEnd: string
  ) {
    let headUrl =
      'smartlocker-warehouse/api/v1/devices?page=' +
      page +
      '&size=' +
      size +
      '&sort=id,desc';
    if (id) {
      headUrl = headUrl.concat('id.equals=', id.toString());
    }
    if (batchNumber) {
      headUrl = headUrl.concat('&batchNumber.contains=', batchNumber);
    }
    if (modelId) {
      headUrl = headUrl.concat('&modelId.equals=', modelId.toString());
    }
    if (status) {
      headUrl = headUrl.concat('&status.equals=', status);
    }
    if (categoryId) {
      headUrl = headUrl.concat('&categoryId.equals=', categoryId.toString());
    }
    if (importerId) {
      headUrl = headUrl.concat('&importerId.equals=', importerId.toString());
    }
    if (dateStart) {
      headUrl = headUrl.concat('&importDate.greaterThan=', dateStart);
    }
    if (dateEnd) {
      headUrl = headUrl.concat('&importDate.lessThan=', dateEnd);
    }
    return this.http.get(headUrl);
  }

  createDevice(
    batchNumber: string,
    color: string,
    dimension: string,
    importDate: string,
    importerId: number,
    modelId: number,
    note: string,
    price: number,
    serial: string,
    status: string,
    vendor: string,
    version: string,
    weight: string
  ) {
    let json = {
      batchNumber: batchNumber,
      color: color,
      dimension: dimension,
      importDate: importDate,
      importer: {
        id: importerId,
      },
      model: {
        id: modelId,
      },
      note: note,
      price: price,
      serial: serial,
      status: status,
      vendor: vendor,
      version: version,
      weight: weight,
    };

    return this.http.post(
      'smartlocker-warehouse/api/v1/devices',
      JSON.stringify(json)
    );
  }

  getAllSynthetic() {
    return this.http.get(
      'smartlocker-warehouse/api/v1/devices/count-specification'
    );
  }

  getImporterSearch() {
    return this.http.get(`smartlocker/api/v1/users`);
  }

  getAllDeviceSort() {
    return this.http.get('smartlocker-warehouse/api/v1/devices');
  }

  postExportCabinet(listDeviveId: Array<number>) {
    return this.http.post(
      'smartlocker/api/v1/devices/export-cabinet',
      listDeviveId
    );
  }

  getAllDeviceHistories() {
    return this.http.get('smartlocker/api/v1/device-histories');
  }

  getPostOffice(value: string = '') {
    let url = 'smartlocker/api/v1/buu-cucs';
    if (value && value.trim()) {
      url = url.concat('?maBuuCuc.contains=', value);
    }
    return this.http.get(url);
  }

  getPostOfficeToCode(maBuuCuc: string) {
    return this.http.get(
      'smartlocker/api/v1/buu-cucs?maBuuCuc.equals=' + maBuuCuc
    );
  }

  postExportLocker(
    id: number,
    maBuuCuc: string,
    secret: string,
    title: string,
    categoryId: number,
    idAddress: number,
    idPlace: number
  ) {
    let json = {
      buuCuc: {
        id: id,
        maBuuCuc: maBuuCuc,
      },
      category: {
        id: categoryId,
      },
      secret: secret,
      title: title,
      address: {
        id: idAddress,
      },
      place: {
        id: idPlace,
      },
    };
    return this.http.post(
      `smartlocker-locker/api/v1/locker-cabinets/export-cabinets`,
      JSON.stringify(json)
    );
  }

  getAllProvince() {
    return this.http.get('smartlocker/api/v1/vtp-tinhs/unpaged');
  }

  getDistByProvince(province: string) {
    return this.http.get(
      'smartlocker/api/v1/vtp-quan-huyens/unpaged?maTinh.equals=' + province
    );
  }

  getDistByCode(code: number) {
    return this.http.get(
      'smartlocker/api/v1/vtp-quan-huyens/unpaged?maQuanHuyen.equals=' + code
    );
  }
  getDistById(id: number) {
    return this.http.get('smartlocker/api/v1/vtp-quan-huyens/' + id);
  }

  getWardByDist(dist: number) {
    return this.http.get(
      'smartlocker/api/v1/vtp-phuong-xas/unpaged?quanHuyenId.equals=' + dist
    );
  }

  findPost(dist: string = null, ward: string = null) {
    if (ward) {
      return this.http.get(
        'smartlocker/api/v1/buu-cucs?phuongXaId.equals=' +
          ward +
          '&page=0&size=200'
      );
    } else {
      return this.http.get(
        'smartlocker/api/v1/buu-cucs?maQuanHuyen.equals=' +
          dist +
          '&page=0&size=200'
      );
    }
  }

  postDevicesBatchNumber(name: string, file: any) {
    const formData = new FormData();
    formData.append('batchNumber', name + '');
    formData.append('file', file);
    return this.http.post<FormData>(
      'smartlocker/api/v1/devices/batch-number/' + name + '/import-excel',
      formData
    );
  }

  uploadCode(batchNumber: string, file: any) {
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post(
      `smartlocker/api/v1/devices/batch-number/${batchNumber}/import-excel`,
      formData
    );
  }

  submitListDevice$ = new BehaviorSubject<any>(null);
  submitListDevice(data) {
    return this.submitListDevice$.next(data);
  }

  dataCreateWayBills$ = new BehaviorSubject<any>(null);
  // waybill = this.dataCreateWayBills$.asObservable();
  dataCreateWayBills(data) {
    return this.dataCreateWayBills$.next(data);
  }

  getAllAddress(
    page: number = 0,
    size: number = 10,
    maTinh: string,
    maQuanHuyen: number,
    phuongXaId: number
  ) {
    let headUrl =
      'smartlocker-locker/api/v1/locker-cabinet-addresses?page=' +
      page +
      '&size=' +
      size;
    if (maTinh) {
      headUrl = headUrl.concat('&maTinh.equals=', maTinh.toString());
    }
    if (maQuanHuyen) {
      headUrl = headUrl.concat('&maQuanHuyen.equals=', maQuanHuyen.toString());
    }
    if (phuongXaId) {
      headUrl = headUrl.concat('&phuongXaId.equals=', phuongXaId.toString());
    }
    return this.http.get(headUrl);
  }

  reloadItemList$ = new Subject<void>();
  reloadItem() {
    this.reloadItemList$.next();
  }

  getAllLocationLocker(page: number = 0, size: number = 10) {
    return this.http.get(
      'smartlocker-locker/api/v1/locker-cabinet-places?page=' +
        page +
        '&size=' +
        size
    );
  }
}
