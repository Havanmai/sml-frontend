import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'taskType',
})
export class TaskTypePipe implements PipeTransform {
  transform(value: number): string {
    let titleType;
    switch (value) {
      case 1:
        titleType = 'Nhập kho';
        break;
      case 2:
        titleType = 'Xuất kho';
        break;
      case 3:
        titleType = 'Hoàn hàng';
        break;
      case 4:
        titleType = 'Chuyển kho';
        break;
      case 5:
        titleType = 'Sửa chữa';
        break;
      case 6:
        titleType = 'Bảo trì';
        break;
      default:
        titleType = 'Chưa có ';
        break;
    }
    return titleType;
  }
}
