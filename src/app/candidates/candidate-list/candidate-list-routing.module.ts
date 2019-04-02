import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CandidateListCoordinatorComponent } from './candidate-list-coordinator/candidate-list-coordinator.component';
import { CandidateListAllComponent } from './candidate-list-all/candidate-list-all.component';
import { CandidateListPendingComponent } from './candidate-list-pending/candidate-list-pending.component';
import { CandidateListAcceptedComponent } from './candidate-list-accepted/candidate-list-accepted.component';
import { CandidateListRejectedComponent } from './candidate-list-rejected/candidate-list-rejected.component';
import { CandidateListInprocessComponent } from './candidate-list-inprocess/candidate-list-inprocess.component';

const routes: Routes = [
  {
    path: '',
    component: CandidateListCoordinatorComponent,
    children: [
      { path: '', redirectTo: 'pending' },
      { path: 'all', component: CandidateListAllComponent },
      { path: 'pending', component: CandidateListPendingComponent },
      { path: 'inprocess', component: CandidateListInprocessComponent },
      { path: 'accepted', component: CandidateListAcceptedComponent },
      { path: 'rejected', component: CandidateListRejectedComponent },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CandidateListRoutingModule { }
