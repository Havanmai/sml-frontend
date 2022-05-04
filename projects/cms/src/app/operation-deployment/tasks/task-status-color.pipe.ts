import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'taskStatusColor',
})
export class TaskStatusColorPipe implements PipeTransform {
  transform(value: number): string {
    let colorStatus;
    switch (value) {
      case 1:
        colorStatus = 'green';
        break;
      case 2:
        colorStatus = 'gold';
        break;
      case 3:
        colorStatus = 'red';
        break;
      default:
        colorStatus = '';
        break;
    }
    return colorStatus;
  }
}
