import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { JobListComponent } from './job-list/job-list.component';
import { JobDetailComponent } from './job-detail/job-detail.component';
import { JobInfoComponent } from './job-info/job-info.component';
import { JobCandidatesComponent } from './job-candidates/job-candidates.component';
import { JobHiringTeamComponent } from './job-hiring-team/job-hiring-team.component';

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
        children: [
            { path: '', redirectTo: 'info' },
            { path: 'info', component: JobInfoComponent },
            { path: 'hiring-team', component: JobHiringTeamComponent },
            { path: 'candidates', component: JobCandidatesComponent },
        ],
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class JobsRoutingModule { }
