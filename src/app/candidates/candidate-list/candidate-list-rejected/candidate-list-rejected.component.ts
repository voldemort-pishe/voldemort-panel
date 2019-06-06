import { Component, OnInit } from '@angular/core';
import { CandidateState } from '@app/shared/model/enumeration/candidate-state';

@Component({
  selector: 'anms-candidate-list-rejected',
  templateUrl: './candidate-list-rejected.component.html',
  styleUrls: ['./candidate-list-rejected.component.scss']
})
export class CandidateListRejectedComponent implements OnInit {

  CandidateState: typeof CandidateState = CandidateState;

  constructor() { }

  ngOnInit() {
  }

}
