import {Component, HostBinding, OnInit, ViewEncapsulation} from "@angular/core";


@Component({
  selector: 'anms-candidate-page',
  templateUrl: './candidate-page.component.html',
  styleUrls: ['./candidate-page.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CandidatePageComponent implements OnInit {

  @HostBinding('@.disabled') disabled = true;

  constructor() {
  }

  ngOnInit() {



  }



}
