import { Injectable } from '@angular/core';

@Injectable()
export class PersianNumberHelper {

  constructor() { }
  toPersianNumber(number: number | string): string {
    const num = number as string;
    return (this.arabicNumberTopersian(this.engNumberTopersian(num)));
  }

  private engNumberTopersian(number: string): string {
    if (number == undefined) return '';
    let str = number.toString().trim();
    if (str === "") return "";
    str = str.replace(/0/g, '۰');
    str = str.replace(/1/g, '۱');
    str = str.replace(/2/g, '۲');
    str = str.replace(/3/g, '۳');
    str = str.replace(/4/g, '۴');
    str = str.replace(/5/g, '۵');
    str = str.replace(/6/g, '۶');
    str = str.replace(/7/g, '۷');
    str = str.replace(/8/g, '۸');
    str = str.replace(/9/g, '۹');
    return str;
  }

  private arabicNumberTopersian(number: string): string {
    if (number == undefined) return '';
    let str = number.toString().trim();
    if (str === "") return "";
    str = str.replace(/٤/g, '۴');
    str = str.replace(/٥/g, '۵');
    str = str.replace(/٦/g, '۶');
    return str;
  }
}
