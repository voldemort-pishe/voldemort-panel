import { Pipe, PipeTransform } from '@angular/core';
import {PersianNumberHelper} from "@app/core/helper/PersianNumberHelper";
import * as jmoment from 'jalali-moment';


@Pipe({name: 'jalali'})
export class JalaliPipe implements PipeTransform {


  constructor(private persianNumberHelper: PersianNumberHelper) {
  }

  transform(value: Date, args?: any): String {
    if(value == null)
      return null;
    if (args) {
      return this.persianNumberHelper.toPersianNumber(
        jmoment(value)
          .locale('fa')
          .format(args.format)
      );
    }else {
      return this.persianNumberHelper.toPersianNumber(
        jmoment(value)
          .locale('fa')
          .format('YYYY/M/D')
      );
    }
  }
}
