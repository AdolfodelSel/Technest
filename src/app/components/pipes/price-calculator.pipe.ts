import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'priceCalculator'})
export class priceCalculator implements PipeTransform {
  transform(btc, exchange): string {
    return (btc * exchange).toFixed(2);
  }
}