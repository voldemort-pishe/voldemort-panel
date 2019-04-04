import {Component, OnInit} from "@angular/core";
import {ActivatedRoute, Router} from "@angular/router";
import {UserPlanService} from "@app/core/services/user-plan.service";
import {InvoiceModel} from "@app/shared/model/invoice.model";
import {HttpResponse, HttpErrorResponse} from "@angular/common/http";
import {InvoiceStatusList} from "@app/shared/model/enumeration/invoice-status.model";
import {PaymentService} from "@app/core/services/payment.service";
import {PaymentModel} from "@app/shared/model/payment.model";


@Component({
  selector: 'anms-invoice-preview',
  templateUrl: './invoice-preview.component.html',
  styleUrls: ['./invoice-preview.component.scss']
})
export class InvoicePreviewComponent implements OnInit {

  displayedColumns: string[] = ['index', 'title', 'price', 'total'];
  invoiceDisplayedColumns: string[] = ['amount', 'discount', 'tax', 'total'];
  invoiceDetails: InvoiceModel;
  invoice: any;
  invoiceId: number;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private userPlanService: UserPlanService,
              private paymentService: PaymentService) {


  }

  ngOnInit() {

    this.route.params
      .subscribe( params => {
        this.invoiceId = params.invoiceId;
        this.userPlanService
          .getUserPlan(this.invoiceId)
          .subscribe(
            (res: HttpResponse<InvoiceModel>) => this.onUserPlanSuccess(res.body),
            (res: HttpErrorResponse) => this.onError(res.message)
          )
      } );

  }


  getInvoiceStatus(status: InvoiceStatusList){
    return InvoiceStatusList[status];
  }

  doPayment(){
    this.paymentService
      .createPaymentUrl(this.invoiceId)
      .subscribe(
        (res: HttpResponse<PaymentModel>) => this.onCreatePaymentSuccess(res.body),
        (res: HttpErrorResponse) => this.onError(res.message)
      )
  }

  goBackToPanel(){
    this.router.navigate(['/plan']);
  }

  private onUserPlanSuccess(data: InvoiceModel){
    this.invoiceDetails = data;
    this.invoice = [
      data
    ];
  }

  private onCreatePaymentSuccess(data: PaymentModel){
    window.location.href = data.paymentUrl;
  }

  private onError(errorMessage: string) {
    console.log(errorMessage);
  }


}
