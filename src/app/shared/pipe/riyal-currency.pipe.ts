import { Pipe, PipeTransform } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { HelpersService } from '../services/helpers.service';

@Pipe({ name: 'riyalCurrency' })
export class RiyalCurrencyPipe implements PipeTransform {

  constructor(
    private helpersService: HelpersService,
    private currencyPipe: CurrencyPipe,
  ) { }

  transform(value: string): string {
    if (value == null)
      return null;

    let valueToString = value.toString();
    if (valueToString.length == 0)
      return null;

    let converted = this.helpersService.toPersianNumber(
      this.currencyPipe.transform(valueToString, " ", " ", "0.0-0")
    );
    return converted + ' ریال';
  }
}
