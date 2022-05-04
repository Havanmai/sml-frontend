import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PermissionService {
  listPermissionGroup: any[];

  reloadGroupList$ = new Subject<void>();
  reloadGroup() {
    this.reloadGroupList$.next();
  }

  reloadPermissionList$ = new Subject<void>();
  reloadPermission() {
    this.reloadPermissionList$.next();
  }

  editPermissionGroupDialog$ = new Subject<any>();
  showEditPermissionGroup(group: any) {
    this.editPermissionGroupDialog$.next(group);
  }

  editPermissionDialog$ = new Subject<any>();
  showEditPermission(permission: any) {
    this.editPermissionDialog$.next(permission);
  }

  constructor(private httpClient: HttpClient) {}

  getAllGroup() {
    return this.httpClient.get('smartlocker/api/v1/admin/permision-groups');
  }

  setListPermissionGroup(data: any[]) {
    this.listPermissionGroup = data;
  }

  createGroup(groupName: string) {
    let obj = {
      id: null,
      name: groupName,
    };

    return this.httpClient.post<string>(
      'smartlocker/api/v1/admin/permision-groups',
      JSON.stringify(obj)
    );
  }

  updateGroup(id: number, name: string) {
    let obj = {
      id: id,
      name: name,
    };
    return this.httpClient.put<string>(
      'smartlocker/api/v1/admin/permision-groups/' + id,
      JSON.stringify(obj)
    );
  }

  deleteGroup(id: number) {
    return this.httpClient.delete(
      'smartlocker/api/v1/admin/permision-groups/' + id
    );
  }

  getPermission(
    page: number = 0,
    size: number = 10,
    keyword: string = '',
    group: number = 0
  ) {
    let str =
      'smartlocker/api/v1/admin/permissions?page=' + page + '&size=' + size;
    if (keyword && keyword.trim() !== '') str += '&name.contains=' + keyword;
    if (group) str += '&groupId.equals=' + group;
    return this.httpClient.get(str);
  }

  createPermission(name: string, group: number) {
    let obj = {
      group: {
        id: group,
        name: null,
      },
      id: null,
      name: name,
    };
    return this.httpClient.post<string>(
      'smartlocker/api/v1/admin/permissions',
      JSON.stringify(obj)
    );
  }

  deletePermission(id: number) {
    return this.httpClient.delete('smartlocker/api/v1/admin/permissions/' + id);
  }

  updatePermission(id: number, name: string, group: number) {
    let obj = {
      group: {
        id: group,
        name: null,
      },
      id: id,
      name: name,
    };
    return this.httpClient.put<string>(
      'smartlocker/api/v1/admin/permissions/' + id,
      JSON.stringify(obj)
    );
  }
}
