import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateHistory',
})
export class DateHistoryPipe implements PipeTransform {
  transform(value: Date): string {
    let date = new Date(value.toString());
    let dateText = date.toLocaleDateString('en-GB');
    let timeText = date.toTimeString().substring(0, 8);
    return timeText.concat(' _ ', dateText);
  }
}
