import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { JobListComponent } from './job-list/job-list.component';
import { JobDetailComponent } from './job-detail/job-detail.component';

const routes: Routes = [
    {
        path: '',
        component: JobListComponent,
        data: { title: 'anms.job' },
    },
    {
        path: ':id',
        component: JobDetailComponent,
        data: { title: 'anms.job' },
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class JobsRoutingModule { }
