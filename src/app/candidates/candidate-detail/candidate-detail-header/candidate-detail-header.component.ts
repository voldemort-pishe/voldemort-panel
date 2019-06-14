import { Component, OnInit } from '@angular/core';
import { CandidateService } from '@app/shared/services/data/candidate.service';
import { CompanyPipelineService } from '@app/shared/services/data/company-pipeline.service';
import { ActivatedRoute } from '@angular/router';
import { CandidateContentModel } from '@app/shared/model/candidate.model';
import { HelpersService } from '@app/shared/services/helpers.service';
import { MatSelectChange } from '@angular/material';
import { CompanyPipelineContentModel } from '@app/shared/model/company-pipeline.model';
import { CandidateState } from '@app/shared/model/enumeration/candidate-state';

@Component({
  selector: 'anms-candidate-detail-header',
  templateUrl: './candidate-detail-header.component.html',
  styleUrls: ['./candidate-detail-header.component.scss']
})
export class CandidateDetailHeaderComponent implements OnInit {

  CandidateState: typeof CandidateState = CandidateState;

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

  onChangeState(candidate: CandidateContentModel, selectEvent: MatSelectChange) {
    let state: CandidateState;
    let pipeline: number;
    if (typeof selectEvent.value === 'number') {
      state = CandidateState.InProcess;
      pipeline = selectEvent.value;
    }
    else {
      state = selectEvent.value;
    }

    this.candidateService.updateState(candidate.data.id, state, pipeline).subscribe(r => {
      const msg = r.success ? 'وضعیت کاندیدای مورد نظر به روز شد.' : r.niceErrorMessage;
      this.helpersService.showToast(msg);
      if (r.success) {
        candidate.data = r.data.data;
        candidate.include = r.data.include;
      }
    });
  }
}
