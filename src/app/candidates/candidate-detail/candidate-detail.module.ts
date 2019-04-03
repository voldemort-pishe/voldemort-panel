import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PdfViewerModule } from 'ng2-pdf-viewer';

import { CandidateDetailRoutingModule } from './candidate-detail-routing.module';
import { SharedModule } from '@app/shared';
import { CandidateDetailCoordinatorComponent } from './candidate-detail-coordinator/candidate-detail-coordinator.component';
import { CandidateDetailHeaderComponent } from './candidate-detail-header/candidate-detail-header.component';
import { CandidateDetailBackgroundComponent } from './candidate-detail-background/candidate-detail-background.component';
import { CandidateDetailActivityComponent } from './candidate-detail-activity/candidate-detail-activity.component';
import { CandidateDetailCommentsComponent } from './candidate-detail-comments/candidate-detail-comments.component';
import { CandidateDetailScheduleComponent } from './candidate-detail-schedule/candidate-detail-schedule.component';
import { CandidateDetailFeedbackComponent } from './candidate-detail-feedback/candidate-detail-feedback.component';
import { CandidateDetailDocumentsComponent } from './candidate-detail-documents/candidate-detail-documents.component';
import { SendEmailDialogComponent } from './send-email-dialog/send-email-dialog.component';
import { SubmitFeedbackDialogComponent } from './submit-feedback-dialog/submit-feedback-dialog.component';
import { SubmitScheduleDialogComponent } from './submit-schedule-dialog/submit-schedule-dialog.component';

@NgModule({
  declarations: [
    CandidateDetailCoordinatorComponent,
    CandidateDetailHeaderComponent,
    CandidateDetailBackgroundComponent,
    CandidateDetailActivityComponent,
    CandidateDetailCommentsComponent,
    CandidateDetailScheduleComponent,
    CandidateDetailFeedbackComponent,
    CandidateDetailDocumentsComponent,
    SendEmailDialogComponent,
    SubmitFeedbackDialogComponent,
    SubmitScheduleDialogComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    PdfViewerModule,
    CandidateDetailRoutingModule,
  ],
  entryComponents: [
    SendEmailDialogComponent,
    SubmitFeedbackDialogComponent,
    SubmitScheduleDialogComponent,
  ]
})
export class CandidateDetailModule { }
