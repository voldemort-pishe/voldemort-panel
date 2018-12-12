import {Component, ElementRef, Inject, OnInit, ViewChild} from "@angular/core";
import {CandidateService} from "@app/core/services/candidate.service";
import {HttpErrorResponse, HttpResponse} from "@angular/common/http";
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef, MatSnackBar, MatTableDataSource, PageEvent} from "@angular/material";
import {SelectionModel} from "@angular/cdk/collections";
import {CompanyPipelineService} from "@app/core/services/company-pipeline.service";
import {JobService} from "@app/core/services/job.service";
import {ContentJob, JobVm} from "@app/shared/model/job-vm.model";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ProvinceService} from "@app/core/services/province.service";
import {Province} from "@app/shared/model/province.model";
import {JobType} from "@app/shared/model/enumeration/job-type.model";
import {JobStatus} from "@app/shared/model/enumeration/job-status.model";


@Component({
  selector: 'anms-job',
  templateUrl: './job.component.html',
  styleUrls: ['./job.component.scss']
})
export class JobComponent implements OnInit {

  isLoading = true;
  links = ['First', 'Second', 'Third'];
  activeLink = this.links[0];

  displayedColumns: string[] = ['select', 'name', 'department', 'createdDate', 'status'];
  dataSource;
  dataSourceRaw;
  jobStatus: typeof JobStatus = JobStatus;
  selection = new SelectionModel<ContentJob>(true, []);
  selectedFilter: string = 'ALL';
  showClearFilter: boolean = false;
  searchKeyword = null;
  pageEvent: PageEvent;

  constructor(private candidateService: CandidateService,
              private companyPipelineService: CompanyPipelineService,
              private jobService: JobService,
              private dialog: MatDialog) {
  }

  ngOnInit() {
    this.loadAll()
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

  loadAll($event?) {

    let pageIndex;
    let pageSize;

    if ($event) {
      pageIndex = $event.pageIndex;
      pageSize = $event.pageSize;
    } else {
      pageIndex = 0;
      pageSize = 5;
    }

    this.selectedFilter = 'ALL';
    this.jobService
      .loadAllPageable(
        "createdDate,desc",
        pageIndex,
        pageSize
      )
      .subscribe(
        (res: HttpResponse<JobVm>) => this.onJobSuccess(res.body),
        (res: HttpErrorResponse) => this.onError(res.message)
      )
  }


  applyFilterByStatus(status: string) {
    this.isLoading = true;
    this.selectedFilter = status;
    this.jobService
      .search('status=' + status, "createdDate,desc")
      .subscribe(
        (res: HttpResponse<JobVm>) => this.onJobSuccess(res.body),
        (res: HttpErrorResponse) => this.onError(res.message)
      )
  }


  applyFilterBySearch(search: string) {
    this.showClearFilter = true;
    if (search.length >= 3) {
      this.isLoading = true;
      if (this.selectedFilter!='ALL') {
        this.jobService
          .searchByMultiField('status=' + this.selectedFilter, 'search=' + search, "createdDate,desc")
          .subscribe(
            (res: HttpResponse<JobVm>) => this.onJobSuccess(res.body),
            (res: HttpErrorResponse) => this.onError(res.message)
          );
      }else {
        this.jobService
          .search('search=' + search, "createdDate,desc")
          .subscribe(
            (res: HttpResponse<JobVm>) => this.onJobSuccess(res.body),
            (res: HttpErrorResponse) => this.onError(res.message)
          );
      }
    }
  }

  clearFilter() {
    this.showClearFilter = false;
    this.searchKeyword = null;
    this.loadAll();
  }

  private onJobSuccess(data: JobVm) {
    this.dataSourceRaw = data;
    this.dataSource = new MatTableDataSource<ContentJob>(data.content);
    this.isLoading = false;
  }


  private onError(errorMessage: string) {
    console.log(errorMessage);
  }

  openCreateJobDialog() {
    const dialogRef = this.dialog.open(
      JobCreateDialog,
      {
        width: '800px',
        data: {}
      }
    );

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
}

@Component({
  selector: 'job-create-dialog',
  templateUrl: './job-create-dialog.html',
  styleUrls: ['./job-create-dialog.scss']
})
export class JobCreateDialog implements OnInit {

  @ViewChild('jobCreateForm') jobCreateForm: ElementRef;

  jobCreateFormGroup: FormGroup;
  jobType: object;
  jobLocation;


  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
              private dialogRef: MatDialogRef<JobCreateDialog>,
              private fb: FormBuilder,
              private snackBar: MatSnackBar,
              private provinceService: ProvinceService,
              private jobService: JobService) {

    this.jobCreateFormGroup = fb.group({
      nameFa: [null, Validators.required],
      type: ['', Validators.required],
      department: [null, Validators.required],
      descriptionFa: [null, Validators.required],
      location: ['', Validators.required],
    });

  }

  ngOnInit() {
    this.provinceService
      .loadAll()
      .subscribe(
        (res: HttpResponse<Province[]>) => this.onProvinceFind(res.body),
        (res: HttpErrorResponse) => this.onError(res.message));

    this.jobType = Object.keys(JobType)
      .map(c => ({
        key: c,
        value: JobType[c]
      }));

  }

  private onProvinceFind(data: Province[]) {
    console.log(data);
    this.jobLocation = data;
    console.log(this.jobLocation);
  }

  save() {
    if (this.jobCreateFormGroup.valid) {
      this.jobService
        .create(this.jobCreateFormGroup.value)
        .subscribe(
          (res: HttpResponse<JobVm>) => this.onCreateJobSuccess(res.body),
          (res: HttpErrorResponse) => this.onError(res.message)
        );
    }
  }

  private onCreateJobSuccess(data: JobVm) {
    this.dialogRef.close();
    this.snackBar.open("شغل مورد نظر با موفقیت ثبت شد", "بستن", {
      duration: 2500
    });
  }


  private onError(errorMessage: string) {
    console.log(errorMessage);
  }
}

