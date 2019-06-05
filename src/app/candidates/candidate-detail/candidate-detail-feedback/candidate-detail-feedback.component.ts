import { Component, OnInit } from '@angular/core';
import { FeedbackContentModel } from '@app/shared/model/feedback.model';
import { ActivatedRoute } from '@angular/router';
import { FeedbackService } from '@app/core/services/feedback.service';
import { HelpersService } from '@app/core/services/helpers.service';
import { FeedbackRating } from '@app/shared/model/enumeration/feedback-rating';
import { MatDialog } from '@angular/material';
import { SubmitFeedbackDialogComponent } from '../submit-feedback-dialog/submit-feedback-dialog.component';
import { Principal } from '@app/core/auth/principal.service';
import { UserModel } from '@app/shared/model/user.model';

@Component({
  selector: 'anms-candidate-detail-feedback',
  templateUrl: './candidate-detail-feedback.component.html',
  styleUrls: ['./candidate-detail-feedback.component.scss']
})
export class CandidateDetailFeedbackComponent implements OnInit {

  FeedbackRating: typeof FeedbackRating = FeedbackRating;
  FeedbackRatings: string[] = Object.keys(FeedbackRating);

  candidateId: number;

  isLoading: boolean = false;
  isErrorOccured: boolean = false;
  error: string;

  feedbacks: FeedbackContentModel[];
  feedbackGroups: { [key: string]: UserModel[] };
  isUserAlreadySubmittedFeedback: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private dialog: MatDialog,
    private feedbackService: FeedbackService,
    private helpersService: HelpersService,
    private principal: Principal,
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
        this.principal.identityUser().then(user =>
          this.isUserAlreadySubmittedFeedback = r.data.content.some(f => f.data.userId === user.id)
        );
        this.generateGroups();
      }
      else {
        this.isErrorOccured = true;
        this.error = r.niceErrorMessage;
      }
    });
  }

  newFeedback(): void {
    this.dialog.open(SubmitFeedbackDialogComponent, { data: { candidateId: this.candidateId } })
      .afterClosed().subscribe(r => { if (r) this.fetch(); });
  }

  private generateGroups(): void {
    const gs = {};
    Object.keys(FeedbackRating).forEach(fr => gs[fr] = []);
    this.helpersService.groupBy(this.feedbacks, f => f.data.rating).forEach((items, key) => {
      gs[key] = items.map(i => i.include.owner);
    });
    this.feedbackGroups = gs;
  }
}
