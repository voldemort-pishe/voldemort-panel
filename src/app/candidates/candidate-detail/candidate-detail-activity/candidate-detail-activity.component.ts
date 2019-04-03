import { Component, OnInit } from '@angular/core';
import { CandidateMessageService } from '@app/core';
import { ActivatedRoute } from '@angular/router';
import { CandidateMessageContentModel } from '@app/shared/model/candidate-message-vm.model';

@Component({
  selector: 'anms-candidate-detail-activity',
  templateUrl: './candidate-detail-activity.component.html',
  styleUrls: ['./candidate-detail-activity.component.scss']
})
export class CandidateDetailActivityComponent implements OnInit {

  candidateId: number;

  isLoading: boolean = false;
  isErrorOccured: boolean = false;
  error: string;
  messages: CandidateMessageContentModel[];

  constructor(
    private route: ActivatedRoute,
    private candidateMessageService: CandidateMessageService,
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
    this.candidateMessageService.getListByCandidate(this.candidateId).subscribe(r => {
      this.isLoading = false;
      if (r.success) {
        this.messages = r.data.content;
      }
      else {
        this.isErrorOccured = true;
        this.error = r.niceErrorMessage;
      }
    });
  }
}
