import { Component, OnInit } from '@angular/core';
import { EventStatus } from '@app/shared/model/enumeration/event-status';
import { EventType } from '@app/shared/model/enumeration/event-type';

@Component({
  selector: 'anms-dashboard-schedule',
  templateUrl: './dashboard-schedule.component.html',
  styleUrls: ['./dashboard-schedule.component.scss']
})
export class DashboardScheduleComponent implements OnInit {

  EventStatus: typeof EventStatus = EventStatus;
  EventType: typeof EventType = EventType;
  
  constructor() { }

  ngOnInit() {
  }

}
