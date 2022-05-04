import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sizeLocked',
})
export class SizeLockedPipe implements PipeTransform {
  transform(value: number): number {
    let size: number;
    let sizebase: number = 30;
    switch (value) {
      case 1:
        size = sizebase * 1;
        break;
      case 2:
        size = sizebase * 2 + 1 * 3.5 - 5 * 2;
        break;
      case 3:
        size = sizebase * 3 + 2 * 3.5 - 5 * 3;
        break;
      case 4:
        /* size=sizebase*7+6*3.5-5*1.75*1.2*2; */
        size = sizebase * 7 + 9 * 3.5 - 5 * 4.2; //4.2
        break;
      case 5:
        size = sizebase * 3 + 2 * 3.5 - 5 * 3;
        break;
      case 6:
        /* size=sizebase*9+8*3.5-5*1.75*2*3.3; */
        size = sizebase * 9 + 11 * 3.5 - 5 * 5.04; //5.04
        break;
      default:
        break;
    }
    return size;
  }
}
