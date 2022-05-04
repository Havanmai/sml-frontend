import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'textDetailStatus',
})
export class TextDetailStatusPipe implements PipeTransform {
  transform(value: number): string {
    let textStatus: string;
    switch (value) {

      case 1:
        textStatus = 'Chờ khách lấy';
        break;
      case 2:
        textStatus = 'Quá hạn 24h';
        break;
      case 3:
        textStatus = 'Quá hạn 48h';
        break;
      case 4:
        textStatus = 'Khách đã nhận';
        break;
      case 5:
        textStatus = 'Đã thu hồi';
        break;
      case 6:
        textStatus = 'Đã khóa';
        break;
      case 7:
        textStatus = 'Chờ bưu tá lấy';
        break;
      case 8:
        textStatus = 'Bưu tá nhận hàng';
        break;
      case 9:
        textStatus = 'Hủy đơn';
        break;
      default:
        textStatus = '-';
    }
    return textStatus;
  }
}
