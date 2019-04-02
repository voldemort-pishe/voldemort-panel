import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CandidateListRoutingModule } from './candidate-list-routing.module';
import { CandidateListCoordinatorComponent } from './candidate-list-coordinator/candidate-list-coordinator.component';
import { CandidateListMenuComponent } from './candidate-list-menu/candidate-list-menu.component';
import { CreateCandidateDialogComponent } from './create-candidate-dialog/create-candidate-dialog.component';
import { CandidateListRejectedComponent } from './candidate-list-rejected/candidate-list-rejected.component';
import { CandidateListAcceptedComponent } from './candidate-list-accepted/candidate-list-accepted.component';
import { CandidateListPendingComponent } from './candidate-list-pending/candidate-list-pending.component';
import { CandidateListInprocessComponent } from './candidate-list-inprocess/candidate-list-inprocess.component';
import { CandidateListAllComponent } from './candidate-list-all/candidate-list-all.component';

@NgModule({
  declarations: [CandidateListCoordinatorComponent, CandidateListMenuComponent, CreateCandidateDialogComponent, CandidateListRejectedComponent, CandidateListAcceptedComponent, CandidateListPendingComponent, CandidateListInprocessComponent, CandidateListAllComponent],
  imports: [
    CommonModule,
    CandidateListRoutingModule
  ]
})
export class CandidateListModule { }
