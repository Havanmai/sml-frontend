import { Pipe, PipeTransform } from '@angular/core';
import { BillsType } from '../constants/waybills.constants';

@Pipe({
  name: 'billname',
})
export class BillNamePipe implements PipeTransform {
  transform(value: number): any {
    const billsType = BillsType;
    let name = '';
    switch (value) {
      case billsType.NHAPKHO:
        name = 'Nhập Kho';
        break;
      case billsType.XUATKHO:
        name = 'Xuất Kho';
        break;
      case billsType.CHUYENKHO:
        name = 'Chuyển Kho';
        break;
      case billsType.HOANKHO:
        name = 'Hoàn Kho';
        break;
    }
    return name;
  }
}
