import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'colorStatusDetail',
})
export class ColorStatusDetailPipe implements PipeTransform {
  transform(value: number): string {
    let color: string;
    switch (value) {
      case 0:
        color = '';
        break;
      case 1:
        color = 'green';
        break;
      case 2:
        color = 'red';
        break;
      case 3:
        color = '#808080';
        break;
      case 4:
        color = 'gold';
        break;
      default:
        break;
    }
    return color;
  }
}
