import { Pipe, PipeTransform } from '@angular/core';
import {PersianNumberHelper} from "@app/core/helper/PersianNumberHelper";


@Pipe({name: 'persianNumber'})
export class PersianNumberPipePipe implements PipeTransform {


  constructor(private persianNumberHelper: PersianNumberHelper) {
  }

  transform(value: String): String {
    if(value == null)
      return null;

    return this.persianNumberHelper.toPersianNumber(value.toString());
  }
}
