import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateText',
})
export class DateTextPipe implements PipeTransform {
  transform(value: string): string {
    let date = new Date(value);
    let datetime = date.toISOString().substring(0, 10);
    let arrdate = datetime.split('-');
    let datestring = arrdate[2].concat('/', arrdate[1], '/', arrdate[0]);
    return datestring;
  }
}
