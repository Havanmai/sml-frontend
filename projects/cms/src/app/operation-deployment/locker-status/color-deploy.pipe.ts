import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'colorDeploy',
})
export class ColorDeployPipe implements PipeTransform {
  transform(value: number) {
    let color: string;
    switch (value) {
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
        color = 'yellow';
        break;
      default:
        color = '';
        break;
    }
    return color;
  }
}
