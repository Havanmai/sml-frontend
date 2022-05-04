import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ServiceService {
  constructor(private http: HttpClient) {}

  getAllService(page: number = 0, size: number = 10, code: string) {
    let url =
      'smartlocker-dichvu/api/v1/dich-vus?page=' + page + '&size=' + size +'&sort=id,desc';
    if (code && code.trim() != '') {
      url = url.concat('&code.equals', code);
    }
    return this.http.get(url);
  }

  deleteService(id: number) {
    return this.http.delete('smartlocker-dichvu/api/v1/dich-vus/' + id);
  }

  createService(code: string, name: string, description: string) {
    let json = {
      code: code,
      description: description,
      name: name,
    };
    return this.http.post(
      'smartlocker-dichvu/api/v1/dich-vus',
      JSON.stringify(json)
    );
  }

  updateService(id: number, code: string, name: string, description: string) {
    let json = {
      id: id,
      code: code,
      description: description,
      name: name,
    };
    return this.http.put(
      'smartlocker-dichvu/api/v1/dich-vus/' + id,
      JSON.stringify(json)
    );
  }

  reloadService$ = new Subject<void>();
  reloadService() {
    this.reloadService$.next();
  }
}
