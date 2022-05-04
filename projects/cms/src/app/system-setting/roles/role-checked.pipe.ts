import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'roleChecked',
})
export class RoleCheckedPipe implements PipeTransform {
  transform(value: number, list: number[]): boolean {
    return list.includes(value);
  }
}
