export class Cache {

    public static COOKIE:number = 1;
    public static SESSION:number = 2;
    public static STORAGE:number = 3;

    public static map = new Map();

    public static getCookie(name: string) {
        let ca: Array<string> = document.cookie.split(';');
        let caLen: number = ca.length;
        let cookieName = `${name}=`;
        let c: string;

        for (let i: number = 0; i < caLen; i += 1) {
            c = ca[i].replace(/^\s+/g, '');
            if (c.indexOf(cookieName) == 0) {
                return c.substring(cookieName.length, c.length);
            }
        }
        return '';
    }

    public static deleteCookie(name:string) {
        this.setCookie(name, '', -1);
    }

    public static setCookie(name: string, value: string, expiresTime: number, path: string = '/') {
        let d:Date = new Date();
        d.setTime(d.getTime() + expiresTime);
        let expires:string = `expires=${d.toUTCString()}`;
        let cpath:string = path ? `; path=${path}` : '';
        document.cookie = `${name}=${value}; ${expires}${cpath}`;
    }

    public static addCache(key:string, value:string,type:number=Cache.STORAGE,expires:number=60*60*1000){
        switch (type) {
            case Cache.COOKIE:
              Cache.setCookie(key,value,expires);
              break;
            case Cache.SESSION:
              sessionStorage.setItem(key, value);
              break;
            default:
              if(!expires){
                expires = 100*24*60*60*1000;
              }
              let obj2 = {
                value: value,
                expiredAt: new Date().getTime() + expires
              }
              localStorage.setItem(key, JSON.stringify(obj2));
            break;
        }
    }

    public static getCache(key:string,storage:number=Cache.STORAGE):string|null{
        switch (storage) {
            case Cache.COOKIE:
                return Cache.getCookie(key);

            case Cache.SESSION:
              return sessionStorage.getItem(key);

            default :
              let obj2 = JSON.parse(localStorage.getItem(key) || '');
              if (!!obj2) {
                if (new Date().getTime() <= obj2.expiredAt) {
                  return obj2.value;
                } else {
                  localStorage.removeItem(key);
                }
              }
              return null;
        }
    }

    public static clearAll(){
        sessionStorage.clear();
        localStorage.clear();
        var cookies = document.cookie.split(";");
        for (var i = 0; i < cookies.length; i++)
          Cache.deleteCookie(cookies[i].split("=")[0]);
    }

    public static deleteCache(key:string,storage:number=Cache.STORAGE){
        switch (storage) {
            case Cache.COOKIE:
              Cache.deleteCookie(key);
              break;
            case Cache.SESSION:
              sessionStorage.removeItem(key);
              break;
            default:
              localStorage.removeItem(key);
              break;
        }
    }
}

