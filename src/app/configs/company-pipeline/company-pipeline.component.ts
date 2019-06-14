import { Component, OnInit } from '@angular/core';
import { CompanyPipelineService } from '@app/shared/services/data/company-pipeline.service';
import { CompanyPipelineModel } from '@app/shared/model/company-pipeline.model';
import { HelpersService } from '@app/shared/services/helpers.service';
import { SubscriptionService } from '@app/shared/services/data/subscription.service';

@Component({
  selector: 'anms-company-pipeline',
  templateUrl: './company-pipeline.component.html',
  styleUrls: ['./company-pipeline.component.scss']
})
export class CompanyPipelineComponent implements OnInit {

  isLoading: boolean = false;
  companyId: number;
  items: CompanyPipelineModel[];
  displayedColumns: string[] = ['title', 'weight', 'operations'];

  constructor(
    private companyPipelineService: CompanyPipelineService,
    private subscriptionService: SubscriptionService,
    private helpersService: HelpersService,
  ) { }

  ngOnInit() {
    this.isLoading = true;
    this.companyPipelineService.getList().subscribe(r => {
      this.isLoading = false;
      if (r.success)
        this.items = r.data.content.map(v => v.data);
    });
    this.subscriptionService.get().subscribe(r => {
      if (r.success)
        this.companyId = r.data.companyId;
    });
  }

  addItem(): void {
    if (this.companyId == null) return;

    this.items = this.items.concat({
      companyId: this.companyId,
      title: '',
      weight: 1,
    });
  }

  saveItem(item: CompanyPipelineModel): void {
    if (item.id == null) {
      this.companyPipelineService.create(item).subscribe(r => {
        if (r.success)
          item.id = r.data.data.id;
        const msg = r.success ? 'فیلد با موفقیت ذخیره شد.' : r.niceErrorMessage;
        this.helpersService.showToast(msg);
      });
    }
    else {
      this.companyPipelineService.edit(item).subscribe(r => {
        const msg = r.success ? 'فیلد با موفقیت ذخیره شد.' : r.niceErrorMessage;
        this.helpersService.showToast(msg);
      });
    }
  }

  deleteItem(item: CompanyPipelineModel): void {
    if (item.id == null) {
      this.items = this.items.filter(i => i !== item);
    }
    else {
      this.companyPipelineService.delete(item.id).subscribe(r => {
        if (r.success)
          this.items = this.items.filter(i => i !== item);
        const msg = r.success ? 'فیلد با موفقیت حذف شد.' : r.niceErrorMessage;
        this.helpersService.showToast(msg);
      });
    }
  }
}
