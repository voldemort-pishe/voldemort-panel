import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CandidateDetailRoutingModule } from './candidate-detail-routing.module';
import { SharedModule } from '@app/shared';

@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    SharedModule,
    CandidateDetailRoutingModule
  ]
})
export class CandidateDetailModule { }
