import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'customColor'})
export class customColor implements PipeTransform {
  transform(row, value, previusExchangeRate, currentexchangeRate, previusDataSource): string {
    let item = previusDataSource.find(element => element["id"] == row["id"]);
    let style = "background-white";
    if(item != undefined){
      style = _comparation(row[value] * currentexchangeRate,item[value] * previusExchangeRate);
    }
    return style + " " + currentexchangeRate;
  }
}
function _comparation(valueA, valueB){
  let result;
  if(valueA > valueB){
    result = "animation-background-green active";
  } else if(valueB > valueA){
    result = "animation-background-red active";
  } else {
    result = "background-white";
  }
  return result;
}