import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'textDetailSessionType',
})
export class TextDetailSessionTypePipe implements PipeTransform {
  transform(value: number): string {
    let textStatus: string;
    switch (value) {
      case 1:
        textStatus = 'Khánh hàng gửi hàng'; //có thông tin ngăn tủ *
        break;
      case 2:
        textStatus = 'Khách hàng nhận hàng'; //*
        break;
      case 3:
        textStatus = 'Bưu tá lấy hàng'; // có thông tin bwuuw tá*
        break;
      case 4:
        textStatus = 'Bưu tá gửi hàng'; // có thông tin bwuuw tá*
        break;
      case 5:
        textStatus = 'Bưu tá cho phép mở tủ trên APP VTMan';
        break;
      case 6:
        textStatus = 'Thu hồi'; //*
        break;
      case 7:
        textStatus = 'Quá hạn lần 1 và đã gửi tin nhắn cho bưu tá';
        break;
      case 8:
        textStatus = 'Quá hạn lần 1 và đã gửi tin nhắn cho bưu tá';
        break;
      case 9:
        textStatus = 'Khách hàng yêu cầu khóa khẩn cấp';
        break;
      case 10:
        textStatus = 'Khách hàng yêu cầu mở khẩn cấp';
        break;
      case 11:
        textStatus = 'Quản trị viên yêu cầu khóa khẩn cấp';
        break;
      case 12:
        textStatus = 'Quản trị viên mở khóa khẩn cấp';
        break;
      default:
        textStatus = '-';
    }
    return textStatus;
  }
}
