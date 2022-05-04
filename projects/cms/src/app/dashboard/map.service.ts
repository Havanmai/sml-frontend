import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class MapService {
  constructor(private http: HttpClient) {}
  getSearchLockerCabinets(value: string) {
    return this.http.get(
      'smartlocker-locker/api/v1/locker-cabinets/unpaged?code.contains=' + value
    );
  }

  getLockerCabinets(value: string) {
    return this.http.get(
      'smartlocker-locker/api/v1/locker-cabinets?code.equals=' + value
    );
  }

  getAllLockerCabinets(
    codeSearch: string,
    maTinh: string,
    maQuanHuyen: string,
    phuongXaId: number,
    buuCucId: number
  ) {
    let url = 'smartlocker-locker/api/v1/locker-cabinets/unpaged';
    if (codeSearch && codeSearch.trim() !== '') {
      if (url == 'smartlocker-locker/api/v1/locker-cabinets/unpaged') {
        url = url.concat('?code.contains=', codeSearch);
      } else {
        url = url.concat('&code.contains=', codeSearch);
      }
    }
    if (maTinh && maTinh.trim() !== '') {
      if (url == 'smartlocker-locker/api/v1/locker-cabinets/unpaged') {
        url = url.concat('?maTinh.equals=', maTinh);
      } else {
        url = url.concat('&maTinh.equals=', maTinh);
      }
    }
    if (maQuanHuyen !== undefined && maQuanHuyen !== null) {
      if (url == 'smartlocker-locker/api/v1/locker-cabinets/unpaged') {
        url = url.concat('?maQuanHuyen.equals=', maQuanHuyen);
      } else {
        url = url.concat('&maQuanHuyen.equals=', maQuanHuyen);
      }
    }
    if (phuongXaId !== undefined && phuongXaId !== null) {
      if (url == 'smartlocker-locker/api/v1/locker-cabinets/unpaged') {
        url = url.concat('?phuongXaId.equals=' + phuongXaId);
      } else {
        url = url.concat('&phuongXaId.equals=' + phuongXaId);
      }
    }
    if (buuCucId !== undefined && buuCucId !== null) {
      if (url == 'smartlocker-locker/api/v1/locker-cabinets/unpaged') {
        url = url.concat('?buuCucId.equals=' + buuCucId);
      } else {
        url = url.concat('&buuCucId.equals=' + buuCucId);
      }
    }
    return this.http.get(url);
  }

  getAllBuuCucUpgrade(
    maTinh: string,
    maQuanHuyen: string,
    phuongXaId: number,
    buuCucId: number
  ) {
    let url = 'smartlocker/api/v1/buu-cucs/unpaged';
    if (maTinh && maTinh.trim() !== '') {
      if (url == 'smartlocker/api/v1/buu-cucs/unpaged') {
        url = url.concat('?maTinh.equals=', maTinh);
      } else {
        url = url.concat('&maTinh.equals=', maTinh);
      }
    }
    if (maQuanHuyen !== undefined && maQuanHuyen !== null) {
      if (url == 'smartlocker/api/v1/buu-cucs/unpaged') {
        url = url.concat('?maQuanHuyen.equals=', maQuanHuyen);
      } else {
        url = url.concat('&maQuanHuyen.equals=', maQuanHuyen);
      }
    }
    if (phuongXaId !== undefined && phuongXaId !== null) {
      if (url == 'smartlocker/api/v1/buu-cucs/unpaged') {
        url = url.concat('?phuongXaId.equals=' + phuongXaId);
      } else {
        url = url.concat('&phuongXaId.equals=' + phuongXaId);
      }
    }
    if (buuCucId !== undefined && buuCucId !== null) {
      if (url == 'smartlocker/api/v1/buu-cucs/unpaged') {
        url = url.concat('?id.equals=' + buuCucId);
      } else {
        url = url.concat('&id.equals=' + buuCucId);
      }
    }
    return this.http.get(url);
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
  getAllProvince() {
    return this.http.get('smartlocker/api/v1/vtp-tinhs/unpaged');
  }

  getProvinceByCode(id: string) {
    return this.http.get('smartlocker/api/v1/vtp-tinhs?maTinh.contains=' + id);
  }

  getDistById(id: string) {
    return this.http.get(
      'smartlocker/api/v1/vtp-quan-huyens?maQuanHuyen.equals=' + id
    );
  }
  getWardsById(id: number) {
    return this.http.get('smartlocker/api/v1/vtp-phuong-xas?id.equals=' + id);
  }

  getDistByProvince(province: string) {
    return this.http.get(
      'smartlocker/api/v1/vtp-quan-huyens/unpaged?maTinh.equals=' + province
    );
  }

  getWardByDist(dist: string) {
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
  getPostOfficeToCode(maBuuCuc: string) {
    return this.http.get(
      'smartlocker/api/v1/buu-cucs?maBuuCuc.equals=' + maBuuCuc
    );
  }

  getPostOfficeById(id: number) {
    return this.http.get('smartlocker/api/v1/buu-cucs?id.equals=' + id);
  }
}
