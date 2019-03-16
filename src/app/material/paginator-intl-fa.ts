import { MatPaginatorIntl } from "@angular/material";
import { Injectable } from "@angular/core";
import { PersianNumberHelper } from "@app/core/helper/PersianNumberHelper";

@Injectable()
export class PaginatorIntlFa extends MatPaginatorIntl {

    constructor(private pn: PersianNumberHelper) { super(); }

    nextPageLabel: string = 'صفحه بعد';
    previousPageLabel: string = 'صفحه قبل';
    firstPageLabel: string = 'صفحه اول';
    lastPageLabel: string = 'صفحه آخر';
    itemsPerPageLabel: string = 'تعداد آیتم در هر صفحه:';

    getRangeLabel = (page: number, pageSize: number, length: number) => {
        let from = page * pageSize + 1;
        let to = Math.min((page + 1) * pageSize, length);
        return `${this.pn.toPersianNumber(from)} - ${this.pn.toPersianNumber(to)} از ${this.pn.toPersianNumber(length)}`;
    };
}
