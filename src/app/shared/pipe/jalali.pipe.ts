import { Pipe, PipeTransform } from '@angular/core';
import { PersianNumberHelper } from "@app/core/helper/PersianNumberHelper";
import * as moment from 'jalali-moment';

@Pipe({ name: 'jalali' })
export class JalaliPipe implements PipeTransform {

  constructor(private persianNumberHelper: PersianNumberHelper) { }

  transform(value: string, style?: string): string {
    if (!value) return '';

    const d: moment.Moment = moment(value);
    if (d.year() < 1900) return 'نامشخص';

    if (style == null) style = 'short-date';
    let format: string;
    switch (style) {
      case 'short-time': format = 'H:mm'; break;
      case 'long-time': format = 'HH:mm'; break;
      case 'short-date': format = 'jYY/jM/jD'; break;
      case 'long-date': format = 'jYYYY/jMM/jDD'; break;
      case 'short-datetime': format = 'jYY/jM/jD - H:mm'; break;
      case 'long-datetime': format = 'jYYYY/jMM/jDD - HH:mm'; break;
      default: format = style; break;
    }
    return this.persianNumberHelper.toPersianNumber(d.locale('fa').format(format));
  }
}
