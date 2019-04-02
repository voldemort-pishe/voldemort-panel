import { Component, OnInit } from '@angular/core';
import { EventStatus } from '@app/shared/model/enumeration/event-status.model';

@Component({
  selector: 'anms-dashboard-done',
  templateUrl: './dashboard-done.component.html',
  styleUrls: ['./dashboard-done.component.scss']
})
export class DashboardDoneComponent implements OnInit {

  EventStatus: typeof EventStatus = EventStatus;

  constructor() { }

  ngOnInit() {
  }

}
