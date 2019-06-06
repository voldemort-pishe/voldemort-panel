import { Component, OnInit } from '@angular/core';
import { CandidateState } from '@app/shared/model/enumeration/candidate-state';

@Component({
  selector: 'anms-candidate-list-accepted',
  templateUrl: './candidate-list-accepted.component.html',
  styleUrls: ['./candidate-list-accepted.component.scss']
})
export class CandidateListAcceptedComponent implements OnInit {

  CandidateState: typeof CandidateState = CandidateState;

  constructor() { }

  ngOnInit() {
  }

}
