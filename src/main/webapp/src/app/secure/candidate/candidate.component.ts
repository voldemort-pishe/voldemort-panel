import {Component, HostBinding, OnInit} from "@angular/core";
import {CandidateService} from "@app/core/services/candidate.service";
import {HttpErrorResponse, HttpResponse} from "@angular/common/http";
import {Candidate, ContentCandidate} from "@app/shared/model/candidate.model";
import {MatTableDataSource} from "@angular/material";
import {SelectionModel} from "@angular/cdk/collections";
import {CompanyPipelineService} from "@app/core/services/company-pipeline.service";
import {CompanyPipelineVm} from "@app/shared/model/company-pipeline-vm.model";
import {CompanyPipeline} from "@app/shared/model/company-pipeline.model";


@Component({
  selector: 'anms-candidate',
  templateUrl: './candidate.component.html',
  styleUrls: ['./candidate.component.scss']
})
export class CandidateComponent implements OnInit {

  @HostBinding('@.disabled') disabled = true;

  isLoading;
  links = ['First', 'Second', 'Third'];
  activeLink = this.links[0];

  displayedColumns: string[] = ['select', 'candidate', 'owner', 'createdDate', 'jobPosition', 'companyPipeline'];
  dataSource;
  dataSourceRaw;
  selection = new SelectionModel<ContentCandidate>(true, []);
  companyPipeline;
  selectedFilter: string = 'ALL';

  constructor(private candidateService: CandidateService,
              private companyPipelineService: CompanyPipelineService) {

  }

  ngOnInit() {

    this.companyPipelineService
      .loadAll()
      .subscribe(
        (res: HttpResponse<CompanyPipelineVm>) => this.onCompanyPipelineSuccess(res.body),
        (res: HttpErrorResponse) => this.onError(res.message)
      );

  }


  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.data.forEach(row => this.selection.select(row));
  }

  loadByFilter(state: string){
    this.isLoading = true;
    this.selectedFilter = state;
    this.candidateService
      .search('state=' + state)
      .subscribe(
        (res: HttpResponse<Candidate>) => this.onCandidateSuccess(res.body),
        (res: HttpErrorResponse) => this.onError(res.message)
      )
  }

  loadAll(){
    this.isLoading = true;
    this.selectedFilter = 'ALL';
    this.candidateService
      .loadAll()
      .subscribe(
        (res: HttpResponse<Candidate>) => this.onCandidateSuccess(res.body),
        (res: HttpErrorResponse) => this.onError(res.message)
      )
  }


  private onCompanyPipelineSuccess(data: CompanyPipelineVm){
    this.companyPipeline = data.content;
    this.loadAll();
  }

  private onCandidateSuccess(data: Candidate){
    this.dataSourceRaw = data;
    this.dataSource = new MatTableDataSource<ContentCandidate>(data.content);
    this.isLoading = false;
  }

  private onError(errorMessage: string) {
    console.log(errorMessage);
  }

}
