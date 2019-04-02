import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { SelectionModel } from '@angular/cdk/collections';
import { MatTableDataSource, PageEvent, MatSelectChange } from '@angular/material';
import { CandidateContentModel } from '@app/shared/model/candidate.model';
import { CandidateService, CandidateListRequest, JobService, CompanyPipelineService } from '@app/core';
import { PageableGeneric } from '@app/shared/model/pageable.model';
import { CompanyPipelineContentModel } from '@app/shared/model/company-pipeline-vm.model';
import { HelpersService } from '@app/core/services/helpers.service';
import { CandidateState } from '@app/shared/model/enumeration/candidate-state.model';

@Component({
  selector: 'anms-candidate-table',
  templateUrl: './candidate-table.component.html',
  styleUrls: ['./candidate-table.component.scss']
})
export class CandidateTableComponent implements OnInit {

  @Input() jobId: number;
  @Input() state: CandidateState;

  displayedColumns: string[] = ['select', 'candidate', 'owner', 'createdDate', 'jobPosition', 'companyPipeline'];
  dataSource: MatTableDataSource<CandidateContentModel>;
  selection = new SelectionModel<CandidateContentModel>(true, []);
  rawData: PageableGeneric<CandidateContentModel>;

  pipelines: CompanyPipelineContentModel[];

  pageIndex: number = 0;
  pageSize: number = 20;
  isLoading: boolean = false;
  isErrorOccured: boolean = false;
  error: string;

  constructor(
    private helpersService: HelpersService,
    private candidateService: CandidateService,
    private jobService: JobService,
    private companyPipelineService: CompanyPipelineService,
  ) { }

  ngOnInit() {
    this.fetch();

    this.companyPipelineService.getList().subscribe(r => {
      if (r.success)
        this.pipelines = r.data.content;
    });
  }

  fetch(): void {
    this.isLoading = true;
    this.isErrorOccured = false;

    const params: CandidateListRequest = {
      page: this.pageIndex,
      size: this.pageSize,
    };
    if (this.jobId != null) params.job = this.jobId;
    if (this.state != null) params.state = this.state;

    this.candidateService.getList(params).subscribe(r => {
      this.isLoading = false;
      if (r.success) {
        this.rawData = r.data;
        this.dataSource = new MatTableDataSource<CandidateContentModel>(r.data.content);
      }
      else {
        this.isErrorOccured = true;
        this.error = r.niceErrorMessage;
      }
    });
  }

  isAllSelected(): boolean {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  masterToggle(): void {
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.data.forEach(row => this.selection.select(row));
  }

  onPageChanged(pageEvent: PageEvent): void {
    this.pageIndex = pageEvent.pageIndex;
    this.pageSize = pageEvent.pageSize;
    this.fetch();
  }

  onChangePipeline(candidate: CandidateContentModel, selectEvent: MatSelectChange) {
    candidate.data.candidatePipeline = selectEvent.value;
    this.candidateService.edit(candidate.data).subscribe(r => {
      const msg = r.success ? 'مرحله‌ی کاندیدای مورد نظر به روز شد.' : r.niceErrorMessage;
      this.helpersService.showToast(msg);
    });
  }
}
