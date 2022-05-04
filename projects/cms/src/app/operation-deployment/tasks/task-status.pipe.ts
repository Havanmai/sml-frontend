import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'taskStatus',
})
export class TaskStatusPipe implements PipeTransform {
  transform(value: number): string {
    let titleStatus;
    switch (value) {
      case 1:
        titleStatus = 'Đang thực hiện';
        break;
      case 2:
        titleStatus = 'Hoàn thành';
        break;
      case 3:
        titleStatus = 'Hủy';
        break;
      default:
        titleStatus = '';
        break;
    }
    return titleStatus;
  }
}
