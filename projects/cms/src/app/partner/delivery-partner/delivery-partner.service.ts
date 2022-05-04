import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DeliveryPartnerService {
  constructor(private http: HttpClient) {}
  getAllDeliveryPartner(
    page: number = 0,
    size: number = 10,
    code: string,
    name: string,
    email: string,
    phone: string
  ) {
    let url =
      'smartlocker-order/api/v1/delivery-partners?page=' +
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

  createDeliveryPartner(
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
      'smartlocker-order/api/v1/delivery-partners',
      JSON.stringify(json)
    );
  }

  editDeliveryPartner(
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
      'smartlocker-order/api/v1/delivery-partners/' + id,
      JSON.stringify(json)
    );
  }

  deleteDeliveryPartner(id: number) {
    return this.http.delete('smartlocker-order/api/v1/delivery-partners/' + id);
  }
}
