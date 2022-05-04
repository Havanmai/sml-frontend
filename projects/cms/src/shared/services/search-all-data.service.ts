import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SearchAllDataService {
  constructor(private httpClient: HttpClient) {}

  public searchAllData(keyword: string ): Observable<any> {
    let url = 'smartlocker-warehouse/api/v1/ela-search-all';
    if (keyword !== '') {
      url += '/' + keyword;
    }
    else{
      url =url.concat('/','l');
    }
    return this.httpClient.get(url);
  }
}
