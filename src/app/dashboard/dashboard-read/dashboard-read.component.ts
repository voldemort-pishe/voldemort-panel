import { Component, OnInit } from '@angular/core';
import { EventStatus } from '@app/shared/model/enumeration/event-status.model';

@Component({
  selector: 'anms-dashboard-read',
  templateUrl: './dashboard-read.component.html',
  styleUrls: ['./dashboard-read.component.scss']
})
export class DashboardReadComponent implements OnInit {

  EventStatus: typeof EventStatus = EventStatus;

  constructor() { }

  ngOnInit() {
  }

}
