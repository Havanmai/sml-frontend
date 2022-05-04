import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'colorLocked',
})
export class ColorLockedPipe implements PipeTransform {
  transform(maVanDon: string, status: number): string {
    let color: string;
    if (maVanDon === null && status !== -1 && status !== 2) {
      if (status === 3) {
        /// Khối tủ chưa hoạt động
        color = 'rgb(174 174 175)';
      } else {
        color = '#0DD80D';
      }
    } else if (maVanDon !== null && status !== -1 && status !== 2) {
      if (status === 3) {
        /// Khối tủ chưa hoạt động
        color = 'rgb(174 174 175)';
      } else {
        color = '#3b5999';
      }
    } else if (status === -1) {
      color = '#EC1B2E';
    } else if (status === 2) {
      color = '#FF9F10';
    } else if (status === 3) {
      /// Khối tủ chưa hoạt động
      color = 'rgb(174 174 175)';
    }
    return color;
  }
}
