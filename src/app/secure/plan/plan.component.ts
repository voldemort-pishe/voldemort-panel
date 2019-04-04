import { Component, OnInit } from "@angular/core";
import { PlanService } from "@app/core";
import { PlanModel } from "@app/shared/model/plan.model";
import { HttpResponse, HttpErrorResponse } from "@angular/common/http";
import { PersianNumberHelper } from "@app/core/helper/PersianNumberHelper";
import { CurrencyPipe } from "@angular/common";
import { UserPlanService } from "@app/core/services/user-plan.service";
import { InvoiceModel } from "@app/shared/model/invoice.model";
import { Router } from "@angular/router";
import { Pageable } from '@app/shared/model/pageable.model';


@Component({
  selector: 'anms-plan',
  templateUrl: './plan.component.html',
  styleUrls: ['./plan.component.scss']
})
export class PlanComponent implements OnInit {

  planList: PlanModel[];

  constructor(private planService: PlanService,
    private router: Router,
    private userPlanService: UserPlanService,
    private persianNumberHelper: PersianNumberHelper,
    private currencyPipe: CurrencyPipe) {
  }

  ngOnInit() {
    this.planService
      .loadAll()
      .subscribe(
        (res: HttpResponse<Pageable<PlanModel>>) => this.onSuccess(res.body),
        (res: HttpErrorResponse) => this.onError(res.message)
      );
  }


  showInvoice(planId: number) {
    this.userPlanService
      .saveUserPlan(planId)
      .subscribe(
        (res: HttpResponse<InvoiceModel>) => this.onUserPlanSuccess(res.body),
        (res: HttpErrorResponse) => this.onError(res.message)
      );
  }

  packagePriceToHuman(data) {
    return this.persianNumberHelper.toPersianNumber(
      this.currencyPipe.transform(data, " ", " ", "0.0-0")
    );
  }

  packageLengthToHuman(data) {
    let result;
    switch (data) {
      case 30:
        result = 'ماهیانه';
    }
    return result;
  }

  private onSuccess(data: Pageable<PlanModel>) {
    this.planList = data.content;
  }

  private onUserPlanSuccess(data: InvoiceModel) {
    this.router.navigate(['/invoice/', data.id]);
  }

  private onError(errorMessage: string) {
    console.log(errorMessage);
  }

}
