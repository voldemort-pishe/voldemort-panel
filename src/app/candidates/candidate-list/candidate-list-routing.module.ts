import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CandidateListCoordinatorComponent } from './candidate-list-coordinator/candidate-list-coordinator.component';

const routes: Routes = [
  {
    path: '',
    component: CandidateListCoordinatorComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CandidateListRoutingModule { }
