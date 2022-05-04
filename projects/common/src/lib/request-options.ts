import { HttpParams } from '@angular/common/http';
import { Constants } from './constants';

export class RequestOptions extends HttpParams {
  constructor(
    public cache: boolean = false,
    public ttl: number = Constants.CACHE_REQUESTS_TTL,
    public errorPassing: boolean = false,
    public noToken: boolean = false
  ) {
    super();
  }
}
