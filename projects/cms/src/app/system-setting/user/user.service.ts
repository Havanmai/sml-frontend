import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  listRoles: any[];

  constructor(private httpClient: HttpClient) {}

  createUser(data: any) {
    let obj = {
      activated: data.status,
      authorities: data.roles,
      createdBy: '',
      createdDate: '',
      email: data.email,
      firstName: data.firstName,
      id: null,
      imageUrl: '',
      langKey: 'vi',
      lastModifiedBy: '',
      lastModifiedDate: '',
      lastName: data.lastName,
      login: data.username,
      password: data.password,
    };

    return this.httpClient.post<string>(
      'smartlocker/api/v1/admin/users',
      JSON.stringify(obj)
    );
  }

  getUsers(
    page: number,
    size: number,
    keyword: string = '',
    role: string = ''
  ) {
    let str: string =
      'smartlocker/api/v1/admin/users?page=' + page + '&size=' + size;
    if (keyword && keyword.trim() !== '') {
      str +=
        '&email.contains=' +
        keyword +
        '&lastName.contains=' +
        keyword +
        '&firstName.contains=' +
        keyword +
        '&login.contains=' +
        keyword;
    }

    if (role && role.trim() !== '') {
      str += '&role.contains=' + role;
    }

    return this.httpClient.get(str);
  }

  getAllRoles() {
    return this.httpClient.get('smartlocker/api/v1/admin/authorities');
  }

  deleteUser(login: string) {
    return this.httpClient.delete('smartlocker/api/v1/admin/users/' + login);
  }

  getUserDetail(login: string) {
    return this.httpClient.get('smartlocker/api/v1/admin/users/' + login);
  }

  updateUser(data: any) {
    let obj = {
      activated: data.status,
      authorities: data.roles,
      createdBy: '',
      createdDate: '',
      email: data.email,
      firstName: data.firstName,
      id: data.id,
      imageUrl: '',
      langKey: 'vi',
      lastModifiedBy: '',
      lastModifiedDate: '',
      lastName: data.lastName,
      login: data.username,
      password: data.password,
    };

    return this.httpClient.put<string>(
      'smartlocker/api/v1/admin/users',
      JSON.stringify(obj)
    );
  }
}
