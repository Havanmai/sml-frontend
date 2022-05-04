import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'vandonType',
})
export class VandonTypePipe implements PipeTransform {
  transform(value: number): string {
    let vandon;
    switch (value) {
      case 1:
        vandon = 'Bưu tá gửi';
        break;
      case 2:
        vandon = 'Khách hàng gửi';
        break;
      case 3:
        vandon = 'Tủ gửi đồ';
        break;
      default:
        vandon = '-';
        break;
    }
    return vandon;
  }
}
