import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JobListComponent } from './job-list/job-list.component';
import { JobDetailComponent } from './job-detail/job-detail.component';
import { CreateJobComponent } from './create-job/create-job.component';
import { SharedModule } from '@app/shared/shared.module';
import { JobsRoutingModule } from './jobs-routing.module';
import { JobInfoComponent } from './job-info/job-info.component';
import { JobHiringTeamComponent } from './job-hiring-team/job-hiring-team.component';
import { JobCandidatesComponent } from './job-candidates/job-candidates.component';
import { CandidatesModule } from '@app/candidates/candidates.module';
import { QuillModule } from 'ngx-quill'

@NgModule({
  declarations: [
    JobListComponent,
    JobDetailComponent,
    CreateJobComponent,
    JobInfoComponent,
    JobHiringTeamComponent,
    JobCandidatesComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    JobsRoutingModule,
    CandidatesModule,
    QuillModule,
  ],
  entryComponents: [
    CreateJobComponent,
  ],
})
export class JobsModule { }
