import {
  HttpEvent,
  HttpRequest,
  HttpInterceptor,
  HttpHandler,
  HttpResponse,
  HttpErrorResponse,
  HttpEventType,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, retry, tap } from 'rxjs/operators';
import 'rxjs/add/observable/of';
import { RequestOptions } from './request-options';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { Constants } from './constants';
import { BaseService } from './base.service';
import { md5 } from './md5';
import { Cache } from './cache';


@Injectable()
export class MyInterceptor implements HttpInterceptor {

  private apiURL: string;

  constructor( private baseService : BaseService) {
    this.apiURL = Constants.API_URL_BASE;
  }
  intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (!/^(http|https):/i.test(req.url)) {
      if(req.url !='api/authenticate'){
        req = req.clone({ url: this.apiURL + req.url });
      }else
      {
        req = req.clone({ url: this.apiURL.slice(0,35) + req.url });
      }

    }

    if (this.isCacheEnabled(req)) {
      const cachedResponse = this.getCache(req);
      return cachedResponse
        ? Observable.of(cachedResponse)
        : this.sendRequest(req, next);
    }
    return this.sendRequest(req, next);

  }

  sendRequest(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    //get token
    if (!this.isNoToken(req)) {
      let accessToken = this.baseService.getUserToken();
      if (!accessToken) {
        return this.doAction(req, next);
      } else {
        if (req.headers == null || req.headers === undefined) {
          req = req.clone({
            setHeaders: {
              Authorization: 'Bearer ' + accessToken,
            },
          });
        } else {
          req = req.clone({
            setHeaders: {
              Authorization: 'Bearer ' + accessToken,
            },
          });
        }
        return this.doAction(req, next);
      }
    } else {
      return this.doAction(req, next);
    }
  }

  private doAction(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (!req.headers.has('Content-Type') && !(req.body instanceof FormData)) {
      req = req.clone({
        setHeaders: {
          'Content-Type': 'application/json; charset=utf-8',
        },
      })
    }
    return next
      .handle(req)
      .pipe(
        tap((event) => {
          if (event instanceof HttpResponse) {
            if(event.body.error > 0){
              this.errorProcess(event.body.error,event.body.message);
              Observable.throw(event.body.error);
            }

            if (this.isCacheEnabled(req)) {
              this.putCache(req, event);
            }
          }
        })
      ).catch((error:HttpErrorResponse) => {
        this.baseService.showLoading(false);
        if (error.status || (error.error && error.error.code)) {
          if (error.status === 401 || error.error.code === 401) {
            this.errorProcess(401);
            return Observable.throw(error);
          } else if (error.status === 403 || error.error.code === 403) {
            this.errorProcess(403);
            return Observable.throw(error);
          } else {
            if (error.error && error.error.code) {
              this.errorProcess(500, error.error.message)
            } else {
              if (error.status && !this.isErrorPassing(req)) {
                this.errorProcess(500,  error.message);
              }
            }
            return Observable.throw(error);
          }
        } else {
          if (!this.isErrorPassing(req)) {
            if (error.message)
            {
            this.errorProcess(500,  error.message);}
            else this.baseService.showNotification('Lỗi không xác định', Constants.NOTI_ERROR);
          }
          return Observable.throw(error);
        }
      });
  }

  errorProcess(errorCode:any, message:string =""){
    switch(errorCode){
      case 401:
        this.baseService.showNotification(
          'Bạn chưa đăng nhập, vui lòng đăng nhập',
          Constants.NOTI_ERROR,
          'Lỗi đăng nhập'
        );
        this.baseService.logout();
        break;
      case 403:
        this.baseService.goto403Page();
        break;
      default:
        this.baseService.showNotification(
          'Chi tiết lỗi: mã lỗi' +
            errorCode +
            ', thông điệp:' +
            message,
          Constants.NOTI_ERROR
        );
        break;
    }
  }

  private isCacheEnabled(req: HttpRequest<any>) {
    return req.params instanceof RequestOptions && req.params.cache;
  }

  private isErrorPassing(req: HttpRequest<any>) {
    return req.params instanceof RequestOptions && req.params.errorPassing;
  }

  private isNoToken(req: HttpRequest<any>) {
    return req.params instanceof RequestOptions && req.params.noToken;
  }

  private generateCacheKey(url: HttpRequest<any>): string {
    let str = [];
    str.push(url.urlWithParams);
    if (!!url.body) {
      str.push(JSON.stringify(url.body));
    }
    return md5(str.join(':'));
  }

  getCache(req: HttpRequest<any>): HttpResponse<any> | undefined {
    let cacheData = Cache.getCache(this.generateCacheKey(req));
    if (cacheData) {
      let cachedResponse = new HttpResponse<any>();
      Object.assign(cachedResponse, JSON.parse(cacheData));
      return cachedResponse;
    }
    return undefined;
  }

  putCache(req: HttpRequest<any>, response: HttpResponse<any>): void {
    let cacheTtl: number = 10 * 60 * 1000;
    if (req.params instanceof RequestOptions && req.params.ttl > 0) {
      cacheTtl = req.params.ttl;
    }
    Cache.addCache(
      this.generateCacheKey(req),
      JSON.stringify(response),
      Cache.STORAGE,
      new Date().getTime() + cacheTtl
    );
  }
}
