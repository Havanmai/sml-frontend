import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'levelPost',
})
export class LevelPostPipe implements PipeTransform {
  transform(value: number, name: string): string {
    let stringLevel: string;
    switch (value) {
      case 10:
        if (name.toLocaleUpperCase().startsWith('HUB')) {
          stringLevel = '';
        } else if (name.toLocaleUpperCase().startsWith('CH')) {
          stringLevel = '';
        } else {
          stringLevel = 'Bưu Cục';
        }
        break;
      case 30:
        if (name.toLocaleUpperCase().startsWith('HUB')) {
          stringLevel = '';
        } else {
          stringLevel = 'HUB';
        }
        break;
      case 40:
        if (name.toLocaleUpperCase().startsWith('TTKNB')) {
          stringLevel = '';
        } else {
          stringLevel = 'TTKNB';
        }
        break;
      case 50:
        if (name.toLocaleUpperCase().startsWith('TTKT')) {
          stringLevel = '';
        } else if (
          name.toLocaleUpperCase().startsWith('TTKT 1') ||
          name.toLocaleUpperCase().startsWith('TTKT 2') ||
          name.toLocaleUpperCase().startsWith('TTKT 3') ||
          name.toLocaleUpperCase().startsWith('TTKT 4')
        ) {
          stringLevel = 'TTKTL';
        } else {
          stringLevel = 'TTKT';
        }

        break;
      default:
        break;
    }
    return stringLevel;
  }
}
