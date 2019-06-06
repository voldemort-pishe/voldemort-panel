import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardCoordinatorComponent } from './dashboard-coordinator/dashboard-coordinator.component';
import { DashboardHeaderComponent } from './dashboard-header/dashboard-header.component';
import { DashboardMenuComponent } from './dashboard-menu/dashboard-menu.component';
import { DashboardEventsComponent } from './dashboard-events/dashboard-events.component';
import { SharedModule } from '@app/shared/shared.module';
import { DashboardUnreadComponent } from './dashboard-unread/dashboard-unread.component';
import { DashboardImportantComponent } from './dashboard-important/dashboard-important.component';
import { DashboardScheduleComponent } from './dashboard-schedule/dashboard-schedule.component';
import { DashboardFeedbackComponent } from './dashboard-feedback/dashboard-feedback.component';
import { DashboardCommentComponent } from './dashboard-comment/dashboard-comment.component';
import { DashboardEmailComponent } from './dashboard-email/dashboard-email.component';
import { DashboardAlarmComponent } from './dashboard-alarm/dashboard-alarm.component';
import { DashboardDoneComponent } from './dashboard-done/dashboard-done.component';
import { DashboardReadComponent } from './dashboard-read/dashboard-read.component';

@NgModule({
  declarations: [
    DashboardCoordinatorComponent,
    DashboardHeaderComponent,
    DashboardMenuComponent,
    DashboardEventsComponent,
    DashboardUnreadComponent,
    DashboardImportantComponent,
    DashboardScheduleComponent,
    DashboardFeedbackComponent,
    DashboardCommentComponent,
    DashboardEmailComponent,
    DashboardAlarmComponent,
    DashboardDoneComponent,
    DashboardReadComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    DashboardRoutingModule,
  ]
})
export class DashboardModule { }
