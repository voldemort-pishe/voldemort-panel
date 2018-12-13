import {Component, ElementRef, Inject, OnInit, ViewChild} from "@angular/core";
import {CandidateService} from "@app/core/services/candidate.service";
import {HttpErrorResponse, HttpResponse} from "@angular/common/http";
import {Candidate, ContentCandidate,} from "@app/shared/model/candidate.model";
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef, MatSnackBar, MatTableDataSource, PageEvent} from "@angular/material";
import {SelectionModel} from "@angular/cdk/collections";
import {CompanyPipelineService} from "@app/core/services/company-pipeline.service";
import {CompanyPipelineVm} from "@app/shared/model/company-pipeline-vm.model";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {CandidateType} from "@app/shared/model/enumeration/candidate-type.model";
import {CandidateState} from "@app/shared/model/enumeration/candidate-state.model";
import {UploadService} from "@app/core/services/upload.service";
import {forkJoin} from "rxjs/internal/observable/forkJoin";
import {JobService} from "@app/core/services/job.service";
import {JobVm} from "@app/shared/model/job-vm.model";


@Component({
  selector: 'anms-candidate',
  templateUrl: './candidate.component.html',
  styleUrls: ['./candidate.component.scss']
})
export class CandidateComponent implements OnInit {

  isLoading = true;
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
  jobList;

  constructor(private candidateService: CandidateService,
              private companyPipelineService: CompanyPipelineService,
              private jobService: JobService,
              private dialog: MatDialog,
              private snackBar: MatSnackBar) {
  }

  ngOnInit() {

    this.companyPipelineService
      .loadAll()
      .subscribe(
        (res: HttpResponse<CompanyPipelineVm>) => this.onCompanyPipelineSuccess(res.body),
        (res: HttpErrorResponse) => this.onError(res.message)
      );

    this.jobService
      .loadAll()
      .subscribe(
        (res: HttpResponse<JobVm>) => this.onJobSuccess(res.body),
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

  loadAll(pageEvent?: PageEvent){

    let pageIndex;
    let pageSize;

    if(pageEvent){
      pageIndex = pageEvent.pageIndex;
      pageSize = pageEvent.pageSize;
    }else{
      pageIndex = 0;
      pageSize = 5;
    }

    this.selectedFilter = 'ALL';
    this.candidateService
      .loadAll(
        "createdDate,desc",
        pageIndex,
        pageSize
      )
      .subscribe(
        (res: HttpResponse<Candidate>) => this.onCandidateSuccess(res.body),
        (res: HttpErrorResponse) => this.onError(res.message)
      );

    return true;
  }


  applyFilterByState(state: string){
    this.isLoading = true;
    this.selectedFilter = state;
    this.candidateService
      .search('state=' + state,"createdDate,desc")
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
        .search('search=' + search, "createdDate,desc")
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
        .search('pipeline=' + pipeline, "createdDate,desc")
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
        .search('job=' + job, "createdDate,desc")
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
    const dialogRef = this.dialog.open(
      CandidateCreateDialog,
      {
        width: '800px',
        data: {
          companyPipeline: this.companyPipeline,
          jobList: this.jobList.content
        }
      }
    );

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  onChangePipeline(element, $event){
    element.data.candidatePipeline = $event.value;
    this.candidateService
      .update(element.data)
      .subscribe(
        (res: HttpResponse<ContentCandidate>) => this.onCandidatePipelineSuccess(res.body),
        (res: HttpErrorResponse) => this.onError(res.message)
      )
  }


  private onCompanyPipelineSuccess(data: CompanyPipelineVm){
    this.companyPipeline = data.content;
    this.loadAll();
  }

  private onCandidatePipelineSuccess(data: ContentCandidate){
    this.snackBar.open("مرحله‌ی کاندیدای مورد نظر به روز شد", "بستن", {
      duration: 2500
    });
  }

  private onCandidateSuccess(data: Candidate){
    this.dataSourceRaw = data;
    this.dataSource = new MatTableDataSource<ContentCandidate>(data.content);
    this.isLoading = false;
  }
  private onJobSuccess(data: JobVm){
    this.jobList = data;
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
export class CandidateCreateDialog implements OnInit{

  @ViewChild('candidateCreateForm') candidateCreateForm: ElementRef;
  @ViewChild('file') file;

  candidateCreateFormGroup: FormGroup;
  candidateType: object;
  candidateState: object;
  files: Set<File> = new Set();
  uploading = false;
  uploadSuccessful = false;
  uploadResponse;


  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
              private dialogRef: MatDialogRef<CandidateCreateDialog>,
              private fb: FormBuilder,
              private uploadService: UploadService,
              private candidateService: CandidateService,
              private snackBar: MatSnackBar) {

    this.candidateCreateFormGroup = fb.group({
      firstName: [null,Validators.required],
      lastName: [null,Validators.required],
      state: ['',Validators.required],
      cellphone: [null,Validators.required],
      email: [null,[Validators.required, Validators.email]],
      type: ['',Validators.required],
      candidatePipeline: ['',Validators.required],
      employer: [null,Validators.required],
      jobId: ['',Validators.required],
      fileId: new FormControl()
    });

  }

  ngOnInit() {
    this.candidateType = Object.keys(CandidateType)
      .map( c => ({
        key: c,
        value : CandidateType[c]
      }));

    this.candidateState = Object.keys(CandidateState)
      .map( c => ({
        key: c,
        value : CandidateState[c]
      }));

  }

  addFiles() {
    this.file.nativeElement.click();
    return false;
  }

  onFilesAdded() {

    this.uploading = true;

    const files: { [key: string]: File } = this.file.nativeElement.files;
    for (let key in files) {
      if (!isNaN(parseInt(key))) {
        this.files.add(files[key]);
      }
    }

    this.uploadResponse = this.uploadService.upload(this.files);
    forkJoin(this.uploadResponse.filestatus.progress).subscribe(end => {
      this.uploadSuccessful = true;
      this.uploading = false;
      this.candidateCreateFormGroup.patchValue({
        fileId:this.uploadResponse.response.body.id
      });
    });

  }

  save(){
    if(this.candidateCreateFormGroup.valid) {
      this.candidateService
        .create(this.candidateCreateFormGroup.value)
        .subscribe(
          (res: HttpResponse<Candidate>) => this.onCreateCandidateSuccess(res.body),
          (res: HttpErrorResponse) => this.onError(res)
        );
    }
  }

  private onCreateCandidateSuccess(data: Candidate){
    this.dialogRef.close();
    this.snackBar.open("کاندیدای مورد نظر با موفقیت ثبت شد", "بستن", {
      duration: 2500
    });
  }


  private onError(httpResponse: HttpErrorResponse) {

    if(httpResponse.error.message == "error.validation"){

      httpResponse.error.fieldErrors.forEach((key : any, val: any) => {
        if(key.message ==  "NotNull" && key.field == 'fileId'){
          this.snackBar.open("روزمه اجباری است", "بستن", {
            duration: 2500
          });
        }
      });
    }
  }

}
