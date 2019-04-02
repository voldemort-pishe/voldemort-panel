import { Component, OnInit } from '@angular/core';
import { CandidateState } from '@app/shared/model/enumeration/candidate-state.model';

@Component({
  selector: 'anms-candidate-list-pending',
  templateUrl: './candidate-list-pending.component.html',
  styleUrls: ['./candidate-list-pending.component.scss']
})
export class CandidateListPendingComponent implements OnInit {

  CandidateState: typeof CandidateState = CandidateState;

  constructor() { }

  ngOnInit() {
  }

}
