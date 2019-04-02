import { Component, OnInit } from '@angular/core';
import { EventStatus } from '@app/shared/model/enumeration/event-status.model';

@Component({
  selector: 'anms-dashboard-important',
  templateUrl: './dashboard-important.component.html',
  styleUrls: ['./dashboard-important.component.scss']
})
export class DashboardImportantComponent implements OnInit {

  EventStatus: typeof EventStatus = EventStatus;

  constructor() { }

  ngOnInit() {
  }

}
