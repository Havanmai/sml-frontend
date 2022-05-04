import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Constants } from './constants';
import {  Subject } from 'rxjs';
import { Router } from '@angular/router';
import { Cache } from './cache';
import { RequestOptions } from './request-options';
import { UserModel } from './user.model';

@Injectable({
  providedIn: 'root'
})
export class BaseService {

  tongleMenu$ = new Subject<void>();
  showLoading$ = new Subject<boolean>();
  showNotification$ = new Subject<any>();
  showToast$ = new Subject<any>();

  isCollapsed:boolean = false;

  loadUserDataDone$ = new Subject<void>();
  loadUserDataDone(){
    this.loadUserDataDone$.next();
  }

  tonggleMenu(){
    this.tongleMenu$.next();
  }

  menuCollapsed$ = new Subject<boolean>();
  menuCollapsed(status:boolean){
    this.isCollapsed = status;
    this.menuCollapsed$.next(status);
  }

  showLoading(enable:boolean){
    this.showLoading$.next(enable);
  }

  login(username:string,pasword:string,remember:boolean = false){
    let obj = {
      password: pasword,
      rememberMe: remember,
      username: username
    }
    return this.httpClient.post<string>('api/authenticate',JSON.stringify(obj),
    {
      params: new RequestOptions(false, 0, true, true),
    });
  }

  getUserDetail(){
    return this.httpClient.get("smartlocker/api/account");
  }

  getCachedUser():UserModel{
    try {
      const currentUserStr = Cache.getCache(
        Constants.CACHE_USER_DETAIL,
        Cache.STORAGE
      );
      if (currentUserStr) {
        const currentUser: UserModel = new UserModel(
          JSON.parse(currentUserStr)
        );
        return currentUser;
      }
    } catch (e) {}

    return null;
  }

  public storeUserDetail(obj: any, ttl: number = 60 * 60 * 1000) {
    Cache.addCache(
      Constants.CACHE_USER_DETAIL,
      JSON.stringify(obj),
      Cache.STORAGE,
      ttl
    );
  }

  isLogin():boolean{
    if(this.getUserToken())
      return true;
    else
      return false;
  }


  logout(){
    Cache.clearAll();
    setTimeout(() => {
      this.router.navigateByUrl("/login");
    }, 200);
  }

  goto403Page(){
    this.router.navigateByUrl("/restricted")
  }

  showToast(prop: string,type:number = Constants.TOAST_INFO, duration:number = Constants.TOAST_DURATION_DEFAULT) {
    this.showToast$.next({prop:prop,type:type,duration:duration});
  }


  showNotification(prop: string,type:number = Constants.NOTI_INFO, title:string=Constants.NOTI_INFO_DEFAULT, duration:number = Constants.NOTI_DURATION_DEFAULT) {
    this.showNotification$.next({prop:prop,type:type,title:title,duration:duration});
  }

  getUserToken(){
    let accessToken = Cache.getCache(Constants.CACHE_TOKEN, Cache.COOKIE);
    return accessToken;
  }

  public storeAccessToken(token: string, ttl: number = 60 * 60 * 1000) {
    Cache.addCache(Constants.CACHE_TOKEN, token, Cache.COOKIE, ttl);
  }

  constructor(private httpClient:HttpClient, private router:Router) {

  }

  goBack(){
    window.history.back();
  }

  navigateTo(url:string,href:boolean = false){
    if(href){
      window.location.href = url;
    }else{
      this.router.navigateByUrl(url);
    }
  }
}
