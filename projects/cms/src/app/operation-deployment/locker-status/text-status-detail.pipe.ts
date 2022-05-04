import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'textStatusDetail',
})
export class TextStatusDetailPipe implements PipeTransform {
  transform(value: number): string {
    let text: string;
    switch (value) {
      case 0:
        text = 'OFFLINE';
        break;
      case 1:
        text = 'ONLINE';
        break;
      case 2:
        text = 'ERROR';
        break;
      case 3:
        text = 'FULL';
        break;
      case 4:
        text = 'LOCKED';
        break;
      default:
        break;
    }
    return text;
  }
}
