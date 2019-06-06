import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { InvoiceModel } from "@app/shared/model/invoice.model";
import { HttpResponse, HttpErrorResponse } from "@angular/common/http";
import { PaymentModel } from "@app/shared/model/payment.model";
import { UserPlanService } from '@app/shared/services/data/user-plan.service';
import { PaymentService } from '@app/shared/services/data/payment.service';
import { InvoiceStatus } from '@app/shared/model/enumeration/invoice-status';

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

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private userPlanService: UserPlanService,
    private paymentService: PaymentService,
  ) {


  }

  ngOnInit() {

    this.route.params
      .subscribe(params => {
        this.invoiceId = params.invoiceId;
        this.userPlanService.getUserPlan(this.invoiceId).subscribe(r => {
          if (r.success)
            this.onUserPlanSuccess(r.data);
        });
      });
  }


  getInvoiceStatus(status: InvoiceStatus) {
    return InvoiceStatus[status];
  }

  doPayment() {
    this.paymentService.createPaymentUrl(this.invoiceId).subscribe(r => {
      if (r.success)
        this.onCreatePaymentSuccess(r.data);
    });
  }

  goBackToPanel() {
    this.router.navigate(['/plan']);
  }

  private onUserPlanSuccess(data: InvoiceModel) {
    this.invoiceDetails = data;
    this.invoice = [
      data
    ];
  }

  private onCreatePaymentSuccess(data: PaymentModel) {
    window.location.href = data.paymentUrl;
  }
}
