import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'textReason',
})
export class TextReasonPipe implements PipeTransform {
  transform(value: number): string {
    let textReason: string;
    switch (value) {
      case 1:
        textReason = 'Bưu tá nhận';
        break;
      case 2:
        textReason = 'Bưu tá thu hồi';
        break;
      case 3:
        textReason = 'Khách nhận';
        break;
      case 4:
        textReason = 'Không đủ điều kiện';
        break;
      case 5:
        textReason = 'Tạm khóa';
        break;
      case 6:
        textReason = 'Bảo trì';
        break;
      case 7:
        textReason = 'Test';
        break;
      default:
        textReason = '-';
    }
    return textReason;
  }
}
