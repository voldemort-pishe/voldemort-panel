import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: './candidate-list/candidate-list.module#CandidateListModule',
    data: { title: 'کارجویان' },
  },
  {
    path: ':id',
    loadChildren: './candidate-detail/candidate-detail.module#CandidateDetailModule',
    data: { title: 'جزئیات کارجو' },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CandidatesRoutingModule { }
