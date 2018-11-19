import {Component, HostBinding, OnInit, ViewChild, ElementRef} from "@angular/core";
import {CandidateService} from "@app/core/services/candidate.service";
import {HttpErrorResponse, HttpResponse} from "@angular/common/http";
import {Candidate, ContentCandidate} from "@app/shared/model/candidate.model";
import {MatTableDataSource, MatDialog} from "@angular/material";
import {SelectionModel} from "@angular/cdk/collections";
import {CompanyPipelineService} from "@app/core/services/company-pipeline.service";
import {CompanyPipelineVm} from "@app/shared/model/company-pipeline-vm.model";
import {FormGroup, FormBuilder, Validators} from "@angular/forms";


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
  showClearFilter: boolean = false;
  searchKeyword = null;
  searchJobPosition = null;
  searchPipeline = null;

  constructor(private candidateService: CandidateService,
              private companyPipelineService: CompanyPipelineService,
              public dialog: MatDialog) {
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
      this.dataSource.data.forEach(row => {
        this.selection.select(row)
      });
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


  applyFilterByState(state: string){
    this.isLoading = true;
    this.selectedFilter = state;
    this.candidateService
      .search('state=' + state)
      .subscribe(
        (res: HttpResponse<Candidate>) => this.onCandidateSuccess(res.body),
        (res: HttpErrorResponse) => this.onError(res.message)
      )
  }


  applyFilterBySearch(search: string){
    this.showClearFilter = true;
    if(search.length >= 3) {
      this.isLoading = true;
      this.candidateService
        .search('search=' + search)
        .subscribe(
          (res: HttpResponse<Candidate>) => this.onCandidateSuccess(res.body),
          (res: HttpErrorResponse) => this.onError(res.message)
        );
    }
  }

  applyFilterByPipeline(pipeline: string){
    this.isLoading = true;
    this.showClearFilter = true;
    if(pipeline != 'ALL') {
      this.candidateService
        .search('pipeline=' + pipeline)
        .subscribe(
          (res: HttpResponse<Candidate>) => this.onCandidateSuccess(res.body),
          (res: HttpErrorResponse) => this.onError(res.message)
        )
    }else{
      this.loadAll();
    }
  }

  applyFilterByJobPosition(job: string){
    this.isLoading = true;
    this.showClearFilter = true;
    if(job != 'ALL') {
      this.candidateService
        .search('job=' + job)
        .subscribe(
          (res: HttpResponse<Candidate>) => this.onCandidateSuccess(res.body),
          (res: HttpErrorResponse) => this.onError(res.message)
        )
    }else{
      this.loadAll();
    }
  }

  clearFilter(){
    this.showClearFilter = false;
    this.searchKeyword = null;
    this.searchJobPosition = null;
    this.searchPipeline = null;
    this.loadAll();
  }

  openCreateCandidateDialog(){
    const dialogRef = this.dialog.open(CandidateCreateDialog, {width: '600px'});

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
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

@Component({
  selector: 'candidate-create-dialog',
  templateUrl: './candidate-create-dialog.html',
  styleUrls: ['./candidate-create-dialog.scss']
})
export class CandidateCreateDialog {

  @ViewChild('candidateCreateForm') candidateCreateForm: ElementRef;

  candidateCreateFormGroup: FormGroup;

  constructor(private fb: FormBuilder) {
    this.candidateCreateFormGroup = fb.group({
      firstName: [null,Validators.required],
      lastName: [null,Validators.required],
      state: [null,Validators.required],
      cellphone: [null,Validators.required],
      email: [null,[Validators.required, Validators.email]],
      type: [null,Validators.required],
      candidatePipeline: [null,Validators.required],
      employer: [null,Validators.required],
      jobId: [null,Validators.required],
    });
  }

  save(){

  }

}
