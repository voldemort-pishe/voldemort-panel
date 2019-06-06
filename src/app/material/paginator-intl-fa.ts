import { MatPaginatorIntl } from "@angular/material";
import { Injectable } from "@angular/core";
import { HelpersService } from '@app/shared/services/helpers.service';

@Injectable()
export class PaginatorIntlFa extends MatPaginatorIntl {

    constructor(private helpersService: HelpersService) {
        super();
    }

    nextPageLabel: string = 'صفحه بعد';
    previousPageLabel: string = 'صفحه قبل';
    firstPageLabel: string = 'صفحه اول';
    lastPageLabel: string = 'صفحه آخر';
    itemsPerPageLabel: string = 'تعداد آیتم در هر صفحه:';

    getRangeLabel = (page: number, pageSize: number, length: number) => {
        const from = page * pageSize + 1;
        const to = Math.min((page + 1) * pageSize, length);

        const fromFa = this.helpersService.toPersianNumber(from.toString());
        const toFa = this.helpersService.toPersianNumber(to.toString());
        const lengthFa = this.helpersService.toPersianNumber(length.toString());

        return `${fromFa} - ${toFa} از ${lengthFa}`;
    };
}
