import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateFile',
})
export class DateFilePipe implements PipeTransform {
  transform(value: Date): string {
    let date = new Date(value.toString());
    return date.toDateString();
  }
}
