import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'priceFormat',
})
export class PriceFormatPipe implements PipeTransform {
  transform(value: number): string {
    let price = value.toFixed().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    return price;
  }
}
