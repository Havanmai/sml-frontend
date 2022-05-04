import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class RoleService {
  constructor(private httpClient: HttpClient) {}

  getAllPermission() {
    return this.httpClient.get(
      'smartlocker/api/v1/admin/permissions/get-tree-permission'
    );
  }

  getAllRoles() {
    return this.httpClient.get('smartlocker/api/v1/admin/authorities');
  }

  createRole(name: string, des: string, permission: number[]) {
    let obj = {
      description: des,
      name: name,
      permissions: [],
    };

    permission.forEach((item) => {
      obj.permissions.push({
        id: item,
      });
    });
    return this.httpClient.post<string>(
      'smartlocker/api/v1/admin/authority',
      JSON.stringify(obj)
    );
  }

  updateRole(name: string, des: string, permission: number[]) {
    let obj = {
      description: des,
      name: name,
      permissions: [],
    };

    permission.forEach((item) => {
      obj.permissions.push({
        id: item,
      });
    });
    return this.httpClient.put<string>(
      'smartlocker/api/v1/admin/authorities/' + name,
      JSON.stringify(obj)
    );
  }

  deleteRole(name: string) {
    return this.httpClient.delete(
      'smartlocker/api/v1/admin/authorities/' + name
    );
  }

  getRoleDetail(name: string) {
    return this.httpClient.get('smartlocker/api/v1/admin/authorities/' + name);
  }
}
