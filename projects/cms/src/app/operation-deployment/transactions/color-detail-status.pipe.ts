import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'colorDetailStatus',
})
export class ColorDetailStatusPipe implements PipeTransform {
  transform(value: number): string {
    let colorStatus: string;
    switch (value) {
      case 1:
        colorStatus = 'gold';
        break;
      case 2:
        colorStatus = 'orange';
        break;
      case 3:
        colorStatus = 'volcano';
        break;
      case 4:
        colorStatus = 'green';
        break;
      case 5:
        colorStatus = 'purple';
        break;
      case 6:
        colorStatus = 'red';
        break;
      case 7:
        colorStatus = 'cyan';
        break;
      case 8:
        colorStatus = 'blue';
        break;
      case 9:
        colorStatus = 'gray';
        break;
      default:
        colorStatus = '';
    }
    return colorStatus;
  }
}
