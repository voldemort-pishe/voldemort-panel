import { Component, OnInit } from '@angular/core';
import { EventStatus } from '@app/shared/model/enumeration/event-status.model';
import { EventType } from '@app/shared/model/enumeration/event-type.model';

@Component({
  selector: 'anms-dashboard-alarm',
  templateUrl: './dashboard-alarm.component.html',
  styleUrls: ['./dashboard-alarm.component.scss']
})
export class DashboardAlarmComponent implements OnInit {

  EventStatus: typeof EventStatus = EventStatus;
  EventType: typeof EventType = EventType;

  constructor() { }

  ngOnInit() {
  }

}
