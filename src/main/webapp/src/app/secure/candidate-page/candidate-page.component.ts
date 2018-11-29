import {Component, HostBinding, OnInit, ViewEncapsulation} from "@angular/core";
import {CandidateService} from "@app/core/services/candidate.service";
import {ActivatedRoute} from "@angular/router";
import {HttpErrorResponse, HttpResponse} from "@angular/common/http";
import {ContentCandidate} from "@app/shared/model/candidate.model";
import {CompanyPipelineVm} from "@app/shared/model/company-pipeline-vm.model";
import {CompanyPipelineService} from "@app/core";
import {MatSnackBar} from "@angular/material";


@Component({
  selector: 'anms-candidate-page',
  templateUrl: './candidate-page.component.html',
  styleUrls: ['./candidate-page.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CandidatePageComponent implements OnInit {

  @HostBinding('@.disabled') disabled = true;
  candidate: ContentCandidate;
  companyPipeline;
  activeTab: string = 'background';

  constructor(private candidateService: CandidateService,
              private companyPipelineService: CompanyPipelineService,
              private route: ActivatedRoute,
              private snackBar: MatSnackBar) {
  }

  ngOnInit() {
    this.route.params
      .subscribe( params => {
        this.candidateService
          .get(params.candidateId)
          .subscribe(
            (res: HttpResponse<ContentCandidate>) => this.onCandidateSuccess(res.body),
            (res: HttpErrorResponse) => this.onError(res.message)
          )
      } );
  }

  onChangePipeline(candidate, $event){
    candidate.data.candidatePipeline = $event.value;
    this.candidateService
      .update(candidate.data)
      .subscribe(
        (res: HttpResponse<ContentCandidate>) => this.onCandidatePipelineSuccess(res.body),
        (res: HttpErrorResponse) => this.onError(res.message)
      )
  }

  private onCandidateSuccess(data: ContentCandidate){
    this.candidate = data;

    this.companyPipelineService
      .loadAll()
      .subscribe(
        (res: HttpResponse<CompanyPipelineVm>) => this.onCompanyPipelineSuccess(res.body),
        (res: HttpErrorResponse) => this.onError(res.message)
      );
  }

  private onCompanyPipelineSuccess(data: CompanyPipelineVm){
    this.companyPipeline = data.content;
  }

  private onCandidatePipelineSuccess(data: ContentCandidate){
    this.snackBar.open("مرحله‌ی کاندیدای مورد نظر به روز شد", "بستن", {
      duration: 2500
    });
  }

  private onError(errorMessage: string) {
    console.log(errorMessage);
  }



}
