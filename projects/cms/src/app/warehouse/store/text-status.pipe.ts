import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'textStatus',
})
export class TextStatusPipe implements PipeTransform {
  transform(value: number): string {
    let text: string;
    switch (value) {
      case 1:
        text = 'Chưa xuất';
        break;
      case 2:
        text = 'Đã xuất';
        break;
      case 3:
        text = 'Hỏng';
        break;
      case 4:
        text = 'Sửa chữa';
        break;
      default:
        text = '-';
        break;
    }
    return text;
  }
}
