import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CandidateDetailCoordinatorComponent } from './candidate-detail-coordinator/candidate-detail-coordinator.component';
import { CandidateDetailBackgroundComponent } from './candidate-detail-background/candidate-detail-background.component';
import { CandidateDetailActivityComponent } from './candidate-detail-activity/candidate-detail-activity.component';
import { CandidateDetailCommentsComponent } from './candidate-detail-comments/candidate-detail-comments.component';
import { CandidateDetailScheduleComponent } from './candidate-detail-schedule/candidate-detail-schedule.component';
import { CandidateDetailFeedbackComponent } from './candidate-detail-feedback/candidate-detail-feedback.component';
import { CandidateDetailDocumentsComponent } from './candidate-detail-documents/candidate-detail-documents.component';

const routes: Routes = [
  {
    path: '',
    component: CandidateDetailCoordinatorComponent,
    children: [
      { path: '', redirectTo: 'background' },
      { path: 'background', component: CandidateDetailBackgroundComponent },
      { path: 'activity', component: CandidateDetailActivityComponent },
      { path: 'comments', component: CandidateDetailCommentsComponent },
      { path: 'schedule', component: CandidateDetailScheduleComponent },
      { path: 'feedback', component: CandidateDetailFeedbackComponent },
      { path: 'documents', component: CandidateDetailDocumentsComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CandidateDetailRoutingModule { }
