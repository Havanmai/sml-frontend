import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  constructor(private http: HttpClient) {}

  provinceSelectes$ = new Subject<void>();
  selectProvinceTab() {
    this.provinceSelectes$.next();
  }

  distSelectes$ = new Subject<void>();
  selectDistTab() {
    this.distSelectes$.next();
  }

  wardSelectes$ = new Subject<void>();
  selectWardTab() {
    this.wardSelectes$.next();
  }

  getAllBuuCuc(
    page: number = 0,
    size: number = 10,
    codeSearch: string,
    maTinh: string,
    maQuanHuyen: string,
    phuongXaId: number
  ) {
    let url = 'smartlocker/api/v1/buu-cucs?page=' + page + '&size=' + size;
    if (codeSearch && codeSearch.trim() !== '') {
      url = url.concat('&maBuuCuc.contains=', codeSearch);
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
    return this.http.get(url);
  }
}
