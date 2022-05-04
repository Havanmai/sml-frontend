import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({
  name: 'dateFullVnPipe',
})
export class DateFullVnPipe implements PipeTransform {
  public transform(
    value: string,
    format = '[Ngày] DD [tháng] MM [năm] YYYY'
  ): string {
    const date = moment.utc(value).local().format(format);
    return date;
  }
}
