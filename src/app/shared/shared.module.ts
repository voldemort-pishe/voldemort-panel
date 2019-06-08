import { NgModule } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RiyalCurrencyPipe } from './pipe/riyal-currency.pipe';
import { PersianNumberPipe } from './pipe/persian-number.pipe';
import { JalaliPipe } from './pipe/jalali.pipe';
import { MaterialModule } from '@app/material/material.module';
import { AvatarModule } from 'ngx-avatar';
import { CandidateTableComponent } from './components/candidate-table/candidate-table.component';
import { RouterModule } from '@angular/router';
import { ErrorMessageComponent } from './components/error-message/error-message.component';
import { LoadingSpinnerComponent } from './components/loading-spinner.component';
import { LoadingDirective } from './directives/loading.directive';
import { JobTypePipe } from './pipe/job-type.pipe';
import { JobHireTeamRolePipe } from './pipe/job-hire-team-role.pipe';
import { CompanyMemberSelectComponent } from './components/company-member-select/company-member-select.component';
import { FullNamePipe } from './pipe/full-name.pipe';
import { CandidateScheduleMemberStatusPipe } from './pipe/candidate-schedule-member-status.pipe';
import { ScheduleStatusPipe } from './pipe/schedule-status.pipe';
import { FeedbackRatingPipe } from './pipe/feedback-rating.pipe';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    AvatarModule,
    RouterModule,
  ],
  declarations: [
    RiyalCurrencyPipe,
    PersianNumberPipe,
    JalaliPipe,
    FullNamePipe,
    JobTypePipe,
    JobHireTeamRolePipe,
    ScheduleStatusPipe,
    CandidateScheduleMemberStatusPipe,
    FeedbackRatingPipe,

    LoadingSpinnerComponent,
    LoadingDirective,
    CandidateTableComponent,
    ErrorMessageComponent,
    CompanyMemberSelectComponent,
  ],
  entryComponents: [
    LoadingSpinnerComponent,
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,

    MaterialModule,
    AvatarModule,

    RiyalCurrencyPipe,
    PersianNumberPipe,
    JalaliPipe,
    FullNamePipe,
    JobTypePipe,
    JobHireTeamRolePipe,
    ScheduleStatusPipe,
    CandidateScheduleMemberStatusPipe,
    FeedbackRatingPipe,

    LoadingDirective,
    CandidateTableComponent,
    ErrorMessageComponent,
    CompanyMemberSelectComponent,
  ],
  providers: [
    CurrencyPipe,
  ]
})
export class SharedModule { }
