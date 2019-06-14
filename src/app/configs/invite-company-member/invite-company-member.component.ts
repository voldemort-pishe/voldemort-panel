import { Component, OnInit } from '@angular/core';
import { CompanyMemberModel } from '@app/shared/model/company-member.model';
import { CompanyMemberService } from '@app/shared/services/data/company-member.service';
import { SubscriptionService } from '@app/shared/services/data/subscription.service';
import { HelpersService } from '@app/shared/services/helpers.service';
import { CompanyPipelineModel } from '@app/shared/model/company-pipeline.model';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'anms-invite-company-member',
  templateUrl: './invite-company-member.component.html',
  styleUrls: ['./invite-company-member.component.scss']
})
export class InviteCompanyMemberComponent implements OnInit {

  isSubmitting: boolean = false;
  companyId: number;
  items: CompanyMemberModel[] = [];
  displayedColumns: string[] = ['userEmail', 'department', 'position', 'operations'];

  constructor(
    private companyMemberService: CompanyMemberService,
    private subscriptionService: SubscriptionService,
    private helpersService: HelpersService,
    private dialogRef: MatDialogRef<InviteCompanyMemberComponent>,
  ) { }

  ngOnInit() {
    this.subscriptionService.get().subscribe(r => {
      if (r.success)
        this.companyId = r.data.companyId;
    });
  }

  submit(): void {
    if (!this.items.length) return;

    this.isSubmitting = true;
    this.companyMemberService.createList(this.items).subscribe(r => {
      const msg = r.success ? 'اعضای مورد نظر با موفقیت اضافه شد.' : r.niceErrorMessage;
      this.helpersService.showToast(msg);
      this.isSubmitting = false;
      if (r.success)
        this.dialogRef.close(r.data);
    });
  }

  addItem(): void {
    if (this.companyId == null) return;

    this.items = this.items.concat({
      companyId: this.companyId,
    });
  }

  deleteItem(item: CompanyPipelineModel): void {
    this.items = this.items.filter(i => i !== item);
  }
}
