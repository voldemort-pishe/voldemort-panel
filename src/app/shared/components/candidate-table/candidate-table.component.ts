import { Component, OnInit, Input } from '@angular/core';
import { SelectionModel } from '@angular/cdk/collections';
import { MatTableDataSource, PageEvent, MatSelectChange } from '@angular/material';
import { CandidateContentModel } from '@app/shared/model/candidate.model';
import { CandidateService, CandidateListRequest, JobService, CompanyPipelineService } from '@app/core';
import { PageableGeneric } from '@app/shared/model/pageable.model';
import { CompanyPipelineContentModel } from '@app/shared/model/company-pipeline-vm.model';
import { HelpersService } from '@app/core/services/helpers.service';

@Component({
  selector: 'anms-candidate-table',
  templateUrl: './candidate-table.component.html',
  styleUrls: ['./candidate-table.component.scss']
})
export class CandidateTableComponent implements OnInit {

  private _jobId: number;
  @Input()
  public get jobId(): number {
    return this._jobId;
  }
  public set jobId(v: number) {
    this._jobId = v;
    this.request.job = v;
    this.fetch();
  }

  displayedColumns: string[] = ['select', 'candidate', 'owner', 'createdDate', 'jobPosition', 'companyPipeline'];
  dataSource: MatTableDataSource<CandidateContentModel>;
  selection = new SelectionModel<CandidateContentModel>(true, []);
  rawData: PageableGeneric<CandidateContentModel>;

  pipelines: CompanyPipelineContentModel[];

  request: CandidateListRequest = {};
  isLoading: boolean = false;

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
    this.candidateService.getList(this.request).subscribe(r => {
      this.isLoading = false;
      if (r.success) {
        this.rawData = r.data;
        this.dataSource = new MatTableDataSource<CandidateContentModel>(r.data.content);
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
    this.request.page = pageEvent.pageIndex;
    this.request.size = pageEvent.pageSize;
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
