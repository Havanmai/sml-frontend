import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Constants } from 'common';
import { url } from 'inspector';

@Injectable({
  providedIn: 'root',
})
export class UpdateService {
  constructor(private httpClient: HttpClient) {}

  createVersion(
    type: number,
    category: number,
    versionName: string,
    file: any,
    updater: any,
    des: string
  ) {
    const formData = new FormData();
    formData.append('categoryId', category + '');
    formData.append('description', des);
    formData.append('file', file);
    formData.append('type', type + '');
    if (updater) formData.append('updater', updater);
    formData.append('version', versionName);
    return this.httpClient.post<FormData>(
      'smartlocker-locker/api/v1/version-controls',
      formData
    );
  }

  getAllLockerCategory() {
    return this.httpClient.get(
      'smartlocker-locker/api/v1/locker-cabinet-categories?page=0&size=200'
    );
  }

  getALlVersion(page: number, size: number) {
    return this.httpClient.get(
      'smartlocker-locker/api/v1/version-controls?page=' +
        page +
        '&size=' +
        size
    );
  }

  updateStatus(id: number, status: number) {
    return this.httpClient.patch<string>(
      'smartlocker-locker/api/v1/version-controls/' +
        id +
        '/update-status?status=' +
        status,
      ''
    );
  }
}
