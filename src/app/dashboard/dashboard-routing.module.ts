import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardCoordinatorComponent } from './dashboard-coordinator/dashboard-coordinator.component';
import { DashboardUnreadComponent } from './dashboard-unread/dashboard-unread.component';
import { DashboardImportantComponent } from './dashboard-important/dashboard-important.component';
import { DashboardScheduleComponent } from './dashboard-schedule/dashboard-schedule.component';
import { DashboardFeedbackComponent } from './dashboard-feedback/dashboard-feedback.component';
import { DashboardCommentComponent } from './dashboard-comment/dashboard-comment.component';
import { DashboardEmailComponent } from './dashboard-email/dashboard-email.component';
import { DashboardAlarmComponent } from './dashboard-alarm/dashboard-alarm.component';
import { DashboardDoneComponent } from './dashboard-done/dashboard-done.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardCoordinatorComponent,
    data: { title: 'تازه‌ها' },
    children: [
      { path: '', redirectTo: 'unread' },
      { path: 'unread', component: DashboardUnreadComponent },
      { path: 'important', component: DashboardImportantComponent },
      { path: 'schedule', component: DashboardScheduleComponent },
      { path: 'feedback', component: DashboardFeedbackComponent },
      { path: 'comment', component: DashboardCommentComponent },
      { path: 'email', component: DashboardEmailComponent },
      { path: 'alarm', component: DashboardAlarmComponent },
      { path: 'done', component: DashboardDoneComponent },
    ],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
