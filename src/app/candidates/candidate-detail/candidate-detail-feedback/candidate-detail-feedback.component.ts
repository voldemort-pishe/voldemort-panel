import { Component, OnInit } from '@angular/core';
import { FeedbackContentModel } from '@app/shared/model/feedback.model';
import { ActivatedRoute } from '@angular/router';
import { FeedbackService } from '@app/core/services/feedback.service';
import { HelpersService } from '@app/core/services/helpers.service';
import { FeedbackRating } from '@app/shared/model/enumeration/feedback-rating';
import { MatDialog } from '@angular/material';
import { SubmitFeedbackDialogComponent } from '../submit-feedback-dialog/submit-feedback-dialog.component';

@Component({
  selector: 'anms-candidate-detail-feedback',
  templateUrl: './candidate-detail-feedback.component.html',
  styleUrls: ['./candidate-detail-feedback.component.scss']
})
export class CandidateDetailFeedbackComponent implements OnInit {

  FeedbackRating: typeof FeedbackRating = FeedbackRating;

  candidateId: number;

  isLoading: boolean = false;
  isErrorOccured: boolean = false;
  error: string;

  feedbacks: FeedbackContentModel[];
  feedbackGroups: { rating: FeedbackRating, n: number }[];

  constructor(
    private route: ActivatedRoute,
    private dialog: MatDialog,
    private feedbackService: FeedbackService,
    private helpersService: HelpersService,
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
    this.feedbackService.getListByCandidate(this.candidateId).subscribe(r => {
      this.isLoading = false;
      if (r.success) {
        this.feedbacks = r.data.content;
        this.generateGroups();
      }
      else {
        this.isErrorOccured = true;
        this.error = r.niceErrorMessage;
      }
    });
  }

  newFeedback(): void {
    this.dialog.open(SubmitFeedbackDialogComponent, { data: { candidateId: this.candidateId } });
  }

  private generateGroups(): void {
    const gs = [];
    this.helpersService.groupBy(this.feedbacks, f => f.data.rating).forEach((items, key) => {
      gs.push({
        rating: key,
        n: items.length,
      });
    });
    this.feedbackGroups = gs;
  }
}
