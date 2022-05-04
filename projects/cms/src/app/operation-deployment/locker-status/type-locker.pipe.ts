import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'typeLocker',
})
export class TypeLockerPipe implements PipeTransform {
  transform(type: any): any {
    let typeName = '-';
    const typeLocker = {
      Indoor: 'Indoor',
      Outdoor: 'Outdoor',
    };
    switch (type) {
      case 1:
        typeName = typeLocker.Indoor;
        break;
      case 2:
        typeName = typeLocker.Outdoor;
        break;
      default:
        typeName = '-';
        break;
    }
    return typeName;
  }
}
