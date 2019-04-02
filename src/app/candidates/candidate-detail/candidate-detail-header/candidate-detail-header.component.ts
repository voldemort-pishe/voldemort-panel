import { Component, OnInit } from '@angular/core';
import { CandidateService, CompanyPipelineService } from '@app/core';
import { ActivatedRoute } from '@angular/router';
import { CandidateContentModel } from '@app/shared/model/candidate.model';
import { HelpersService } from '@app/core/services/helpers.service';
import { CompanyPipelineContentModel } from '@app/shared/model/company-pipeline-vm.model';
import { MatSelectChange } from '@angular/material';

@Component({
  selector: 'anms-candidate-detail-header',
  templateUrl: './candidate-detail-header.component.html',
  styleUrls: ['./candidate-detail-header.component.scss']
})
export class CandidateDetailHeaderComponent implements OnInit {

  id: number;

  isLoading: boolean = false;
  isErrorOccured: boolean = false;
  error: string;
  model: CandidateContentModel;
  pipelines: CompanyPipelineContentModel[];

  tabs: { title: string; url: string; }[] = [
    { title: 'پیشینه', url: 'background' },
    { title: 'فعالیت‌ها', url: 'activity' },
    { title: 'نظرات', url: 'comments' },
    { title: 'جدول زمانی', url: 'schedule' },
    { title: 'بازخورد', url: 'feedback' },
    { title: 'مستندات', url: 'documents' },
  ];

  constructor(
    private route: ActivatedRoute,
    private helpersService: HelpersService,
    private candidateService: CandidateService,
    private companyPipelineService: CompanyPipelineService,
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = parseInt(params['id']);
      this.fetch();
    });

    this.companyPipelineService.getList().subscribe(r => {
      if (r.success)
        this.pipelines = r.data.content;
    });
  }

  fetch() {
    if (this.id == null) return;

    this.isLoading = true;
    this.isErrorOccured = false;
    this.candidateService.getDetail(this.id).subscribe(r => {
      this.isLoading = false;
      if (r.success) {
        this.model = r.data;
      }
      else {
        this.isErrorOccured = true;
        this.error = r.niceErrorMessage;
      }
    });
  }

  onChangePipeline(selectEvent: MatSelectChange) {
    this.model.data.candidatePipeline = selectEvent.value;
    this.candidateService.edit(this.model.data).subscribe(r => {
      const msg = r.success ? 'مرحله‌ی کاندیدای مورد نظر به روز شد.' : r.niceErrorMessage;
      this.helpersService.showToast(msg);
    });
  }
}
