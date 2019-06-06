import { Component, OnInit } from '@angular/core';
import { MatDialog, MatTableDataSource, PageEvent } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
import { JobService } from '@app/shared/services/data/job.service';
import { JobStatus } from '@app/shared/model/enumeration/job-status';
import { CreateJobComponent } from '../create-job/create-job.component';
import { JobContentModel } from '@app/shared/model/job.model';
import { Pageable } from '@app/shared/model/pageable.model';

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

  constructor(
    private jobService: JobService,
    private dialog: MatDialog,
  ) { }

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
    this.jobService.getList({ page: pageIndex, size: pageSize, sort: 'createdDate,desc' }).subscribe(r => {
      if (r.success)
        this.onJobSuccess(r.data);
    });
  }

  applyFilterByStatus(status: JobStatus) {
    this.isLoading = true;
    this.selectedFilter = status;
    this.jobService.getList({ status: status, sort: 'createdDate,desc' }).subscribe(r => {
      if (r.success)
        this.onJobSuccess(r.data);
    });
  }

  applyFilterBySearch(search: string) {
    this.showClearFilter = true;
    if (search.length >= 3) {
      this.isLoading = true;

      const params = {
        search: search,
        sort: 'createdDate,desc',
      };
      if (this.selectedFilter != 'ALL')
        params['status'] = this.selectedFilter;

      this.jobService.getList(params).subscribe(r => {
        if (r.success)
          this.onJobSuccess(r.data);
      });
    }
  }

  clearFilter() {
    this.showClearFilter = false;
    this.searchKeyword = null;
    this.loadAll();
  }

  private onJobSuccess(data: Pageable<JobContentModel>) {
    this.dataSourceRaw = data;
    this.dataSource = new MatTableDataSource<JobContentModel>(data.content);
    this.isLoading = false;
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
