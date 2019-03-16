import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CandidatesRoutingModule } from './candidates-routing.module';
import { SharedModule } from '@app/shared';

@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    SharedModule,
    CandidatesRoutingModule
  ],
  exports: [
  ]
})
export class CandidatesModule { }
