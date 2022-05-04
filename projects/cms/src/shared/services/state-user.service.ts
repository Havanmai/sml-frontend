import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class StateUserService {
  constructor(private httpClient: HttpClient) {}

  public getStatesUser(
    pageNumber?: number,
    pageSize?: number
  ): Observable<any> {
    return this.httpClient.get(
      'smartlocker-ticket/api/v1/state-users?page=' +
        pageNumber +
        '&size=' +
        pageSize
    );
  }

  public getAllStatesUser(): Observable<any> {
    return this.httpClient.get('smartlocker-ticket/api/v1/state-users');
  }
  public getLstStatesUserById(id): Observable<any> {
    return this.httpClient.get(
      'smartlocker-ticket/api/v1/state-users?stateId.equals=' + id
    );
  }

  public getAllUser(): Observable<any> {
    let str: string = 'smartlocker/api/v1/users';
    return this.httpClient.get(str);
  }

  public getAllRoles() {
    return this.httpClient.get('smartlocker/api/v1/authorities');
  }

  public searchUser(
    pageNumber: number,
    pageSize: number,
    keyword: string,
    authority: string
  ): Observable<any> {
    let url: string =
      'smartlocker/api/v1/users/search?page=' +
      pageNumber +
      '&size=' +
      pageSize;
    if (keyword && keyword.trim() !== '') {
      url += '&search=' + keyword;
    }

    if (authority && authority.trim() !== '') {
      url += '&authority=' + authority;
    }

    return this.httpClient.get(url);
  }
}
