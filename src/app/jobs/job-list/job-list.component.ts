import { Component, OnInit } from "@angular/core";
import { CandidateService } from "@app/core/services/candidate.service";
import { HttpErrorResponse, HttpResponse } from "@angular/common/http";
import { MatDialog, MatTableDataSource, PageEvent } from "@angular/material";
import { SelectionModel } from "@angular/cdk/collections";
import { CompanyPipelineService } from "@app/core/services/company-pipeline.service";
import { JobService } from "@app/core/services/job.service";
import { JobContentModel, JobVm } from "@app/shared/model/job-vm.model";
import { JobStatus } from "@app/shared/model/enumeration/job-status.model";
import { CreateJobComponent } from '../create-job/create-job.component';

@Component({
  selector: 'anms-job-list',
  templateUrl: './job-list.component.html',
  styleUrls: ['./job-list.component.scss']
})
export class JobListComponent implements OnInit {

  isLoading = true;
  links = ['First', 'Second', 'Third'];
  activeLink = this.links[0];
  displayedColumns: string[] = ['select', 'name', 'department', 'createdDate', 'status'];
  dataSource;
  dataSourceRaw;
  jobStatus: typeof JobStatus = JobStatus;
  selection = new SelectionModel<JobContentModel>(true, []);
  selectedFilter: string = 'ALL';
  showClearFilter: boolean = false;
  searchKeyword = null;

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

  loadAll(pageEvent?: PageEvent) {

    let pageIndex;
    let pageSize;

    if (pageEvent) {
      pageIndex = pageEvent.pageIndex;
      pageSize = pageEvent.pageSize;
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
      if (this.selectedFilter != 'ALL') {
        this.jobService
          .searchByMultiField('status=' + this.selectedFilter, 'search=' + search, "createdDate,desc")
          .subscribe(
            (res: HttpResponse<JobVm>) => this.onJobSuccess(res.body),
            (res: HttpErrorResponse) => this.onError(res.message)
          );
      } else {
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
    this.dataSource = new MatTableDataSource<JobContentModel>(data.content);
    this.isLoading = false;
  }


  private onError(errorMessage: string) {
    console.log(errorMessage);
  }

  openCreateJobDialog() {
    const dialogRef = this.dialog.open(
      CreateJobComponent,
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
