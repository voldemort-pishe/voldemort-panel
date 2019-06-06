import { Component, OnInit } from "@angular/core";
import { PlanModel } from "@app/shared/model/plan.model";
import { CurrencyPipe } from "@angular/common";
import { InvoiceModel } from "@app/shared/model/invoice.model";
import { Router } from "@angular/router";
import { Pageable } from '@app/shared/model/pageable.model';
import { PlanService } from '@app/shared/services/data/plan.service';
import { UserPlanService } from '@app/shared/services/data/user-plan.service';
import { HelpersService } from '@app/shared/services/helpers.service';

@Component({
  selector: 'anms-plan',
  templateUrl: './plan.component.html',
  styleUrls: ['./plan.component.scss']
})
export class PlanComponent implements OnInit {

  planList: PlanModel[];

  constructor(
    private router: Router,
    private planService: PlanService,
    private userPlanService: UserPlanService,
    private helpersService: HelpersService,
    private currencyPipe: CurrencyPipe,
  ) {
  }

  ngOnInit() {
    this.planService.getList().subscribe(r => {
      if (r.success)
        this.onSuccess(r.data);
    });
  }


  showInvoice(planId: number) {
    this.userPlanService.saveUserPlan(planId).subscribe(r => {
      if (r.success)
        this.onUserPlanSuccess(r.data);
    });
  }

  packagePriceToHuman(data) {
    return this.helpersService.toPersianNumber(
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
}
