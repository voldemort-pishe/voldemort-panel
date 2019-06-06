import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CandidateService } from '@app/shared/services/data/candidate.service';
import { CandidateContentModel } from '@app/shared/model/candidate.model';
import { environment } from '@env/environment';

@Component({
  selector: 'anms-candidate-detail-documents',
  templateUrl: './candidate-detail-documents.component.html',
  styleUrls: ['./candidate-detail-documents.component.scss']
})
export class CandidateDetailDocumentsComponent implements OnInit {

  candidateId: number;

  isLoading: boolean = false;
  isErrorOccured: boolean = false;
  error: string;
  candidate: CandidateContentModel;

  public get fileUrl(): string {
    if (this.candidate && this.candidate.data.fileId != null)
      return `${environment.serverApiUrl}file/load/${this.candidate.data.fileId}`;
    else return null;
  }

  constructor(
    private route: ActivatedRoute,
    private candidateService: CandidateService,
  ) { }

  ngOnInit() {
    this.route.parent.paramMap.subscribe(params => {
      const id = parseInt(params.get('id'));
      if (!isNaN(id)) {
        this.candidateId = id;
        this.fetch();
      }
    });
  }

  fetch() {
    if (this.candidateId == null) return;

    this.isLoading = true;
    this.isErrorOccured = false;
    this.candidateService.getDetail(this.candidateId).subscribe(r => {
      this.isLoading = false;
      if (r.success) {
        this.candidate = r.data;
      }
      else {
        this.isErrorOccured = true;
        this.error = r.niceErrorMessage;
      }
    });
  }
}
