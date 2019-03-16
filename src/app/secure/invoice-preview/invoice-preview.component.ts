import {Component, OnInit} from "@angular/core";
import {ActivatedRoute, Router} from "@angular/router";
import {UserPlanService} from "@app/core/services/user-plan.service";
import {Invoice} from "@app/shared/model/invoice.model";
import {HttpResponse, HttpErrorResponse} from "@angular/common/http";
import {InvoiceStatusList} from "@app/shared/model/enumeration/invoice-status.model";
import {PaymentService} from "@app/core/services/payment.service";
import {Payment} from "@app/shared/model/payment.model";


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
            (res: HttpResponse<Invoice>) => this.onUserPlanSuccess(res.body),
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
        (res: HttpResponse<Payment>) => this.onCreatePaymentSuccess(res.body),
        (res: HttpErrorResponse) => this.onError(res.message)
      )
  }

  goBackToPanel(){
    this.router.navigate(['/plan']);
  }

  private onUserPlanSuccess(data: Invoice){
    this.invoiceDetails = data;
    this.invoice = [
      data
    ];
  }

  private onCreatePaymentSuccess(data: Payment){
    window.location.href = data.paymentUrl;
  }

  private onError(errorMessage: string) {
    console.log(errorMessage);
  }


}
