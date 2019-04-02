import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

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
  ],
  imports: [
    CommonModule,
    SharedModule,
    CandidateDetailRoutingModule
  ]
})
export class CandidateDetailModule { }
