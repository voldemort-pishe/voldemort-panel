import { Component, OnInit } from '@angular/core';
import { CandidateContentModel } from '@app/shared/model/candidate.model';
import { ActivatedRoute } from '@angular/router';
import { CandidateService } from '@app/shared/services/data/candidate.service';

@Component({
  selector: 'anms-candidate-detail-background',
  templateUrl: './candidate-detail-background.component.html',
  styleUrls: ['./candidate-detail-background.component.scss']
})
export class CandidateDetailBackgroundComponent implements OnInit {

  candidateId: number;

  isLoading: boolean = false;
  isErrorOccured: boolean = false;
  error: string;
  candidate: CandidateContentModel;

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
