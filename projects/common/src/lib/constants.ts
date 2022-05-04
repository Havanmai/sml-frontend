export class Constants {
  // public static API_URL_BASE: string = 'http://10.61.145.153:8181/services/';
  // public static API_URL_BASE: string = 'http://10.61.145.55:8080/api';
   public static API_URL_BASE: string = 'https://box-api-dev.viettelpost.vn/services/';
  static TOAST_OK: number = 1;
  static TOAST_WARNING: number = 2;
  static TOAST_ERROR: number = 3;
  static TOAST_INFO: number = 4;
  static TOAST_DURATION_DEFAULT: number = 4000;
  static TOAST_LOADING: number = 5;
  static TOAST_EVENT: string = 'showToast';

  static HIDE_LOADING: string = 'hideMainLoading';
  static SHOW_LOADING: string = 'showMainLoading';

  static NOTI_EVENT: string = 'showNotification';
  static NOTI_DURATION_DEFAULT: number = 6000;
  static NOTI_OK: number = 6;
  static NOTI_WARNING: number = 7;
  static NOTI_ERROR: number = 8;
  static NOTI_INFO: number = 9;
  static NOTI_OK_DEFAULT: string = 'Thành công';
  static NOTI_WARNING_DEFAULT: string = 'Cảnh báo';
  static NOTI_ERROR_DEFAULT: string = 'Lỗi';
  static NOTI_INFO_DEFAULT: string = 'Thông báo';

  static CACHE_REQUESTS_TTL: number = 600000; // in milisec, 600 000 ms = 10 minutes
  static CACHE_TOKEN: string = 'user:token';
  static CACHE_USER_DETAIL: string = 'user:detail';
  static CACHE_REMEMBER_ME: string = 'remember:me';
}
