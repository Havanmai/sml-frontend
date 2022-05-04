import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({
  name: 'datetimePipe',
})
export class DatetimePipe implements PipeTransform {
  public transform(value: string, format = 'DD-MMM-YYYY, HH:mm'): string {
    const date = moment.utc(value).local().format(format);
    return date;
  }
}
