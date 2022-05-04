import { getInterpolationArgsLength } from '@angular/compiler/src/render3/view/util';
import { Pipe, PipeTransform } from '@angular/core';
import { Locker } from './locker.model';

@Pipe({
  name: 'listItemBlock',
})
export class ListItemBlockPipe implements PipeTransform {
  transform(value: Locker[]): Locker[] {
    if (value[0].sequence == 1) {
      return value;
    } else {
      return value.reverse();
    }
  }
}
