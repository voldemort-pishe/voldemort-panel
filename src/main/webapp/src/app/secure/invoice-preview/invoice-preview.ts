import {Component, OnInit} from "@angular/core";
import {ActivatedRoute, Router} from "@angular/router";
import {UserPlanService} from "@app/core/services/user-plan.service";
import {Invoice} from "@app/shared/model/invoice.model";
import {HttpResponse, HttpErrorResponse} from "@angular/common/http";
import {InvoiceStatusList} from "@app/shared/model/enumeration/invoice-status.model";
import {PersianNumberHelper} from "@app/core/helper/PersianNumberHelper";
import {CurrencyPipe} from "@angular/common";


@Component({
  selector: 'anms-invoice-preview',
  templateUrl: './invoice-preview.component.html',
  styleUrls: ['./invoice-preview.component.scss']
})
export class InvoicePreviewComponent implements OnInit {

  displayedColumns: string[] = ['index', 'title', 'price', 'total'];
  invoiceDisplayedColumns: string[] = ['amount', 'discount', 'tax', 'total'];
  invoiceDetails: Invoice;
  invoice: any;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private userPlanService: UserPlanService,
              private persianNumberHelper: PersianNumberHelper,
              private currencyPipe: CurrencyPipe) {


  }

  ngOnInit() {

    this.route.params
      .subscribe( params => {
        this.userPlanService
          .getUserPlan(params.invoiceId)
          .subscribe(
            (res: HttpResponse<Invoice>) => this.onUserPlanSuccess(res.body),
            (res: HttpErrorResponse) => this.onError(res.message)
          )
      } );

  }


  getInvoiceStatus(status: InvoiceStatusList){
    return InvoiceStatusList[status];
  }

  invoicePriceToHuman(data){
    return this.persianNumberHelper.toPersianNumber(
      this.currencyPipe.transform(data," "," ","0.0-0")
    );
  }

  private onUserPlanSuccess(data: Invoice){
    this.invoiceDetails = data;
    this.invoice = [
      data
    ];
  }

  private onError(errorMessage: string) {
    console.log(errorMessage);
  }


}
