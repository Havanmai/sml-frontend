import { Pipe, PipeTransform } from '@angular/core';
import { Locker } from './locker.model';

@Pipe({
  name: 'middleNumberBock',
})
export class MiddleNumberBockPipe implements PipeTransform {
  transform(value: Locker[]): number {
    let itemslice: number;
    let half = this.getTotal(value) / 2;
    let totalItem = 0;
    value.forEach((itemValue, index) => {
      let sizeitem: number;
      let sizebaseitem: number = 1;
      switch (itemValue.sizeType) {
        case 1:
          sizeitem = sizebaseitem * 1;
          break;
        case 2:
          sizeitem = sizebaseitem * 2;
          break;
        case 3:
          sizeitem = sizebaseitem * 3;
          break;
        case 4:
          sizeitem = sizebaseitem * 7;
          break;
        case 5:
          sizeitem = sizebaseitem * 3;
          break;
        case 6:
          sizeitem = sizebaseitem * 9;
          break;
        default:
          break;
      }

      totalItem = totalItem + sizeitem;
      if (totalItem == half) {
        itemslice = index + 1;
      }
    });
    return itemslice;
  }

  getTotal(value: any): number {
    let totalSize = 0;
    value.forEach((item) => {
      let size: number;
      let sizebase: number = 1;
      switch (item.sizeType) {
        case 1:
          size = sizebase * 1;
          break;
        case 2:
          size = sizebase * 2;
          break;
        case 3:
          size = sizebase * 3;
          break;
        case 4:
          size = sizebase * 7;
          break;
        case 5:
          size = sizebase * 3;
          break;
        case 6:
          size = sizebase * 9;
          break;
        default:
          break;
      }
      totalSize = totalSize + size;
    });
    return totalSize;
  }
}
