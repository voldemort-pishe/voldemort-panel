import { Component, OnInit } from '@angular/core';
import { CandidateState } from '@app/shared/model/enumeration/candidate-state';

@Component({
  selector: 'anms-candidate-list-inprocess',
  templateUrl: './candidate-list-inprocess.component.html',
  styleUrls: ['./candidate-list-inprocess.component.scss']
})
export class CandidateListInprocessComponent implements OnInit {

  CandidateState: typeof CandidateState = CandidateState;

  constructor() { }

  ngOnInit() {
  }

}
