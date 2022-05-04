import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateText',
})
export class DateTextPipe implements PipeTransform {
  transform(value: Date): string {
    let date = new Date(value.toString());
    return date.toLocaleDateString();
  }
}
