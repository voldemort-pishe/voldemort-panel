import { Pipe, PipeTransform } from '@angular/core';
import {PersianNumberHelper} from "@app/core/helper/PersianNumberHelper";
import {CurrencyPipe} from '@angular/common';


@Pipe({name: 'riyalCurrency'})
export class RiyalCurrencyPipe implements PipeTransform {


  constructor(private persianNumberHelper: PersianNumberHelper,
              private currencyPipe: CurrencyPipe) {
  }

  transform(value: String): String {
    if(value == null)
      return null;

    let valueToString = value.toString();
    if(valueToString.length == 0)
      return null;

    let converted = this.persianNumberHelper.toPersianNumber(
      this.currencyPipe.transform(valueToString," "," ","0.0-0")
    );
    return converted + ' ریال';
  }
}
