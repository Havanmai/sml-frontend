import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TransactionService {
  constructor(private http: HttpClient) {}

  getAllTransaction(
    page: number = 0,
    size: number = 12,
    maVanDon: string,
    status: number,
    enterFrom: string,
    enterTo: string,
    maBuuCuc: string,
    cabinetId: number,
    lockerSize: number,
    postmanId: string,
    supplierId: string,
    dpId: string,
    serviceId: string
  ) {
    let url =
      'smartlocker-order/api/v1/van-dons?page=' +
      page +
      '&size=' +
      size +
      '&sort=id,desc';
    if (maVanDon && maVanDon.trim() != '') {
      url = url.concat('&maVanDon.contains=', maVanDon);
    }
    if (maBuuCuc && maBuuCuc.trim() != '') {
      url = url.concat('&maBuuCuc.equals=', maBuuCuc);
    }
    if (cabinetId) {
      url = url.concat('&cabinetId.equals=' + cabinetId);
    }
    if (postmanId && postmanId.trim() != '') {
      url = url.concat('&postmanId.equals=', postmanId);
    }
    if (enterFrom && enterFrom.trim() != '') {
      url = url.concat('&enter.greaterThan=', enterFrom);
    }
    if (enterTo && enterTo.trim() != '') {
      url = url.concat('&enter.lessThan=', enterTo);
    }
    if (status > 0) {
      url = url.concat('&status.equals=' + status);
    }
    if (lockerSize > 0) {
      url = url.concat('&lockerSize.equals=' + lockerSize);
    }
    if (supplierId && supplierId.trim() != '') {
      url = url.concat('&supplierCode.equals=' + supplierId);
    }
    if (dpId && dpId.trim() != '') {
      url = url.concat('&partnerCode.equals=' + dpId);
    }
    if (serviceId && serviceId.trim() != '') {
      url = url.concat('&dichVu.equals=' + serviceId);
    }
    console.log("fffff",url);
    return this.http.get(url);
  }

  getHistoryDetailTransaction(maVanDon: string) {
    return this.http.get(
      'smartlocker-order/api/v1/action-logs?maVanDon.equals=' + maVanDon
    );
  }
  getDetailTransaction(maVanDon: string) {
    return this.http.get(
      'smartlocker-order/api/v1/van-dons?maVanDon.equals=' + maVanDon
    );
  }

  getDetailCabinets(id: number) {
    return this.http.get(
      'smartlocker-locker/api/v1/locker-cabinets?id.equals=' + id
    );
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

  getBuutaSearch(page: number = 0, size: number = 10) {
    let url = 'smartlocker/api/v1/buu-cucs?page=' + page + '&size=' + size;
    return this.http.get(url);
  }

  getBuuCucSearchByCode(page: number = 0, size: number = 10, maBuuCuc: string) {
    let url = 'smartlocker/api/v1/buu-cucs?page=' + page + '&size=' + size;
    if (maBuuCuc && maBuuCuc.trim() != '') {
      url = url.concat('&maBuuCuc.contains=', maBuuCuc);
    }
    return this.http.get(url);
  }

  getLockerSearch(page: number = 0, size: number = 10) {
    let url =
      'smartlocker-locker/api/v1/locker-cabinets?page=' +
      page +
      '&size=' +
      size;
    return this.http.get(url);
  }

  getPostManSearch(page: number = 0, size: number = 10, name: string) {
    let url = 'smartlocker/api/v1/buu-tas?page=' + page + '&size=' + size;
    if (name && name.trim() != '') {
      url = url.concat('&userid.equals=', name);
    }
    return this.http.get(url);
  }

  getSuppliersList(page: number = 0, size: number = 10) {
    let url =
      'smartlocker-locker/api/v1/suppliers?page=' + page + '&size=' + size;
    return this.http.get(url);
  }

  getDeliveryList(page: number = 0, size: number = 10) {
    let url =
      'smartlocker-order/api/v1/delivery-partners?page=' +
      page +
      '&size=' +
      size;
    return this.http.get(url);
  }

  getAllService(page: number = 0, size: number = 10) {
    let url =
      'smartlocker-dichvu/api/v1/dich-vus?page=' + page + '&size=' + size ;
    return this.http.get(url);
  }

  getVideo(id: number) {
    return this.http.get(
      'smartlocker-order/api/v1/action-video-logs/video-url-by-action?actionId=' +
        id
    );
  }
}
