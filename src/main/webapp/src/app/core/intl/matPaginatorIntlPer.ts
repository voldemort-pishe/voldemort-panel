import {MatPaginatorIntl} from '@angular/material';
import {Injectable} from '@angular/core';
import {PersianNumberHelper} from "@app/core/helper/PersianNumberHelper";

@Injectable()
export class MatPaginatorIntlPer extends MatPaginatorIntl {


  constructor(private persianNumberHelper: PersianNumberHelper) {
    super();
  }

  itemsPerPageLabel = 'در هر صفحه';
  nextPageLabel     = 'بعدی';
  previousPageLabel = 'قبلی';
  getRangeLabel = (page: number, pageSize: number, length: number) => {
    if (length == 0 || pageSize == 0) { return `۰ از ${length}`; }

    length = Math.max(length, 0);

    const startIndex = page * pageSize;

    const endIndex = startIndex < length ?
      Math.min(startIndex + pageSize, length) :
      startIndex + pageSize;

    return `${this.persianNumberHelper.toPersianNumber(startIndex + 1)} - ${this.persianNumberHelper.toPersianNumber(endIndex)} از ${this.persianNumberHelper.toPersianNumber(length)}`;
  };

}
