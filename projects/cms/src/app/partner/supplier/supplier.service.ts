import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SupplierService {
  constructor(private http: HttpClient) {}

  getAllSupplier(
    page: number = 0,
    size: number = 10,
    code: string,
    name: string,
    email: string,
    phone: string
  ) {
    let url =
      'smartlocker-locker/api/v1/suppliers?page=' +
      page +
      '&size=' +
      size +
      '&sort=id,desc';
    if (code && code.trim() != '') {
      url = url.concat('&concat.contains=', code);
    }
    if (name && name.trim() != '') {
      url = url.concat('&name.contains=', name);
    }
    if (email && email.trim() != '') {
      url = url.concat('&email.contains=', email);
    }
    if (code && code.trim() != '') {
      url = url.concat('&phoneNumber.contains=', phone);
    }

    return this.http.get(url);
  }

  createSupplier(
    code: string,
    name: string,
    email: string,
    phoneNumber: string,
    address: string,
    note: string,
    status: number
  ) {
    let json = {
      address: address,
      code: code,
      email: email,
      name: name,
      note: note,
      phoneNumber: phoneNumber,
      status: status,
    };
    return this.http.post(
      'smartlocker-locker/api/v1/suppliers',
      JSON.stringify(json)
    );
  }

  editSupplier(
    id: number,
    code: string,
    name: string,
    email: string,
    phoneNumber: string,
    address: string,
    note: string,
    status: number
  ) {
    let json = {
      id: id,
      address: address,
      code: code,
      email: email,
      name: name,
      note: note,
      phoneNumber: phoneNumber,
      status: status,
    };
    return this.http.put(
      'smartlocker-locker/api/v1/suppliers/' + id,
      JSON.stringify(json)
    );
  }

  deleteSupplier(id: number) {
    return this.http.delete('smartlocker-locker/api/v1/suppliers/' + id);
  }
}
