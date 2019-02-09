import { Component, DoCheck, KeyValueDiffers, OnInit, ViewEncapsulation } from "@angular/core";
import { CandidateService } from "@app/core/services/candidate.service";
import { ActivatedRoute } from "@angular/router";
import { HttpErrorResponse, HttpResponse } from "@angular/common/http";
import { ContentCandidate } from "@app/shared/model/candidate.model";
import { CompanyPipelineVm } from "@app/shared/model/company-pipeline-vm.model";
import { CompanyPipelineService } from "@app/core";
import { MatDialog, MatSnackBar } from "@angular/material";
import { CandidateMessageService } from "@app/core/services/candidate-message.service";
import { PageCandidateMessageVm } from "@app/shared/model/page-candidate-message-vm.model";

@Component({
  selector: 'anms-job-detail',
  templateUrl: './job-detail.component.html',
  styleUrls: ['./job-detail.component.scss']
})
export class JobDetailComponent implements OnInit {

  differ: any;
  companyPipeline;
  activeTab: any = { current: 'background' };
  candidateId: number;
  candidate: ContentCandidate;
  candidateMessage: PageCandidateMessageVm;


  constructor(private differs: KeyValueDiffers,
    private candidateService: CandidateService,
    private candidateMessageService: CandidateMessageService,
    private companyPipelineService: CompanyPipelineService,
    private route: ActivatedRoute,
    private dialog: MatDialog,
    private snackBar: MatSnackBar) {
    this.differ = differs.find({}).create();

  }

  ngOnInit() {
    this.route.params
      .subscribe(params => {
        this.candidateId = params.candidateId;
        this.candidateService
          .get(this.candidateId)
          .subscribe(
            (res: HttpResponse<ContentCandidate>) => this.onCandidateSuccess(res.body),
            (res: HttpErrorResponse) => this.onError(res.message)
          );
      });
  }

  ngDoCheck() {
    let changes = this.differ.diff(this.activeTab);
    if (changes) {
      if (this.activeTab.current == 'activity') {
        this.candidateMessageService
          .getAllCandidateMessage(this.candidateId, 'createdDate,desc')
          .subscribe(
            (res: HttpResponse<PageCandidateMessageVm>) => this.onCandidateMessageSuccess(res.body),
            (res: HttpErrorResponse) => this.onError(res.message)
          );
      }
    }
  }

  onChangePipeline(candidate, $event) {
    candidate.data.candidatePipeline = $event.value;
    this.candidateService
      .update(candidate.data)
      .subscribe(
        (res: HttpResponse<ContentCandidate>) => this.onCandidatePipelineSuccess(res.body),
        (res: HttpErrorResponse) => this.onError(res.message)
      )
  }

  private onCandidateSuccess(data: ContentCandidate) {
    this.candidate = data;
    this.companyPipelineService
      .loadAll()
      .subscribe(
        (res: HttpResponse<CompanyPipelineVm>) => this.onCompanyPipelineSuccess(res.body),
        (res: HttpErrorResponse) => this.onError(res.message)
      );
  }

  private onCandidateMessageSuccess(data: PageCandidateMessageVm) {
    this.candidateMessage = data;
  }

  private onCompanyPipelineSuccess(data: CompanyPipelineVm) {
    this.companyPipeline = data.content;
  }

  private onCandidatePipelineSuccess(data: ContentCandidate) {
    this.snackBar.open("مرحله‌ی کاندیدای مورد نظر به روز شد", "بستن", {
      duration: 2500
    });
  }

  private onError(errorMessage: string) {
    console.log(errorMessage);
  }
}
