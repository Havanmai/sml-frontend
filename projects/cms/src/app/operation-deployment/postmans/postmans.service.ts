import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class PostmansService {
  constructor(private http: HttpClient) {}

  getAllPostMan(
    page: number = 0,
    size: number = 10,
    userid: string,
    maBuuCuc: string
  ) {
    let url =
      'smartlocker-locker/api/v1/buu-tas?page=' + page + '&size=' + size;
    if (userid && userid.trim() !== '') {
      url = url.concat('&userId.contains=', userid);
    }
    if (maBuuCuc !== undefined && maBuuCuc !== null) {
      url = url.concat('&maBuuCuc.equals=', maBuuCuc);
    }

    return this.http.get(url);
  }

  getBuuCucSearch(page: number = 0, size: number = 10) {
    let url = 'smartlocker/api/v1/buu-cucs?page=' + page + '&size=' + size;

    return this.http.get(url);
  }
}
