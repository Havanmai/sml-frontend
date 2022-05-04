import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'textPostofficeDetail',
})
export class TextPostofficeDetailPipe implements PipeTransform {
  transform(value: number): string {
    let titleString = '';
    switch (value) {
      case 10:
        titleString = 'Bưu Cục';
        break;
      case 30:
        titleString = 'Hub';
        break;
      case 40:
        titleString = 'Trung tâm kết nối bay';
        break;
      case 50:
        titleString = 'Cửa hàng';
        break;
      case 60:
        titleString = 'Bưu cục số';
        break;
      default:
        titleString = '-';
    }
    return titleString;
  }
}
