import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'displayMarginLocker',
})
export class DisplayMarginLockerPipe implements PipeTransform {
  transform(value: number): string {
    let margintop: string;
    switch (value) {
      case 1:
        margintop = 'mt-1';
        break;
      case 2:
        margintop = 'mt-3';
        break;
      case 3:
        margintop = 'mt-4';
        break;
      case 4:
        margintop = 'mt-9';
        break;
      case 5:
        margintop = 'mt-4';
        break;
      case 6:
        margintop = 'mt-11';
        break;
      default:
        break;
    }
    return margintop;
  }
}
