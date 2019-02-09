import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JobListComponent } from './job-list/job-list.component';
import { JobDetailComponent } from './job-detail/job-detail.component';
import { CreateJobComponent } from './create-job/create-job.component';
import { SharedModule } from '@app/shared';
import { JobsRoutingModule } from './jobs-routing.module';

@NgModule({
  declarations: [
    JobListComponent,
    JobDetailComponent,
    CreateJobComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    JobsRoutingModule,
  ],
  entryComponents: [
    CreateJobComponent,
  ],
})
export class JobsModule { }
