import {
  RouteReuseStrategy,
  DetachedRouteHandle,
  ActivatedRouteSnapshot,
} from '@angular/router';
import { ComponentRef, Injectable } from '@angular/core';

@Injectable()
export class CustomRouteReuseStrategy implements RouteReuseStrategy {
  private handlers: { [key: string]: RootHandler } = {};
  // xem router này có thể tách ra sử dụng cho sau này hay không
  shouldDetach(route: ActivatedRouteSnapshot): boolean {
    return this.isDetachable(route);
  }

  //Theo dõi thời gian lưu trữ tuyến đường, lưu trữ các tuyến đường riêng biệt
  store(route: ActivatedRouteSnapshot, handler: DetachedRouteHandle) {
    const storeKey = this.getStoreKey(route);
    if (handler) {
      const rootHandler = {
        handle: handler,
        storeTime: +new Date(),
      };
      this.handlers[storeKey] = rootHandler;
    }
  }
  //Xác định xem tuyến đường này có nên đc gắn lại hay không
  shouldAttach(route: ActivatedRouteSnapshot): boolean {
    const storeKey = this.getStoreKey(route);
    if (this.isAtachable(route, storeKey)) {
      this.clearNewerHandlerOnAttach(this.handlers[storeKey].storeTime);
      return true;
    }
    return false;
  }
  // Truy xuất đến tuyến đường đã được lưu trc đó
  retrieve(route: ActivatedRouteSnapshot): DetachedRouteHandle {
    const storeKey = this.getStoreKey(route);
    return this.handlers[storeKey]?.handle;
  }

  // Xác định xem tuyến đường có nên được sử dụng lại hay không
  shouldReuseRoute(
    future: ActivatedRouteSnapshot,
    current: ActivatedRouteSnapshot
  ): boolean {
    return future.routeConfig === current.routeConfig;
  }

  private getResolvedUrl(route: ActivatedRouteSnapshot): string {
    return route.pathFromRoot
      .map((v) => v.url.map((segment) => segment.toString()).join('/'))
      .join('/');
  }

  private getStoreKey(route: ActivatedRouteSnapshot): string {
    const baseUrl = this.getResolvedUrl(route);
    const childrenParts = [];
    let deepestChild = route;
    while (deepestChild.firstChild) {
      deepestChild = deepestChild.firstChild;
      childrenParts.push(deepestChild.url.join('/'));
    }
    return baseUrl + '////' + childrenParts.join('/');
  }

  // Đánh dấu tuyến đường cần lưu trữ shouldDetach:true
  // Xem cấu hình tuyến
  private isDetachable(route: ActivatedRouteSnapshot) {
    if (route?.routeConfig?.data?.shouldDetach) {
      return true;
    }
    return false;
  }

  private isAtachable(route: ActivatedRouteSnapshot, storeKey: string) {
    if (this.isDetachable(route) && this.handlers[storeKey]?.handle) {
      return true;
    }
    return false;
  }

  /*
  Xóa các lưu trữ trước đó và lưu dữ liệu mới nhất
  */
  private clearNewerHandlerOnAttach(storeTime: number) {
    const handlerKeys = Object.keys(this.handlers);
    handlerKeys.forEach((k) => {
      if (this.handlers[k].storeTime > storeTime) {
        const componentRef: ComponentRef<any> = (this.handlers[k].handle as any)
          .componentRef;
        if (componentRef) {
          componentRef.destroy();
        }
        delete this.handlers[k];
      }
    });
  }
}

export interface RootHandler {
  handle: DetachedRouteHandle;
  storeTime: number;
}
