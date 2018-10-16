import { Component, OnInit } from '@angular/core';
import * as moment from 'jalali-moment';

@Component({
  selector: 'anms-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    console.log(moment().locale('fa').format('jD jMMMM'));
  }

}
