import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { JobService } from '@app/shared/services/data/job.service';
import { JobContentModel } from '@app/shared/model/job.model';

@Component({
  selector: 'anms-job-detail',
  templateUrl: './job-detail.component.html',
  styleUrls: ['./job-detail.component.scss']
})
export class JobDetailComponent implements OnInit {

  isLoading: boolean = false;
  id: number;
  model: JobContentModel;

  constructor(
    private jobService: JobService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = parseInt(params['id']);
      this.fetch();
    });
  }

  fetch(): void {
    if (isNaN(this.id)) return;

    this.isLoading = true;
    this.jobService.getDetail(this.id).subscribe(r => {
      this.isLoading = false;
      if (r.success)
        this.model = r.data;
    });
  }

  // differ: any;
  // companyPipeline;
  // activeTab: any = { current: 'background' };
  // candidateId: number;
  // candidate: ContentCandidate;
  // candidateMessage: PageCandidateMessageVm;


  // constructor(private differs: KeyValueDiffers,
  //   private candidateService: CandidateService,
  //   private candidateMessageService: CandidateMessageService,
  //   private companyPipelineService: CompanyPipelineService,
  //   private route: ActivatedRoute,
  //   private dialog: MatDialog,
  //   private snackBar: MatSnackBar) {
  //   this.differ = differs.find({}).create();

  // }

  // ngOnInit() {
  //   this.route.params
  //     .subscribe(params => {
  //       this.candidateId = params.candidateId;
  //       this.candidateService
  //         .get(this.candidateId)
  //         .subscribe(
  //           (res: HttpResponse<ContentCandidate>) => this.onCandidateSuccess(res.body),
  //           (res: HttpErrorResponse) => this.onError(res.message)
  //         );
  //     });
  // }

  // ngDoCheck() {
  //   let changes = this.differ.diff(this.activeTab);
  //   if (changes) {
  //     if (this.activeTab.current == 'activity') {
  //       this.candidateMessageService
  //         .getAllCandidateMessage(this.candidateId, 'createdDate,desc')
  //         .subscribe(
  //           (res: HttpResponse<PageCandidateMessageVm>) => this.onCandidateMessageSuccess(res.body),
  //           (res: HttpErrorResponse) => this.onError(res.message)
  //         );
  //     }
  //   }
  // }

  // onChangePipeline(candidate, $event) {
  //   candidate.data.candidatePipeline = $event.value;
  //   this.candidateService
  //     .update(candidate.data)
  //     .subscribe(
  //       (res: HttpResponse<ContentCandidate>) => this.onCandidatePipelineSuccess(res.body),
  //       (res: HttpErrorResponse) => this.onError(res.message)
  //     )
  // }

  // private onCandidateSuccess(data: ContentCandidate) {
  //   this.candidate = data;
  //   this.companyPipelineService
  //     .loadAll()
  //     .subscribe(
  //       (res: HttpResponse<CompanyPipelineVm>) => this.onCompanyPipelineSuccess(res.body),
  //       (res: HttpErrorResponse) => this.onError(res.message)
  //     );
  // }

  // private onCandidateMessageSuccess(data: PageCandidateMessageVm) {
  //   this.candidateMessage = data;
  // }

  // private onCompanyPipelineSuccess(data: CompanyPipelineVm) {
  //   this.companyPipeline = data.content;
  // }

  // private onCandidatePipelineSuccess(data: ContentCandidate) {
  //   this.snackBar.open("مرحله‌ی کاندیدای مورد نظر به روز شد", "بستن", {
  //     duration: 2500
  //   });
  // }

  // private onError(errorMessage: string) {
  //   console.log(errorMessage);
  // }
}
