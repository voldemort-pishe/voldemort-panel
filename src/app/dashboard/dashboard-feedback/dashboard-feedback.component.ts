import { Component, OnInit } from '@angular/core';
import { EventStatus } from '@app/shared/model/enumeration/event-status.model';
import { EventType } from '@app/shared/model/enumeration/event-type.model';

@Component({
  selector: 'anms-dashboard-feedback',
  templateUrl: './dashboard-feedback.component.html',
  styleUrls: ['./dashboard-feedback.component.scss']
})
export class DashboardFeedbackComponent implements OnInit {

  EventStatus: typeof EventStatus = EventStatus;
  EventType: typeof EventType = EventType;

  constructor() { }

  ngOnInit() {
  }

}
