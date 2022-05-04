import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'typeLockerName',
})
export class TypeLockerNamePipe implements PipeTransform {
  transform(value: number): string {
    let nameType: string;
    switch (value) {
      case 1:
        nameType = 'S';
        break;
      case 2:
        nameType = 'M';
        break;
      case 3:
        nameType = 'L';
        break;
      case 4:
        nameType = 'LCD';
        break;
      case 5:
        nameType = 'BOX';
        break;
      case 6:
        nameType = 'T';
        break;
      default:
        nameType = '-';
        break;
    }
    return nameType;
  }
}
